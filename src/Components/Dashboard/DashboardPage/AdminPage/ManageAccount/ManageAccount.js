import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../../Hook/useAuth";

const ManageAccount = () => {
  const [loginData, setLoginData] = useState({});
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [bankData, setBankData] = useState([]);
  const { reset } = useForm();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/addpayment/${user.email}`)
      .then((res) => res.json())
      .then((data) => setPaymentOptions(data));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/addbank/${user.email}`)
      .then((res) => res.json())
      .then((data) => setBankData(data));
  }, []);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  //   console.log(handleOnBlur);
  const handleLoginSubmit = (e) => {
    const update = {
      status: "Pending",
    };
    loginData.name = user.displayName;
    loginData.user_email = user.email;
    loginData.status = update;
    fetch("http://localhost:5000/withdraw", {
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
  console.log("====================================");
  console.log(loginData);
  console.log("====================================");
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    ></Box>
  );

  return (
    <div className="add-deposit">
      <h3 className="page-title">Manage Account</h3>
      <div className="container ">
        <Container className="text-center register">
          {/* <Grid container spacing={2}> */}
          <Grid item>
            <p className="or-sign"></p>

            <form onSubmit={handleLoginSubmit}>
              <div>
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
                  >
                    <option value="Bkash" className="text-capitalize">
                      Bkash
                    </option>
                    <option value="Nagad" className="text-capitalize">
                      Nagad
                    </option>
                    <option value="Rocket" className="text-capitalize">
                      Rocket
                    </option>
                  </Select>
                </FormControl>
              </div>
              <br />
              <button type="submi" className="sign-up-btn mb-5">
                Update
              </button>{" "}
              <br />
            </form>
          </Grid>

          {/* </Grid> */}
        </Container>
      </div>
    </div>
  );
};

export default ManageAccount;
