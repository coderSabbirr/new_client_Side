import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import "./Deposit.css";
const fileInput = React.createRef();

const Deposit = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loginData, setLoginData] = useState({});
  const { user } = useAuth();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const onSubmit = (data) => {
    const depositTime = new Date().toLocaleString();
    let image = fileInput.current.files[0];
    const formData = new FormData();

    for (var key in loginData) {
      formData.append(key, loginData[key]); // formdata doesn't take objects
    }

    for (var key in data) {
      formData.append(key, data[key]); // formdata doesn't take objects
    }
    formData.append("image", image);
    formData.append("displayName", user.displayName);
    formData.append("depositTime", depositTime);

    fetch("http://localhost:5000/deposit", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire("Submited!", "", "Success");
          reset();
        }
        reset();
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
    <div className="add-deposit">
      <h3 className="page-title">Deposit</h3>
      <div className="container ">
        <form className="row  deposit-from" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormControl className="row">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="DepositMethod"
                onBlur={handleOnBlur}
              >
                <div className="col">
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <FormControlLabel
                        value="Bkash"
                        control={<Radio />}
                        labelPlacement="top"
                        required
                      />
                      <Typography variant="h5" component="div">
                        Bkash
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        0178888899
                      </Typography>
                      <Typography variant="body2"></Typography>
                    </CardContent>
                  </Card>
                </div>

                <div className="col">
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <FormControlLabel
                        value="Nagad"
                        control={<Radio />}
                        labelPlacement="top"
                      />
                      <Typography variant="h5" component="div">
                        Nagad
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        0178888899
                      </Typography>
                      <Typography variant="body2"></Typography>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-100"></div>
                <div className="col">
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <FormControlLabel
                        value="Rocket"
                        control={<Radio />}
                        labelPlacement="top"
                      />
                      <Typography variant="h5" component="div">
                        Rocket
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        0178888899
                        <br />
                        <br />
                      </Typography>
                      <Typography variant="body2"></Typography>
                    </CardContent>
                  </Card>
                </div>

                <div className="col">
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <FormControlLabel
                        value="Bank"
                        control={<Radio />}
                        labelPlacement="top"
                      />
                      <Typography variant="h5" component="div">
                        Bank
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        AC NO: 07788888 | AC Name: ALEX FORD AC NO: 07788888{" "}
                        <></> <br />
                        Routing No: ALEX FORD | Bank Name:ABC Bank
                      </Typography>
                      <Typography variant="body2"></Typography>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            </FormControl>
          </div>
          <p className="product-details">Deposit Deatils</p>
          <div className="col-md-12"></div>
          <div className="col-12 hide">
            <input
              value={user.email}
              className="form-control"
              {...register("usermail", { required: true })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Sender Number </label>
            <input
              type="number"
              className="form-control"
              {...register("phonenumber", { required: true })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Transaction ID </label>
            <input
              type="text"
              className="form-control"
              {...register("txnid", { required: true })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Amount</label>
            <input
              type="text"
              className="form-control"
              {...register("amount", { required: true })}
            />
          </div>
          <div className="col-md-12 mb-5">
            <label className="form-label">Upload Payemnt Screenshot </label>
            <input
              type="file"
              className="form-control "
              accept="image/*"
              id="inputCity"
              ref={fileInput}
            />
          </div>

          <div className="col-12  mb-5">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
