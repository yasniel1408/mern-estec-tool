import Swal from "sweetalert2";
import axios from "axios";

export const login = async({ username, password, history }) => {
  let timerInterval;
  Swal.fire({
    title: "Entrando...",
    html: "Espere porfavor, esto solo dura unos segundos.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then(async (result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      let url = "http://localhost:4000/api/login";
      await axios({
        method: "POST",
        url,
        data: {
          username,
          password,
        },
      })
        .then((response) => {
          Swal.fire({
            title: "<strong>Autenticación</strong>",
            icon: "success",
            position: "top-right",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            html: response.data.message,
            confirmButtonText: "Ok!",
          });
          localStorage.setItem("auth-token", response.data.token);
          setTimeout(() => {
            history.push("/dashboard");
          }, 500);
        })
        .catch(function (error) {
          let errors = error.error;
          console.log(errors);
          Swal.fire({
            title: "<strong>Error</strong>",
            icon: "error",
            html: errors,
            confirmButtonText: "Ok!",
          });
        });
    }
  });
};
