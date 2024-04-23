import React from "react";
import "./SingleProducts.css";
const SingleProducts = ({ product }) => {
  const { title, price, image, _id } = product;
  const handleDelete = () => {
    const url = `http://localhost:5000/products/${_id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // window.location.reload();
      });
  };

  return (
    <div className="prodcuts-details-manage">
      <div className="d-flex ">
        <div className="my-order-img">
          <img src={image} alt="" />
        </div>
        <div className="my-order-title">
          <p>{title}</p>
          <div>
            <button
              className="order-cancel-btn"
              onClick={() => handleDelete(_id)}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="myprder-price">
          <p>${price}</p>
        </div>
        {/* <div>
                    <p className="status">{status.status}</p>
                </div> */}
        {/* <div>
                    <button className="order-cancel-btn" onClick={() => handleDelete(_id)}>Cancel</button>
                </div> */}
      </div>
    </div>
  );
};

export default SingleProducts;
