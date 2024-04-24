import React, { useEffect, useState } from "react";

import { TextField } from "@mui/material";
import "./AdminReport.css";
import SignleDepositAdminReport from "./SignleDepositAdminReport/SignleDepositAdminReport";
const DepositAdminReport = () => {
  const [mainDatas, setMainData] = useState([]);
  const [mailData, setMailData] = useState({});
  const [mailData1, setMailData1] = useState({});
  const [DataLoadings, setDataLoadings] = useState({});

  const handleMail = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...mailData };
    newLoginData[field] = value;
    setMailData(newLoginData);
  };
  //   ?.filter((person) => person.selectSubAdmin === selectname)
  useEffect(() => {
    fetch("https://react365.onrender.com/deposit")
      .then((res) => res.json())
      .then((data) => setMainData(data));
  });

  const handleLoginSubmit = (e) => {
    setMailData1(mailData);
    e.preventDefault();
  };
  return (
    <div className="manageorder">
      <div className="">
        <form onSubmit={handleLoginSubmit} className="row">
          <div className="flex-container">
            <div className="text-1">
              <TextField
                sx={{ width: "100%", m: 1 }}
                id="standard-basic"
                label="User Name"
                name="userName"
                onBlur={handleMail}
                type="text"
                required
              />
            </div>

            <div className="text-2">
              <button type="submi" className="sign-up-btn mb-5">
                Submit
              </button>{" "}
            </div>
          </div>
          <br />
        </form>
        <div className="table-responsive mt-5">
          <table className="table table-bordered border-dark ">
            <thead className=" ">
              <tr>
                <th scope="col">SI NO</th>
                <th scope="col">Type</th>
                <th scope="col">User</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Amount</th>
                <th scope="col">Submit Date</th>
              </tr>
            </thead>

            {mainDatas
              ?.filter((person) => person?.email === mailData1.userName)
              .map((mainData) => (
                <SignleDepositAdminReport
                  mainData={mainData}
                  key={mainData?._id}
                ></SignleDepositAdminReport>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepositAdminReport;
