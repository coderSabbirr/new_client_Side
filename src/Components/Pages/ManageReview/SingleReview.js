import React from "react";
import "./ManageReview.css";
const SingleReview = ({ review }) => {
  const { name, email, description, rating, _id } = review;

  const handleDelete = () => {
    const url = `http://localhost:5000/review/${_id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      });
  };
  return (
    <div className="prodcuts-details-manage col-md-3">
      <div className="my-order-title">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Rating: {rating}</p>
        <p>Description: {description}</p>
        <button className="review-delete" onClick={() => handleDelete(_id)}>
          delete
        </button>
      </div>
    </div>
  );
};

export default SingleReview;
