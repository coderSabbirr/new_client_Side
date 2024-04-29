import { LinearProgress } from "@mui/material";
import React from "react";

const SignleDepositAdminReport = ({ mainData, index }) => {
  const { email, depositTime, amount } = mainData;
  const status = mainData?.status?.status;

  let stutesbar = [];
  if (mainData?.status?.status === "Pending") {
    stutesbar = "Approve";
  } else {
    stutesbar = status;
  }
  // console.log(mainData.length);

  return (
    <tbody>
      <tr>
        {[mainData].length < 0 && <LinearProgress color="success" />}

        <td>{index + 1}</td>
        <td>Deposit</td>
        <td>{email}</td>
        <td>{depositTime}</td>
        {mainData?.status?.status === "Pending" && <td>Unapproved</td>}
        {mainData?.status?.status === "Approved" && <td>Approved</td>}
        <td>{amount}</td>
        <td>{mainData.status.approveTime}</td>
      </tr>
    </tbody>
  );
};

export default SignleDepositAdminReport;
