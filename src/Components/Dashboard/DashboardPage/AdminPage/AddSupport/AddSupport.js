import { Box, Container, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../../Hook/useAuth";
import "./addspport.css";

const AddSupport = () => {
  const [loginData, setLoginData] = useState({});
  const [supprtList, setSupportList] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost:5000/supportlist")
      .then((res) => res.json())
      .then((data) => setSupportList(data));
  });

  const handleLoginSubmit = (e) => {
    loginData.user_email = user.email;
    fetch("http://localhost:5000/supportlist", {
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
          const url = `http://localhost:5000/supportlist/${id}`;
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
      <h3
        className="
      "
      >
        Add Suuport:{" "}
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
            <h5 className="mt-10 mb-10">Remove Suuport Agent</h5>
            <div className="table-responsive ">
              <table className="table table-bordered ">
                <thead>
                  <tr className="text-data">
                    <th scope="col">SI No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Whatsapp</th>
                    <th scope="col"> Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {supprtList.map((pd, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{pd?.name}</td>
                      <td>{pd.whatsapp}</td>
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

export default AddSupport;
