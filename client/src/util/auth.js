const axios = require("axios");
const { urlVerifiedToken, urlRefershToken } = require("./rutasAPI");

export const validarElToken = async ({ history }) => {
  let token = localStorage.getItem("auth-token");
  if (token) {
    let tokenValid = await axios({
      method: "POST",
      url: urlVerifiedToken,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auth-token"),
      },
    });
    if (tokenValid.data.auth) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  } else {
    history.push("/");
  }
};

export const refrescarElToken = async ({ history }) => {
  let token = localStorage.getItem("auth-token");
  if (token) {
    let tokenValid = await axios({
      method: "POST",
      url: urlRefershToken,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auth-token"),
      },
    });
    if (tokenValid.data.auth) {
      localStorage.setItem("auth-token", tokenValid.data.token)
    } else {
      history.push("/");
    }
  } else {
    history.push("/");
  }
};

