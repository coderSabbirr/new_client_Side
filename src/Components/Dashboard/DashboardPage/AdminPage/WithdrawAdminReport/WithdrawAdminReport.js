import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleWithdrawAdminReport from "./SingleWithdrawAdminReportWithdrawAdminReport/SingleWithdrawAdminReport";
import "./WithdrawAdminReport.css";

// Import statements...

const WithdrawAdminReport = () => {
  const [mainDatas, setMainDatas] = useState([]);
  const [AllMainDatas, setAllMainDatas] = useState([]);
  const [mailData, setMailData] = useState({});

  const handleMail = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newMailData = { ...mailData, [field]: value };
    setMailData(newMailData);
  };

  useEffect(() => {
    fetch("http://localhost:5000/withdraw")
      .then((response) => response.json())
      .then((data) => {
        setMainDatas(data);
        setAllMainDatas(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const filtered = AllMainDatas.filter((allMainData) => {
      const withdrawData = allMainData.user_email;
      return withdrawData === mailData.userName;
    });

    setMainDatas(filtered);
  };

  return (
    <div className=" mt-2 p-2">
      <div className=" mt-5">
        <form onSubmit={handleLoginSubmit} className="row">
          <div className="flex-container">
            <div className="text-1">
              <TextField
                className="report-input"
                sx={{ m: 1 }}
                id="standard-basic"
                label="User Name"
                name="userName"
                onBlur={handleMail}
                type="text"
                required
              />
            </div>

            <div className="">
              <button type="submit" className="submit-btn btn btn-warning ">
                Submit
              </button>
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

            {mainDatas.map((mainData, index) => (
              <SingleWithdrawAdminReport
                index={index}
                mainData={mainData}
                key={mainData?._id}
              ></SingleWithdrawAdminReport>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
export default WithdrawAdminReport;
