const controller = {};
var ActiveDirectory = require("activedirectory");
const jwt = require("jsonwebtoken");

controller.login = async (req, res) => {
  let { username, password } = req.body;
  username += "@estec.une.cu";
  var config = {
    url: "ldap://estec.une.cu",
    baseDN: "dc=estec,dc=une,dc=cu",
    username: username,
    password: password,
  };
  var ad = new ActiveDirectory(config);
  await ad.authenticate(username, password, async function (err, auth) {
    if (err) {
      let error = "";

      console.log(
        err.lde_message ==
          "80090308: LdapErr: DSID-0C0903C5, comment: AcceptSecurityContext error, data 775, v23f0\x00"
      );

      if (
        err.lde_message ==
        "80090308: LdapErr: DSID-0C0903C5, comment: AcceptSecurityContext error, data 775, v23f0\x00"
      ) {
        error = "Su cuenta esta bloqueada";
      } else if (
        err.lde_message ==
        "80090308: LdapErr: DSID-0C090421, comment: AcceptSecurityContext error, data 775, v23f0\x00"
      ) {
        error = "Su cuenta esta bloqueada";
      } else {
        error = "Usuario o contraseña incorrecta";
      }

      // res.status(500).json({ error: err.lde_message });

      res.json({ error });
    }
    if (auth) {
      await ad.findUser(username, async (err, userad) => {
        if (err) {
          console.log("ERROR:" + JSON.stringify(err));
          return;
        }

        if (!userad) {
          res
            .status(500)
            .json({ error: "Usuario:" + username + "no encontrado." });
        } else {
          // const userm = await User.findOne({ username });
          //   console.log(userm)

          const user = {
            username: userad.sAMAccountName,
            fullname: userad.displayName,
            photo: "",
            email: userad.mail,
            active: true,
            rol: userad.description,
          };

          //esto hay que guardarlo en alguna tabla
          //   if (!userm) {
          //     await user.save().catch((err) => res.json(err));
          //   }

          let token = jwt.sign({ user: user }, "secret", {
            expiresIn: "24h",
          });
          await res.status(200).json({
            token,
          });
        }
      });
    } else {
      res.status(500).json({ error: "Authentication failed!" });
    }
  });
};

controller.verificarToken = async (req, res) => {
  res.json({
    ok: true,
  });
};

controller.logout = async (req, res) => {
  //   let token = req.get("Authorization");
  //   const response = await jwt.destroy(token);
  await res.json({
    ok: true,
  });
};

module.exports = controller;
