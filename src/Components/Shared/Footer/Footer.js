import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer ">
      <div className=" footer-text container">
        {/* <div className="address  common-div">
         
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
        </div> */}
        <div className="live-feed  common-div"></div>
        <div className="live-feed  common-div">
          <h2> Get Our Apps</h2>
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
