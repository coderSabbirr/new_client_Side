import ClearIcon from "@mui/icons-material/Clear";
import { Button, DialogContent, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import Swal from "sweetalert2";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SignleAdminDeposit = ({ depositData, index }) => {
  const { DepositMethod, phonenumber, txnid, displayName, _id, image } =
    depositData;
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
          const url = `http://localhost:5000/depositupdate/${id}`;
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <tbody>
      <tr>
        {/* <th scope="row">1</th> */}
        <td>{index + 1}</td>
        <td>{displayName}</td>
        <td>{DepositMethod}</td>
        <td>{txnid}</td>
        <td>{phonenumber}</td>
        <td>
          <Button variant="outlined" onClick={handleClickOpen}>
            view
          </Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <ClearIcon />
            </IconButton>
            <DialogContent dividers>
              <img
                className="w-100 image"
                src={`data:image/png;base64,${image}`}
                alt=""
              />
            </DialogContent>
          </BootstrapDialog>
        </td>
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
