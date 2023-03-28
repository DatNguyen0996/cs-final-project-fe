import React from "react";
import logoImg from "../logoBadminton.png";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div id="not-found-page-container">
      <Link to="/">
        <img id="store-logo" src={logoImg} alt="Logo" />
      </Link>
      <h1>404</h1>
      <h1>Page not found</h1>
    </div>
  );
}

export default NotFoundPage;
