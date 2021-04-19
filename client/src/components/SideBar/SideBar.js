import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.scss";
import logo from "../../img/logo-ESTEC-Tool.png";
import { useHistory } from "react-router-dom";
import { cargarUser, logout } from "./funtions";
import userFoto from "../../img/user.png";

import {
  faBell,
  faHome,
  faList,
  faSignOutAlt,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SideBar = (props) => {
  let history = useHistory();
  const [user, setUser] = useState();
  const [path, setPath] = useState();

  useEffect(() => {
    setPath(history.location.pathname);
  }, [path]);

  useEffect(() => {
    cargarUser({ setUser });
  }, []);

  const enterLogout = async () => {
    await logout({ history });
  };

  const changeItem = () => {
    setPath(history.location.pathname);
  };

  return (
    <nav className="navbar">
      <img loading="lazy" src={logo} width={130} alt="ESTEC-Tool" />
      <div className="content-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <hr />
          </li>
          <li className="nav-item liImgUser">
            <img src={userFoto} width="40" className="imgUser" />
            <h3 className="fullname">{user ? user.user.fullname : ""}</h3>
          </li>
          <li className="nav-item infoUser">
            <h5>{user ? user.user.email : ""}</h5>
            <h5 className="rolUser">{user ? user.user.rol : ""}</h5>
          </li>
          <li className="nav-item">
            <hr />
          </li>

          <li
            className="styleItem li-nav-link"
            style={{
              background: path === "/dashboard" ? "#2a418f" : ""
            }}
            onClick={() => {
              changeItem();
            }}
          >
            <Link
              className="nav-link"
              to="/dashboard"
              style={{
                color: path === "/dashboard" ? "#fff" : "rgb(138, 135, 135)",
              }}
            >
              <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
          </li>

          <li
            className="styleItem li-nav-link"
            style={{
              background: path === "/almacen" ? "#2a418f" : ""
            }}
            onClick={() => {
              changeItem();
            }}
          >
            <Link
              className="nav-link"
              to="/almacen"
              style={{
                color: path === "/almacen" ? "#fff" : "rgb(138, 135, 135)",
              }}
            >
              <FontAwesomeIcon icon={faTable} /> Almacenes
            </Link>
          </li>

          <li
            className="styleItem li-nav-link"
            style={{
              background: path === "/gestion" ? "#2a418f" : ""
            }}
            onClick={() => {
              changeItem();
            }}
          >
            <Link
              className="nav-link"
              to="/gestion"
              style={{
                color: path === "/gestion" ? "#fff" : "rgb(138, 135, 135)",
              }}
            >
              <FontAwesomeIcon icon={faList} /> Mis Gestiones
            </Link>
          </li>

          <li
            className="styleItem li-nav-link"
            style={{
              background: path === "/notificaciones" ? "#2a418f" : ""
            }}
            onClick={() => {
              changeItem();
            }}
          >
            <Link
              className="nav-link"
              to="/notificaciones"
              style={{
                color: path === "/notificaciones" ? "#fff" : "rgb(138, 135, 135)",
              }}
            >
              <FontAwesomeIcon icon={faBell} /> Notificaciones
            </Link>
          </li>

          <li className="nav-item styleItem li-nav-link">
            <a className="nav-link" onClick={enterLogout} href="#">
              <FontAwesomeIcon icon={faSignOutAlt} color="#2a418f" /> Salir
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
