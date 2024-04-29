import { Box, TextField } from "@mui/material";
import { getAuth, updatePassword } from "firebase/auth";
import React, { useState } from "react";
import "./UserPassword.css";

const UserPassword = () => {
  const [loginData, setLoginData] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  // password change options
  const handleChangePassword = () => {
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

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <div className="p-2">
      <div className="mt-5 mb-5 passwordChange ">
        <div>
          <h2 className="page-title mt-4">Change Password:</h2>

          <br />
          <TextField
            className="adminpass"
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

          <button
            className="btn btn-danger mt-2"
            onClick={handleChangePassword}
          >
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

export default UserPassword;
