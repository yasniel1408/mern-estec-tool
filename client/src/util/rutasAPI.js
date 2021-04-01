let server = '';
if(process.env.NODE_ENV === "production"){
    server = "http://:4000/api";
}else{
    server = "http://localhost:4000/api";
}

// server = "/api";

const urlLogin = `${server}/login`;
const urlVerifiedToken = `${server}/verifie-token`;

module.exports = {
    urlLogin,
    urlVerifiedToken,
}