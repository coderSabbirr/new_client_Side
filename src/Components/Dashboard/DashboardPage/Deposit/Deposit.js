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

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import "./Deposit.css";
import bkash from "./deposit-ewallet-bkash.svg";
import nagad from "./deposit-ewallet-nagad.svg";
import rocket from "./deposit-ewallet-rocket.svg";
const fileInput = React.createRef();

const Deposit = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loginData, setLoginData] = useState({});
  const [mobileDatas, setmobileDatas] = useState([]);
  const [bankDatas, setBankData] = useState("");
  const { user } = useAuth();
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  useEffect(() => {
    fetch("http://localhost:5000/mobileaccount")
      .then((response) => response.json())
      .then((data) => {
        setmobileDatas(data);
      }, []);

    axios.get("http://localhost:5000/bankaccount").then((response) => {
      let bankDatas = response.data;
      bankDatas?.map((person) => {
        setBankData(person);
      });
    });
  }, []);

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
    <div className=" p-5">
      <h3 className="submit-btn-dep mt-3 mb-3">Deposit</h3>
      <div className=" ">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="dep-container">
            <FormControl className="row">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="DepositMethod"
                onBlur={handleOnBlur}
              >
                <div className="col">
                  <Card sx={{ minWidth: 275 }} className="bkashDiv">
                    <CardContent>
                      <FormControlLabel
                        value="Bkash"
                        control={<Radio />}
                        labelPlacement="top"
                        required
                      />
                      <Typography variant="h5" component="div">
                        <img src={bkash} alt="bkash" />
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.black">
                        {mobileDatas[0]?.mobileNumber}
                      </Typography>
                      <Typography variant="body2"></Typography>
                    </CardContent>
                  </Card>
                </div>

                <div className="col  ">
                  <Card sx={{ minWidth: 275 }} className="nagadDiv">
                    <CardContent>
                      <FormControlLabel
                        value="Nagad"
                        control={<Radio />}
                        labelPlacement="top"
                      />
                      <Typography variant="h5" component="div">
                        <img src={nagad} alt="nagad" />
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.black">
                        {mobileDatas[1]?.mobileNumber}
                      </Typography>
                      <Typography variant="body2"></Typography>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-100"></div>
                <div className="col">
                  <Card sx={{ minWidth: 275 }} className="rocketDiv">
                    <CardContent>
                      <FormControlLabel
                        value="Rocket"
                        control={<Radio />}
                        labelPlacement="top"
                      />
                      <Typography variant="h5" component="div">
                        <img src={rocket} alt="rocket" />
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.black">
                        {mobileDatas[2]?.mobileNumber}
                        <br />
                        <br />
                      </Typography>
                      <Typography variant="body2"></Typography>
                    </CardContent>
                  </Card>
                </div>

                <div className="col">
                  <Card sx={{ minWidth: 275 }} className="bankDiv">
                    <CardContent>
                      <FormControlLabel
                        value="Bank"
                        control={<Radio />}
                        labelPlacement="top"
                      />
                      <Typography variant="h5" component="div">
                        Bank
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.black">
                        AC NO:{bankDatas?.accountNumber} | AC Name:
                        {bankDatas?.Name} <></> <br />
                        Routing No:{bankDatas?.routingNumber}| Bank Name:
                        {bankDatas?.BankName}
                      </Typography>
                      <Typography variant="body2"></Typography>
                    </CardContent>
                  </Card>
                  ;
                </div>
              </RadioGroup>
            </FormControl>
          </div>

          <div className="input-dev-dep">
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
              <label className="form-label">Deposit Amount</label>
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
                required
              />
            </div>

            <div className="col-12  mb-5">
              <input
                type="submit"
                value="Submit"
                className="btn btn-warning submit-btn-dep"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
