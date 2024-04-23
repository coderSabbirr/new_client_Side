import React from "react";
import { useForm } from "react-hook-form";
import "./AddProducts.css";
const AddProducts = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const rating = parseInt(data.rate);

    if (5 >= rating) {
      fetch("http://localhost:5000/addprodcut", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          reset();
        });
    } else {
      alert("plase 1-5 star");
    }
  };

  return (
    <div className="add-prodcut">
      <h3 className="page-title">Add Your Product</h3>
      <div className="container ">
        <form
          className="row  addproduct-from"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="product-details">Product Deatils</p>
          <div className="col-md-12">
            <label className="form-label">Product Title</label>
            <input
              type="name"
              className="form-control"
              {...register("title", { required: true })}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Price </label>
            <input
              type="text"
              className="form-control"
              {...register("price", { required: true })}
            />
          </div>
          <div className="col-6">
            <label className="form-label">Rating </label>
            <input
              type="text"
              className="form-control"
              {...register("rate", { required: true })}
            />
          </div>
          <div className="col-6">
            <label className="form-label">Count </label>
            <input
              type="text"
              className="form-control"
              {...register("count", { required: true })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Description </label>
            <textarea
              id="w3review"
              rows="4"
              cols="50"
              type="text"
              className="form-control"
              {...register("description", { required: true })}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Image Link</label>
            <input
              type="text"
              className="form-control "
              id="inputCity"
              {...register("image", { required: true })}
            />
          </div>

          <div className="col-12">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
