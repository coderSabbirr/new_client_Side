import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import "./Booking.css";

const Booking = () => {
  const { productId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [booking, setBooking] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    fetch(`http://localhost:5000/product/${productId}`)
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, [productId]);

  const { title, image, price } = booking;
  const onSubmit = (data) => {
    const update = {
      status: "Pending",
    };
    data.time = new Date().toLocaleString();
    data.order_id = Math.floor(Math.random() * 10000000000000 + 1);
    data.user_email = user.email;
    data.status = update;
    data.booking_deatils = booking;
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        reset();
      });
  };
  return (
    <div className="booking-sec">
      <div className="container ">
        <div className="row">
          <div className="d-flex col-md-6 product-deatils">
            <div className="product-img">
              <img src={image} alt="" />
            </div>
            <div className="product-title">
              <p>{title}</p>
            </div>
            <div className="prodcut-price">
              <p>${price}</p>
            </div>
          </div>
          <div className=" col-md-6">
            <form
              className="row  shipping-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="shipping-billing">Shipping & Billing</p>
              <div className="col-md-12">
                <label className="form-label">Name</label>
                <input
                  type="name"
                  className="form-control"
                  {...register("full_name", { required: true })}
                />
              </div>

              <div className="col-6">
                <label className="form-label">Address </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress1"
                  placeholder="Apartment, studio, or floor"
                  {...register("address", { required: true })}
                />
              </div>
              <div className="col-6">
                <label className="form-label">Phone </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("phone", { required: true })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  {...register("city", { required: true })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  {...register("state", { required: true })}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  {...register("zip", { required: true })}
                />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                    {...register("checkbox", { required: true })}
                  />
                  <label className="form-check-label">Check me out</label>
                </div>
              </div>
              <div className="col-12">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
