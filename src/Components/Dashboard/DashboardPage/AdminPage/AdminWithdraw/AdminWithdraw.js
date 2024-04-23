import React, { useEffect, useState } from "react";
import "./AdminWithdraw.css";
import SignleAdminWithdraw from "./SignleAdminWithdraw/SignleAdminWithdraw";
const AdminWithdraw = () => {
  const [depositDatas, setDepositData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/withdraw")
      .then((res) => res.json())
      .then((data) => setDepositData(data));
  });

  return (
    <div className="manageorder">
      <h2 className="mb-5">Withdraw History</h2>
      <div className="table-responsive ">
        <table className="table table-bordered border-dark ">
          <thead className=" ">
            <tr>
              <th scope="col">SI NO</th>
              <th scope="col">Name</th>
              <th scope="col">Gateway</th>
              <th scope="col">Account Number</th>
              <th scope="col">Routing Number</th>
              <th scope="col">Amount</th>
              <th scope="col">Statues</th>
              <th scope="col">Delete Withdraw</th>
              {/* <th scope="col">Cencel Order</th> */}
            </tr>
          </thead>
          {depositDatas.map((depositData) => (
            <SignleAdminWithdraw
              depositData={depositData}
              key={depositData._id}
            ></SignleAdminWithdraw>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AdminWithdraw;
