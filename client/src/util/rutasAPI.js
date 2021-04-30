let server = '';
if(process.env.NODE_ENV === "production"){
    server = "http://172.19.176.16:80/api";
}else{
    server = "http://localhost:80/api";
}

const urlLogin = `${server}/login`;
const urlVerifiedToken = `${server}/verifie-token`;
const urlRefershToken = `${server}/refresh-token`;
const urlLogout = `${server}/logout`;

const urlGetProducto = `${server}/producto`;
const urlGetExistenciaProducto = `${server}/existencia-producto`;

const urlGetAlmacen = `${server}/almacen`;


module.exports = {
    urlLogin,
    urlVerifiedToken,
    urlRefershToken,
    urlLogout,
    urlGetProducto,
    urlGetExistenciaProducto,
    urlGetAlmacen
}