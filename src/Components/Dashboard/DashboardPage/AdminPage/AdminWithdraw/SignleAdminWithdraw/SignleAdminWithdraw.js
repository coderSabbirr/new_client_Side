import React from "react";
import Swal from "sweetalert2";

const SignleAdminWithdraw = ({ depositData }) => {
  const withdrawTime = new Date().toLocaleString();
  const {
    _id,
    Bank,
    accountName,
    accountNumber,
    amount,
    routingNumber,
    name,
    mobileMethd,
  } = depositData;
  const status = depositData?.status?.status;

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
          const url = `https://react365.onrender.com/withdraw/${id}`;
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
      withdrawTime: withdrawTime,
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
          const url = `https://react365.onrender.com/withdrawupdate/${id}`;
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
  if (depositData?.status?.status === "Pending") {
    stutesbar = "Approve";
  } else {
    stutesbar = status;
  }

  return (
    <tbody>
      <tr>
        {/* <th scope="row">1</th> */}
        <td>10</td>
        <td>
          {name}
          {accountName}
        </td>
        <td>
          {Bank}
          {mobileMethd}
        </td>

        <td>
          {accountNumber}

          {mobileMethd}
        </td>
        <td>{routingNumber}</td>
        <td>{amount}</td>
        <td>
          {depositData?.status?.status === "Approved" && (
            <button className="btn btn-primary " disabled>
              {stutesbar}
            </button>
          )}

          {depositData?.status?.status === "Pending" && (
            <button
              className="btn btn-primary "
              onClick={() => updateStatus(_id)}
            >
              {stutesbar}
            </button>
          )}
        </td>

        <td>
          <i
            onClick={() => handleDelete(depositData._id)}
            className="fas fa-trash-alt delete-button text-center"
          ></i>
        </td>
      </tr>
    </tbody>
  );
};

export default SignleAdminWithdraw;
