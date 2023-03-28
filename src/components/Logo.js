import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../logoBadminton.png";
import "../style/style.Logo.css";

function Logo({ disabledLink = false }) {
  const logo = <img id="store-logo" src={logoImg} alt="Logo" width="10%" />;
  return disabledLink ? logo : <Link to="/">{logo}</Link>;
}

export default Logo;
