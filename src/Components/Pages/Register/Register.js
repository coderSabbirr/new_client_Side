import {
  Alert,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import useAuth from "../../Hook/useAuth";

const Register = () => {
  const [loginData, setLoginData] = useState({});
  const history = useHistory();
  const { user, registerUser, isLoading, authError } = useAuth();

  const [agent, setAgent] = useState([]);
  useEffect(() => {
    fetch("https://react365.onrender.com/agentlist")
      .then((res) => res.json())
      .then((data) => setAgent(data));
  }, []);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.password !== loginData.password2) {
      return;
    }
    console.log(loginData);
    registerUser(
      loginData.email,
      loginData.password,
      loginData.name,
      loginData.agent,
      history
    );
  };
  return (
    <Container className="text-center register">
      {/* <Grid container spacing={2}> */}
      <Grid item sx={{ mt: 8 }} xs={12} md={12}>
        <p className="or-sign">------------Sign Up with Email------------</p>
        {!isLoading && (
          <form onSubmit={handleLoginSubmit}>
            <TextField
              className="your-email"
              sx={{ width: "40%", m: 1 }}
              id="standard-basic"
              label="Your Name"
              name="name"
              onBlur={handleOnBlur}
              required
            />{" "}
            <br />
            <TextField
              sx={{ width: "40%", m: 1 }}
              id="standard-basic"
              label="Your Email"
              name="email"
              type="email"
              onBlur={handleOnBlur}
              required
            />
            <br />
            <TextField
              sx={{ width: "40%", m: 1 }}
              id="standard-basic"
              label="Your Password"
              type="password"
              name="password"
              onBlur={handleOnBlur}
              required
            />{" "}
            <br />
            <TextField
              sx={{ width: "40%", m: 1 }}
              id="standard-basic"
              label="ReType Your Password"
              type="password"
              name="password2"
              onBlur={handleOnBlur}
              required
            />
            <br />
            <div>
              <FormControl sx={{ width: "40%", m: 1 }}>
                <InputLabel htmlFor="grouped-native-select">
                  Select Agent
                </InputLabel>
                <Select
                  native
                  defaultValue=""
                  id="grouped-native-select"
                  label="Select Agent"
                  type="agent"
                  name="agent"
                  onBlur={handleOnBlur}
                  required
                >
                  <option aria-label="None" value="" />
                  {agent?.map((pd, index) => (
                    <option value={pd.name}>{pd.name}</option>
                  ))}
                </Select>
              </FormControl>
            </div>
            <br />
            <button type="submit" className="sign-up-btn">
              Sign Up
            </button>{" "}
            <br />
            <p className="Already-account">
              Already have an Account?{" "}
              <NavLink to="/login" className="new-sign-in">
                Sign in{" "}
              </NavLink>
            </p>
          </form>
        )}
        {isLoading && <CircularProgress />}
        {user?.email && (
          <Alert severity="success">User Created successfully!</Alert>
        )}
        {authError && <Alert severity="error">{authError}</Alert>}
      </Grid>

      {/* </Grid> */}
    </Container>
  );
};

export default Register;
