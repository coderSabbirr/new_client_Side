import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./AdminReport.css";
import SignleDepositAdminReport from "./SignleDepositAdminReport/SignleDepositAdminReport";

// Import statements...

const DepositAdminReport = () => {
  const [mainDatas, setMainDatas] = useState([]);
  const [AllMainDatas, setAllMainDatas] = useState([]);
  const [mailData, setMailData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleMail = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newMailData = { ...mailData, [field]: value };
    setMailData(newMailData);
  };

  useEffect(() => {
    fetch("http://localhost:5000/deposit")
      .then((response) => response.json())
      .then((data) => {
        setMainDatas(data);
        setAllMainDatas(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const filtered = mainDatas.filter((allMainData) => {
      const withdrawData = allMainData.email;
      return withdrawData === mailData.userName;
    });

    setMainDatas(filtered);
  };

  const handleSelect = (date) => {
    let filtereded = AllMainDatas.filter((product) => {
      let productDate = new Date(product.depositTime);

      return (
        productDate >= date.selection.startDate &&
        productDate <= date.selection.endDate
      );
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setMainDatas(filtereded);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  return (
    <div className=" mt-2 p-2">
      <div className=" mt-5">
        {/* <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} /> */}
        <div className="mb-3">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            ranges={[selectionRange]}
          />
        </div>
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
              <SignleDepositAdminReport
                index={index}
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
