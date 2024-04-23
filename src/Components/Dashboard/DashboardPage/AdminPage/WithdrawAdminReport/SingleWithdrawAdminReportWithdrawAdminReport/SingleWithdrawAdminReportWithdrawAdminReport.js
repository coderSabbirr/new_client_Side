import React from "react";
import Swal from "sweetalert2";

const SingleWithdrawAdminReport = ({ mainData }) => {
  const { mobileMethd, Bank, amount, time, user_email } = mainData;
  const status = mainData?.status?.status;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const url = `http://localhost:5000/withdraw/${id}`;
          fetch(url, {
            method: "DELETE",
          });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      })
      .then((res) => res.json())
      .then((data) => {
        // window.location.reload();
      });
  };

  const updateStatus = (id) => {
    const update = {
      status: "Approved",
    };
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approved!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const url = `http://localhost:5000/withdrawupdate/${id}`;
          fetch(url, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(update),
          });
          Swal.fire({
            title: "Approved!",
            text: "Approved successful ",
            icon: "success",
          });
        }
      })

      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      });
  };
  let stutesbar = [];
  if (mainData?.status?.status === "Pending") {
    stutesbar = "Approve";
  } else {
    stutesbar = status;
  }
  return (
    <tbody>
      <tr>
        {/* <th scope="row">1</th> */}
        <td>10</td>
        <td>Withdraw</td>
        <td>{user_email}</td>
        <td>{time}</td>
        {mainData?.status?.status === "Pending" && <td>Unapproved</td>}
        {mainData?.status?.status === "Approved" && <td>Approved</td>}

        <td>{amount}</td>
        <td>{mainData?.status?.withdrawTime}</td>
      </tr>
    </tbody>
  );
};

export default SingleWithdrawAdminReport;
