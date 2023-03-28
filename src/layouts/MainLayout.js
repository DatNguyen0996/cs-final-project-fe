import React from "react";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import "../style/style.MainLayout.css";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  return (
    <div id="main-container">
      <MainHeader />
      <AlertMsg />
      <div className="main-body-wrapper">
        <Outlet />
      </div>
      <MainFooter />
    </div>
  );
}

export default MainLayout;
