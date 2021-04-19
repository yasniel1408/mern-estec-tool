const axios = require("axios");
const { urlVerifiedToken } = require("./rutasAPI");

const validarElToken = async ({ history }) => {
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
