import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import useAuth from "../../../../Hook/useAuth";
import "./username.css";

const UserName = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5000/orders/${user.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user]);
  return (
    <div className="myorder usernamePage">
      <h1 className="heading" style={{ backgroundColor: "#FCF6F6" }}>
        User Dashboard
      </h1>
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
                border: "10px solid #ACACAC  ",
                borderRadius: "16px",
              }}
              component="section"
            >
              <h4>Main Login</h4>
            </Box>
            <Iframe
              url="https://www.babu88.co/"
              width="90%"
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
