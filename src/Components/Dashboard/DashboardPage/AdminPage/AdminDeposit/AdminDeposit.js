import React, { useEffect, useState } from "react";
import "./AdminDeposit.css";
import SignleAdminDeposit from "./SignleAdminDeposit/SignleAdminDeposit";
const AdminDeposit = () => {
  const [depositDatas, setDepositData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/deposit")
      .then((res) => res.json())
      .then((data) => setDepositData(data));
  });

  return (
    <div className="manageorder p-2">
      <h1 className="page-title mt-4">Deposit History</h1>
      <div className=" table-responsive ">
        <table className="table table-bordered border-dark ">
          <thead className=" ">
            <tr>
              <th scope="col">SI NO</th>
              <th scope="col">Name</th>
              <th scope="col">Gateway</th>
              <th scope="col">Tnx ID</th>
              <th scope="col">Number</th>
              <th scope="col">Screenshot</th>
              <th scope="col">Statues</th>
              <th scope="col">Delete Deposit</th>
            </tr>
          </thead>
          {depositDatas.map((depositData, index) => (
            <SignleAdminDeposit
              index={index}
              depositData={depositData}
              key={depositData._id}
            ></SignleAdminDeposit>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AdminDeposit;
