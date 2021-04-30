import jwt_decode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";
import { urlLogout } from "../../util/rutasAPI";

export const cargarUser = async ({ setUser }) => {
  const token = localStorage.getItem("auth-token");
  setUser(await jwt_decode(token));
};

export const logout = async ({ history }) => {
  await axios({
    url: urlLogout,
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("auth-token"),
    },
  })
  .then((response) => {
    if (!response.data.auth) {
      localStorage.setItem("auth-token", response.data.token);
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
      setTimeout(() => {
        history.push("/");
      }, 500);
    }
  })
  .catch((response) => {
    Swal.fire({
      title: "<strong>Error</strong>",
      icon: "error",
      html: response,
      confirmButtonText: "Ok!",
    });
    setTimeout(() => {
      history.push("/");
    }, 500);
  });
};
