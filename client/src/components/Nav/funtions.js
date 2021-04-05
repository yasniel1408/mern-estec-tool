
import jwt_decode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

export const cargarUser = async ({setUser}) => {
  const token = localStorage.getItem("auth-token");
  setUser(await jwt_decode(token));
};


export const logout = async({history}) => {
    let response = await axios.post("http://localhost:4000/api/logout",{}, {
      headers: {
        Authorization: localStorage.getItem("auth-token"),
        'Content-Type': 'application/json'
      },
    });
    if (response.data.ok) {
      localStorage.setItem("auth-token", "");
      Swal.fire({
        title: "<strong>Salir</strong>",
        icon: "success",
        position: "top-right",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        html: response.data.message,
        confirmButtonText: "Ok!",
      });
      setTimeout(() => {
        history.push("/");
      }, 500);
    } else {
      Swal.fire({
        title: "<strong>Error</strong>",
        icon: "error",
        html: response.data.error.message,
        confirmButtonText: "Ok!",
      });
    }
}