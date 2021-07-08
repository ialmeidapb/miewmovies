import React from "react";
import { Link } from "react-router-dom";

import logo from "./assets/logo.png";

function NavbarB4() {
  return (
    <nav
      style={{ backgroundColor: "black" }}
      className="navbar align-items-center"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
          <img src={logo} className="logo-navbar" alt="Logo navbar" />{" "}
          Miew Movies
        </Link>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="d-flex">
              <p className="control">
                <Link to="/login" className="btn btn-success" style={{backgroundColor: "transparent"}}>
                  <span>LogIn</span>
                </Link>
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarB4;