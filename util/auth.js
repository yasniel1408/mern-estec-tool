const jwt = require("jsonwebtoken");

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
          ok: false,
          error: err
        });
      }
      req.user = decoded.user;
      if(!decoded.user.rol==="ADMIN"){
        return res.status(401).json({
            ok: false,
            error: "Usted no tiene permisos para ver este contenido"
        });
      }
      next();
    });
  };

module.exports = {
  verificarToken,
  verificarADMIN
};