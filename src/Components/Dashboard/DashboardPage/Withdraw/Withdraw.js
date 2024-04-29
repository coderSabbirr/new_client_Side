import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import "../Deposit/Deposit.css";
import "./Withdraw.css";

const Withdraw = () => {
  const [loginData, setLoginData] = useState({});
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [bankData, setBankData] = useState([]);
  const { reset } = useForm();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/addpayment/${user.email}`)
      .then((res) => res.json())
      .then((data) => setPaymentOptions(data));
  });
  useEffect(() => {
    fetch(`http://localhost:5000/addbank/${user.email}`)
      .then((res) => res.json())
      .then((data) => setBankData(data));
  });

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    const update = {
      status: "Pending",
    };
    loginData.time = new Date().toLocaleString();
    loginData.order_id = Math.floor(Math.random() * 10000000000000 + 1);
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

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    ></Box>
  );

  return (
    <div className="add-deposit">
      <h3 className="page-title mt-4">Withdraw</h3>
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
                    {" "}
                    <option aria-label="None" value="" />
                    {paymentOptions.map((pd, index) => (
                      <option
                        value={`${pd.mobileMethd} - ${pd.mobileNumber} `}
                        className="text-capitalize"
                      >
                        {pd.mobileMethd} - {pd.mobileNumber}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <h5>OR</h5>
              <div>
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
                      {bankData.map((pd, index) => (
                        <option value={pd.bankName} className="text-capitalize">
                          {pd.bankName} - {pd.accountNumber}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <br />
                  <TextField
                    className="your-email"
                    sx={{ width: "100%", m: 1 }}
                    id="standard-basic"
                    label="Bank Holder Name"
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
                    label="Withdraw Amount"
                    name="amount"
                    onBlur={handleOnBlur}
                    type="number"
                    required
                  />
                </div>
              </div>
              <br />
              <input
                type="submit"
                value="Withdraw Request"
                className="btn btn-warning submit-btn-dep"
              />

              <br />
            </form>
          </Grid>

          {/* </Grid> */}
        </Container>
      </div>
    </div>
  );
};

export default Withdraw;
