import React from "react";

const SingleOrder = ({ order }) => {
  const { full_name, address, city, state, user_email, phone } = order;
  const { title, price } = order.booking_deatils;
  const status = order.status.status;

  const handleDelete = (id) => {
    const url = `http://localhost:5000/orders/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // window.location.reload();
      });
  };

  const updateOrder = (id) => {
    const update = {
      status: "Shipped",
    };
    const url = `http://localhost:5000/ordersupdate/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      });
  };
  let stutesbar = [];
  if (order.status.status === "Pending") {
    stutesbar = "Approve";
  } else {
    stutesbar = status;
  }

  return (
    <tbody>
      <tr>
        {/* <th scope="row">1</th> */}
        <td>{full_name}</td>
        <td>{title}</td>
        <td>${price}</td>
        <td>{user_email}</td>
        <td>
          {address},{city},{state}
        </td>
        <td>{phone}</td>
        <td>
          <button
            className="btn btn-primary "
            onClick={() => updateOrder(order._id)}
          >
            {stutesbar}
          </button>
        </td>
        <td>
          <i
            onClick={() => handleDelete(order._id)}
            className="fas fa-trash-alt delete-button text-center"
          ></i>
        </td>
      </tr>
    </tbody>
  );
};

export default SingleOrder;
