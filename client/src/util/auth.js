const axios = require("axios");

const validarElToken = async ({ history }) => {
  let token = localStorage.getItem("auth-token");
  if (token) {
    let tokenValid = await axios({
      method: "POST",
      url: "http://localhost:4000/api/verifie-token",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auth-token"),
      },
    });
    if (tokenValid.data.ok) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  } else {
    history.push("/");
  }
};

module.exports = {
  validarElToken,
};
