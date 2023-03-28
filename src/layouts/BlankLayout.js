import React from "react";
import { Outlet } from "react-router-dom";
import "../style/style.BlankLayout.css";

function BlankLayout() {
  return (
    <div id="blankLayout-container">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <Outlet />
    </div>
  );
}

export default BlankLayout;
