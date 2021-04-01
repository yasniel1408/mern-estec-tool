import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import { validarElToken } from "../../util/auth";

export const Dashboard = (props) => {
  let history = useHistory();

  useEffect(() => {
    validarElToken({history});
  }, []);

  return (
    <div className="dashboard">
      <Nav />
      <div>HOLA</div>
    </div>
  );
};

export default Dashboard;
