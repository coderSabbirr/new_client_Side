import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useFirebase from "../../Hook/useFirebase";
import "./Header.css";

const Header = () => {
  const { user } = useAuth();
  const { logOut } = useFirebase();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/dashboard" className="navbar-brand">
          {" "}
          <img
            className="web-logo"
            src="https://i.ibb.co/yQ286TR/flat-design-dd-logo-template-23-2149477261.jpg"
            alt="logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {user.email && (
              <li className="nav-item ">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
            {/* <li className="user">
              {user?.photoURL ? (
                <img className="px-2  user" src={user.photoURL} alt="" />
              ) : (
                <img
                  className="px-2 "
                  src="https://i.ibb.co/5r8HpR3/user-1.png"
                  alt=""
                />
              )}
            </li> */}

            {user.email ? (
              <li className="nav-item dashbord">
                <button className="nav-link" onClick={logOut}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item  ">
                <NavLink to="/login" className="nav-link sign-in">
                  Sign In
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;