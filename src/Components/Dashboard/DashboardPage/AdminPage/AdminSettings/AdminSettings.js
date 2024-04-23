import { Box, Container, Grid, TextField } from "@mui/material";
import { getAuth, updatePassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../../Hook/useAuth";
import "./AdminSettings.css";

const AdminSettings = () => {
  const [loginData, setLoginData] = useState({});
  const [agent, setAgent] = useState([]);
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

  // password change options
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

  useEffect(() => {
    fetch("http://localhost:5000/agentlist")
      .then((res) => res.json())
      .then((data) => setAgent(data));
  });

  const handleLoginSubmit = (e) => {
    loginData.user_email = user.email;
    fetch("http://localhost:5000/agentlist", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire("Agent!", "", "Success");
          reset();
        }
        reset();
      });

    e.preventDefault();
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const url = `http://localhost:5000/agentlist/${id}`;
          fetch(url, {
            method: "DELETE",
          });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      })
      .then((res) => res.json())
      .then((data) => {
        // window.location.reload();
      });
  };
  return (
    <div className="add-deposit">
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

          {/* <div className="container">
            <div class="form-group mx-sm-3 mb-2">
              <div row>
                <div className="col">
                  <h3>Password</h3>
                </div>
                <div className="col">
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword2"
                    placeholder="Password"
                    style={{ width: "100%", marginLeft: "5px" }}
                  />
                </div>
              </div>
            </div>
          </div> */}

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
      <h3
        className="
      "
      >
        Add Agent:{" "}
      </h3>
      <div className="container ">
        <Container className="text-center register">
          {/* <Grid container spacing={2}> */}
          <Grid item>
            <p className="or-sign"></p>

            <form onSubmit={handleLoginSubmit}>
              <div>
                <div>
                  <TextField
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Agent ID "
                    name="agentID"
                    onBlur={handleOnBlur}
                    type="number"
                    required
                  />
                  <TextField
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Agent Name "
                    name="name"
                    onBlur={handleOnBlur}
                    type="text"
                    required
                  />
                  <br />
                  <TextField
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Whatsapp No"
                    name="whatsapp"
                    onBlur={handleOnBlur}
                    type="number"
                    required
                  />
                </div>
              </div>
              <br />
              <button type="submi" className="sign-up-btn mb-5">
                Submit
              </button>{" "}
              <br />
            </form>
          </Grid>

          {/* </Grid> */}

          <div className="SupportAgent">
            <h5 className="mt-10 mb-10">Remove Agent</h5>
            <div className="table-responsive ">
              <table className="table table-bordered ">
                <thead>
                  <tr className="text-data">
                    <th scope="col">SI No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Whatsapp</th>
                    <th scope="col">Agent Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {agent.map((pd, index) => (
                    <tr>
                      <th scope="row">{pd?.agentID}</th>
                      <td>{pd?.name}</td>
                      <td>
                        <a href={`https://wa.me/${pd?.whatsapp}`}>
                          {pd.whatsapp}
                        </a>
                      </td>
                      <td>
                        <i
                          onClick={() => handleDelete(pd._id)}
                          className="fas fa-trash-alt delete-button text-center"
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminSettings;
