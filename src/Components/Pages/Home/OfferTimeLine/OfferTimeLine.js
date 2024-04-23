import React from 'react';
import { Link } from 'react-router-dom';
import './OfferTimeLine.css';

const OfferTimeLine = () => {

    return (
        <div className="container offer-time-line">
            <div className="d-flex FASHION-dev ">
                <div className="shop-now-sec">
                <h1 className="FASHION">#FASHION SHOP</h1>
                <Link to="/shop"className="shop-now">Shop Now</Link>
                
                </div>
                <div className="shop-img-sec">
                    <img src="https://i.ibb.co/2YnF08v/woman.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default OfferTimeLine;