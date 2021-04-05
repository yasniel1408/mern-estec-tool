import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import { validarElToken } from "../../util/auth";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export const Dashboard = (props) => {
  let history = useHistory();

  useEffect(() => {
    validarElToken({ history });
  }, []);

  return (
    <>
      <Breadcrumb text="Inicio" />
      <div className="contentDashboard">
        
      </div>
    </>
  );
};

export default Dashboard;
