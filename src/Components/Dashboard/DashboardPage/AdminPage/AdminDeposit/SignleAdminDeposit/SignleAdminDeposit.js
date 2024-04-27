import React from "react";
import Swal from "sweetalert2";

const SignleAdminDeposit = ({ depositData }) => {
  const { DepositMethod, phonenumber, txnid, displayName, _id } = depositData;
  const status = depositData.status.status;
  const approveTime = new Date().toLocaleString();

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
          const url = `http://localhost:5000/deposit/${id}`;
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
      approveTime: approveTime,
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
          const url = `http://localhost:5000/ordersupdate/${id}`;
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
        <td>{displayName}</td>
        <td>{DepositMethod}</td>
        <td>{txnid}</td>
        <td>{phonenumber}</td>
        <td>77777</td>
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
            onClick={() => handleDelete(_id)}
            className="fas fa-trash-alt delete-button text-center"
          ></i>
        </td>
      </tr>
    </tbody>
  );
};

export default SignleAdminDeposit;
