import React, { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import Myorder from "./MyOrder/Myorder";

const MyOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5000/orders/${user.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user]);
  return (
    <div className="myorder">
      <h1 className="heading" style={{ backgroundColor: "#FCF6F6" }}>
        My Order
      </h1>
      <div className="container">
        <div className="row">
          {orders.map((order) => (
            <Myorder order={order} key={order._id}></Myorder>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
