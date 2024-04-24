import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useFirebase from "../../Hook/useFirebase";

import "./Header.css";

const Header = () => {
  const { user } = useAuth();
  const { logOut } = useFirebase();
  return (
    <>
      {user.email ? (
        <div></div>
      ) : (
        <div className="nav_main">
          <div className="">
            <Link to="/dashboard" className="navbar-brand">
              {" "}
              <img
                className="web-logo"
                src="https://i.ibb.co/yQ286TR/flat-design-dd-logo-template-23-2149477261.jpg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="header_btn">
            {user.email ? (
              <button className="nav-link" onClick={logOut}>
                Logout
              </button>
            ) : (
              <Button variant="contained">
                <Link className="login_header" to="/login">
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
