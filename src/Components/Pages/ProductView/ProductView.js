import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import "./ProductView.css";

const ProductView = () => {
  let { productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const sharelink = `https://jesco-shop.web.app${location.pathname}`;
  useEffect(() => {
    const url = `http://localhost:5000/product/${productId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productId]);

  const { _id, price, image, description, title } = product;

  return (
    <div className="container product-view">
      <div className="d-flex prodcout-sec">
        <div>
          <img className="product-image" src={image} alt={title} />
        </div>
        <div className="product-content">
          <h2 className="product-title">{title}</h2>
          <h2 className="product-price">(approx. ${price})</h2>
          <p className="product-description">{description}</p>
          <div className="produt-btn">
            <Link to={`/booking/${_id}`}>
              <button className="buy-now-btn">BUY</button>
            </Link>

            <button
              type="button"
              className="share-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              SHARE
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <button
                    type="button"
                    className="close-btn"
                    data-bs-dismiss="modal"
                  >
                    <img src="https://i.ibb.co/SfJQmw7/cors-btn.png" alt="" />
                  </button>
                  <div className="modal-body text-center">
                    <FacebookShareButton className="m-2" url={sharelink}>
                      <FacebookIcon logofillcolor="white" />
                    </FacebookShareButton>

                    <TwitterShareButton className="m-2" url={sharelink}>
                      <TwitterIcon logofillcolor="white" />
                    </TwitterShareButton>

                    <LinkedinShareButton className="m-2" url={sharelink}>
                      <LinkedinIcon logofillcolor="white" />
                    </LinkedinShareButton>

                    <EmailShareButton className="m-2" url={sharelink}>
                      <EmailIcon logofillcolor="white" />
                    </EmailShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
