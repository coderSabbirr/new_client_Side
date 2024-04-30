import { Box } from "@mui/material";
import React from "react";
import Iframe from "react-iframe";
import "./username.css";

const UserName = () => {
  return (
    <div className=" mt-5">
      <h1 className="page-title ">User Dashboard</h1>
      <div className="">
        <div>
          <Box
            component="section"
            // sx={{ p: 2, border: "30px solid #ACACAC  ", borderRadius: "16px" }}
          >
            <h5>Main Username: ami22@mail.com</h5>
            <br />
            <h5>Main Password:ami22@mail.com </h5>
          </Box>
          <div className="mani-login">
            <Box
              sx={{
                p: 2,
                border: "3px solid #ACACAC  ",
                borderRadius: "16px",
              }}
              component="section"
            >
              <h4>Main Login</h4>
            </Box>
            <Iframe
              url="https://www.babu88.co/"
              width="95%"
              height="700px"
              id=""
              className="main-iframe"
              position="relative"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserName;
