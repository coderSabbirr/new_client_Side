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
import Swal from "sweetalert2";

const ManageAccount = () => {
  const [loginData, setLoginData] = useState({});
  const [bankData, setBankData] = useState({});
  const [BankId, setBankId] = useState({});

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  useEffect(() => {
    const url = `http://localhost:5000/bankaccount`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const ids = data.map((bankDetail) => bankDetail._id);
        setBankId(ids[0]);
      });
  }, []);
  const handleBankblur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...bankData };
    newLoginData[field] = value;
    setBankData(newLoginData);
  };

  const handleLoginSubmit = (e) => {
    fetch("http://localhost:5000/mobileaccount", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((result) => {
        e.preventDefault();
      });
  };

  const handleBank = (e) => {
    bankData.BankId = BankId;
    fetch("http://localhost:5000/bankaccount", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bankData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire("Updated!", "", "Success");
        }
      });
  };
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
                    type="mobileMethod"
                    name="mobileMethod"
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
              <TextField
                sx={{ width: "100%", m: 1 }}
                id="standard-basic"
                label="Mobile Number"
                name="mobileNumber"
                onBlur={handleOnBlur}
                type="number"
                required
              />
              <br />
              <button type="submi" className="sign-up-btn mb-5">
                Update
              </button>{" "}
              <br />
            </form>
          </Grid>
          <div>
            {" "}
            <Grid item>
              <form onSubmit={handleBank}>
                <TextField
                  sx={{ width: "100%", m: 1 }}
                  id="standard-basic"
                  label="Bank Name"
                  name="BankName"
                  onBlur={handleBankblur}
                  type="text"
                  required
                />
                <br />
                <TextField
                  sx={{ width: "100%", m: 1 }}
                  id="standard-basic"
                  label="Bank Holder Name"
                  name="Name"
                  onBlur={handleBankblur}
                  type="text"
                  required
                />
                <br />
                <TextField
                  sx={{ width: "100%", m: 1 }}
                  id="standard-basic"
                  label="Account Number"
                  name="accountNumber"
                  onBlur={handleBankblur}
                  type="number"
                  required
                />
                <br />
                <TextField
                  sx={{ width: "100%", m: 1 }}
                  id="standard-basic"
                  label="Routing Number"
                  name="routingNumber"
                  onBlur={handleBankblur}
                  type="number"
                  required
                />
                <br />
                <button type="submi" className="sign-up-btn mb-5">
                  Update Bank Details
                </button>{" "}
                <br />
              </form>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ManageAccount;
