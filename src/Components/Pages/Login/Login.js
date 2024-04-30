import { CircularProgress, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import "./Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const { signInWithGoogle, loginUser, isLoading } = useAuth();

  const location = useLocation();
  const history = useHistory();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    loginUser(loginData.email, loginData.password, location, history);

    e.preventDefault();
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle(location, history);
  };

  return (
    <Container className="text-center login-sec">
      <Grid container spacing={2}>
        <Grid item sx={{ mt: 8 }} xs={12} md={12}>
          {isLoading && <CircularProgress />}
          <h1 className="login-heading">Login</h1>

          <p className="or-sign">
            --------------- Sign in with Email ---------------
          </p>
          <form onSubmit={handleLoginSubmit}>
            <TextField
              className="your-email text-input-login"
              sx={{ width: "40%", m: 1 }}
              id="standard-basic"
              label="Your Email"
              name="email"
              onChange={handleOnChange}
              required
            />{" "}
            <br />
            <TextField
              className="text-input-login"
              sx={{ width: "40%", m: 1 }}
              id="standard-basic"
              label="Your Password"
              type="password"
              name="password"
              onChange={handleOnChange}
              required
            />
            <br />
            <button
              sx={{ width: "50%", m: 1 }}
              type="submit"
              className="login-btn"
            >
              {" "}
              Login{" "}
            </button>
            <p className="create-account">
              Not registered yet?{" "}
              <NavLink to="/register" className="create-new">
                Create an Account
              </NavLink>
            </p>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
