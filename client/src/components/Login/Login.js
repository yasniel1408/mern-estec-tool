import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../Input/Input";
import "./Login.css";
import logo from "../../img/logo-ESTEC-Tool.png";
import { validarElToken } from "../../util/auth";
import { login } from "./funtions";

export const Login = (props) => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [checkUsername, setCheckUsername] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  useEffect(() => {
    setCheckUsername(false);
  }, [username]);
  useEffect(() => {
    setCheckPassword(false);
  }, [password]);

  useEffect(() => {
    validarElToken({history});
  }, []);

  const enterLogin = async (e) => {
    e.preventDefault();
    setCheckUsername(true);
    setCheckPassword(true);

    if (username && password) {
      login({username, password, history})
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginContent">
        <div className="textEnter">
          <img src={logo} width="300" />
        </div>
        <form onSubmit={(e) => enterLogin(e)}>
          <Input
            text={"Username *"}
            required={true}
            name={"username"}
            type={"text"}
            placeholder="Usuario"
            value={username}
            onChange={setUsername}
            check={checkUsername && username === ""}
          />
          <Input
            text={"Password *"}
            required={true}
            name={"password"}
            type={"password"}
            placeholder="Contraseña"
            value={password}
            onChange={setPassword}
            check={checkPassword && password === ""}
          />
          <div className="loginSubmit">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
