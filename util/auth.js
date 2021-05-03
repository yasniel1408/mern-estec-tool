const jwt = require("jsonwebtoken");

let createToken = ({user}) => {
  let token = jwt.sign({ user: user }, "secret", {
    expiresIn: "100m",
  });
  return token;
};

let verificarToken = (req, res, next) => {
  let token = req.get("Authorization");//headers
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.json({
        ok: false,
        error: err
      });
    }
    req.user = decoded.user;
    next();
  });
};

let verificarADMIN = (req, res, next) => {
  let token = req.get("Authorization");//headers
  jwt.verify(token, "secret", (err, decoded) => {

    if (err) {
      return res.json({
        auth: false,
        error: err
      });
    }
    req.user = decoded.user;
    if(req.user.rol===undefined || req.user.rol===null || req.user.rol==="" || req.user.rol!=="ADMIN"){
      return res.status(401).json({
          ok: false,
          error: "Usted no tiene permisos para ver este contenido"
      });
    }
    next();
  });
};

let verificarDIRECTOR = (req, res, next) => {
  let token = req.get("Authorization");//headers
  jwt.verify(token, "secret", (err, decoded) => {

    if (err) {
      return res.json({
        auth: false,
        error: err
      });
    }

    req.user = decoded.user;
    if(req.user.rol===undefined || req.user.rol===null || req.user.rol==="" || req.user.rol!=="DIRECTOR" ){
      if(req.user.rol === req.user.rol!=="ADMIN")return next()
      return res.status(401).json({
          ok: false,
          error: "Usted no tiene permisos para ver este contenido"
      });
    }
    next();
  });
};

module.exports = {
  createToken,
  verificarToken,
  verificarADMIN,
  verificarDIRECTOR
};