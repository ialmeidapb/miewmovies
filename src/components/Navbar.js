import React from "react";
import { Link } from "react-router-dom";

import logo from "./assets/logo.png";

function Navbar(props) {
  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={`/`}
          style={{ color: "white" }}
        >
          <img src={logo} className="logo-navbar" alt="Logo navbar" />{" "}
          Miew Movies
        </Link>
      </div>
     
    </nav>
  );
}

export default Navbar;