import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import logo from "../../img/logo.png";
import { useHistory } from "react-router-dom";
import { cargarUser, logout } from "./funtions";
import userFoto from "../../img/user.png";

export const Nav = (props) => {
  let history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    cargarUser({ setUser });
  }, []);

  const enterLogout = async () => {
    logout({ history });
  };

  return (
    <nav className="navbar">
      <img loading="lazy" src={logo} width={100} alt="ESTEC-Tool" />
      <div className="content-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <hr/>
          </li>
          <li className="nav-item liImgUser">
            <img src={userFoto} width="60" className="imgUser" />
            <h3 className="fullname">{user ? user.user.fullname : ""}</h3>
          </li>
          <li className="nav-item infoUser">
            <h5>{user ? user.user.email : ""}</h5>
            <h5 className="rolUser">{user ? user.user.rol : ""}</h5>
          </li>
          <li className="nav-item">
            <hr/>
          </li>
          <li className="nav-item li-nav-link">
            <Link className="nav-link" to="/customer/index">
            Inicio
            </Link>
          </li>
          <li className="nav-item li-nav-link">
            <Link className="nav-link" to="/customer/index">
              Existencia en almacenes
            </Link>
          </li>
          <li className="nav-item li-nav-link">
            <Link className="nav-link" to="/customer/form">
              Mis Gestiones
            </Link>
          </li>
          <li className="nav-item li-nav-link">
            <Link className="nav-link" to="/customer/edit/5">
              Gráficas
            </Link>
          </li>
          <li className="nav-item li-nav-link">
            <a className="nav-link" onClick={enterLogout} href="#">
              Salir del sistema
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
