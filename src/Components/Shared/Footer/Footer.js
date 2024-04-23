import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer ">
      <div className=" footer-text container">
        <div className="address  common-div">
          <img src="https://i.ibb.co/fvStVM0/logo-white.png" alt="" />
          <p className="mt-4">
            {" "}
            Our no-haggle pricing is just the beginning of a no-hassle
            experience. We treat people the way we’d want to be treated, so you
            get the best car at the best price, without having to know anything
            about cars.
          </p>
          <p>
            <a href="mailto:sabbirnahid5817@gmail.com">
              <i className="fas fa-envelope"></i> demo@admin.com
            </a>
          </p>
          <p>
            <a href="tel:(0800) 1234 567891">
              <i className="fas fa-phone-alt"></i> (0800) 1234 567891
            </a>
          </p>
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin"></i>
          <i className="fab fa-youtube"></i>
        </div>
        <div className="live-feed  common-div">
          <h2>Quick Links</h2>
          <ul className="mt-4">
            <li>Home</li>
            <li>About Us</li>
            <li>Comparison</li>
          </ul>
        </div>
        <div className="live-feed  common-div">
          <h2>Twitter Get Our Apps</h2>
          <a href="..">
            <img
              className="mt-2 mb-3"
              src="https://i.ibb.co/Wfb42jq/Screenshot-153.jpg"
              alt="google"
            />
          </a>
          <a href=".." alt="app-store">
            <img
              className="ps-1"
              src="https://i.ibb.co/FnSFSmr/Screenshot-154.jpg"
              alt=""
            />
          </a>
        </div>
      </div>
      <div>
        <p className="copy-right">
          Copyrights © 2021 by <span className="doc-copy"> Web</span>. All
          Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
