import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import "./ReviewAdd.css";

const ReviewAdd = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const onSubmit = (data) => {
    data.name = user.displayName;
    data.ratingKey = Math.random();
    data.email = user.email;
    data.photo = user.photoURL;
    const rating = parseInt(data.rating);

    if (5 >= rating) {
      fetch("http://localhost:5000/addreview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          reset();
        });
    } else {
      alert("please  1-5 star");
    }
  };
  return (
    <div>
      <h1 className="write-review">Write Review</h1>
      <div className="container">
        <form className="review-from" onSubmit={handleSubmit(onSubmit)}>
          <p></p>
          <div className="col-md-12">
            <label className="form-label">Your Rating</label>
            <input
              type="name"
              className="form-control"
              {...register("rating", { required: true })}
            />
          </div>

          <div className="col-12">
            <label className="form-label"> Review deatil </label>
            <textarea
              id="w3review"
              placeholder="Please share your feedback about the product:
Was the product as described? What is the quality like?"
              rows="4"
              cols="50"
              type="text"
              className="form-control"
              {...register("description", { required: true })}
            />
          </div>

          <div className="col-12">
            <input type="submit" value="Submit" className="review-btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewAdd;
