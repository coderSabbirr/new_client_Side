import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import "../Deposit/Deposit.css";
import "./SettingsPage.css";

import { getAuth, updatePassword } from "firebase/auth";
const SettingsPage = () => {
  const [loginData, setLoginData] = useState({});
  const [bankData, setBankData] = useState({});
  // const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { reset } = useForm();

  const { user, isLoading } = useAuth();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleOnBlurBank = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newbankData = { ...bankData };
    newbankData[field] = value;
    setBankData(newbankData);
  };

  // password change
  const handleChangePassword = () => {
    // if (loginData.password !== loginData.password2) {
    //   return;
    // }
    const auth = getAuth();
    const user = auth.currentUser;

    // Update the user's password
    updatePassword(user, newPassword)
      .then(() => {
        // Password updated successfully
        console.log("Password updated successfully");
        setNewPassword("");
        setErrorMessage("");
      })
      .catch((error) => {
        // An error occurred
        console.error("Error updating password:", error.message);
        setErrorMessage(error.message);
      });
  };

  const handleLoginSubmit = (e) => {
    loginData.time = new Date().toLocaleString();
    loginData.user_email = user.email;
    fetch("http://localhost:5000/addpayment", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire("Submited!", "", "Success");
          reset();
        }
        reset();
      });

    e.preventDefault();
  };

  const handlbankSubmit = (e) => {
    bankData.time = new Date().toLocaleString();
    bankData.user_email = user.email;
    fetch("http://localhost:5000/addbank", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bankData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire("Submited!", "", "Success");
          reset();
        }
        reset();
      });

    e.preventDefault();
  };
  console.log(bankData);
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <div className="add-deposit">
      <h3 className="page-title">Add Payment Details </h3>
      <div className="container ">
        <Container className="text-center register">
          {/* <Grid container spacing={2}> */}
          <Grid item>
            <p className="or-sign"></p>

            <form onSubmit={handleLoginSubmit}>
              <div>
                <TextField
                  className="your-email"
                  sx={{ width: "100%", m: 1 }}
                  id="standard-basic"
                  label="Number"
                  name="mobileNumber"
                  onBlur={handleOnBlur}
                  type="number"
                  required
                />{" "}
                <br />
                <FormControl sx={{ width: "100%", m: 1 }}>
                  <InputLabel htmlFor="grouped-native-select">
                    Select Method
                  </InputLabel>
                  <Select
                    native
                    defaultValue=""
                    id="grouped-native-select"
                    label="Select Method"
                    type="mobileMethd"
                    name="mobileMethd"
                    onBlur={handleOnBlur}
                    required
                  >
                    <option value="Bkash">Bkash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Rocket">Rocket</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="cashout_options"
                    onBlur={handleOnBlur}
                  >
                    <FormControlLabel
                      value="personal"
                      control={<Radio />}
                      label="Personal"
                      required
                    />
                    <FormControlLabel
                      value="agent"
                      control={<Radio />}
                      label="Agent"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/* <div>
                <div>
                  <FormControl sx={{ width: "100%", m: 1 }}>
                    <InputLabel htmlFor="grouped-native-select">
                      Select Bank
                    </InputLabel>
                    <Select
                      native
                      defaultValue=""
                      id="grouped-native-select"
                      label="Select Agent"
                      type="bankMethod"
                      name="Bank"
                      onBlur={handleOnBlur}
                    >
                      <option aria-label="None" value="" />
                      <option value="a">A BANk</option>
                      <option value="b">B Bnak</option>
                      <option value="c">C Bank</option>
                    </Select>
                  </FormControl>
                  <br />
                  <TextField
                    className="your-email"
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Account Name"
                    name="accountName"
                    onBlur={handleOnBlur}
                    type="text"
                  />{" "}
                  <br />
                  <TextField
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Account Number"
                    name="accountNumber"
                    onBlur={handleOnBlur}
                    type="number"
                  />
                  <br />
                  <TextField
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Routing Number"
                    name="routingNumber"
                    onBlur={handleOnBlur}
                    type="number"
                  />
                  <br />
                  <TextField
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Amount $"
                    name="amount"
                    onBlur={handleOnBlur}
                    type="number"
                    required
                  />
                </div>
              </div> */}
              <br />
              <button type="submi" className="sign-up-btn mb-5 ">
                Save
              </button>{" "}
              <br />
            </form>
            <h5>OR</h5>
            <form onSubmit={handlbankSubmit}>
              <h5 className="mt-5">Bank Details</h5>
              <div>
                <div>
                  <br />
                  <TextField
                    className="your-email"
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Nank Name"
                    name="bankName"
                    onBlur={handleOnBlurBank}
                    type="text"
                    required
                  />{" "}
                  <TextField
                    className="your-email"
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Account Name"
                    name="accountName"
                    onBlur={handleOnBlurBank}
                    type="text"
                    required
                  />{" "}
                  <br />
                  <TextField
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Account Number"
                    name="accountNumber"
                    onBlur={handleOnBlurBank}
                    type="number"
                    required
                  />
                  <br />
                  <TextField
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Routing Number"
                    name="routingNumber"
                    onBlur={handleOnBlurBank}
                    type="number"
                    required
                  />
                  <br />
                </div>
              </div>
              <br />
              <button type="submi" className="sign-up-btn mb-5 ">
                Save
              </button>{" "}
              <br />
            </form>
          </Grid>

          {/* </Grid> */}
        </Container>
      </div>
      <div className="mt-5 mb-5 passwordChange ">
        <div>
          <h2>Change Password:</h2>

          <br />
          <TextField
            sx={{ width: "40%", m: 1 }}
            id="standard-basic"
            label="New Password "
            type="password"
            name="password2"
            onBlur={handleOnBlur}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <br />

          <button className="btn btn-danger" onClick={handleChangePassword}>
            Change Password
          </button>
          {errorMessage && (
            <div className="">Password should be at least 6 characters</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
