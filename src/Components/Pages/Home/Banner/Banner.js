import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';
const Banner = () => {
    return (
       <div className="banner">
            <div className="container">
            <div className="row">
                <div className="single-col">
                    <Link to="shop" alt="Home" className="single-banner">
                        <img src="https://i.ibb.co/GvykkMh/1.jpg" alt="" />
                        <div className="item-disc">
                            <span className="item-title">WOMEN</span>
                            <span className="item-amount">15 items</span>
                        </div>
                    </Link>
                </div>
                <div className="single-col center-col">
                    <div href=".." alt="Home" className="single-banner">
                        <img src=" https://i.ibb.co/CvXmjw9/2.jpg" alt="" />
                        <div className="item-disc">
                         <h1 className="best-seller">#bestseller</h1>
                         <Link to="shop" className="banner-shop-now">Shop Now</Link>
                        </div>

                    </div>

                </div>
                <div className="single-col">
                    <Link to="shop" alt="shop" className="single-banner">
                        <img src="https://i.ibb.co/x2tKBwK/3.jpg" alt="" />
                        <div className="item-disc">
                            <span className="item-title">MEN</span>
                            <span className="item-amount">20 items</span>
                        </div>

                    </Link>

                </div>
            </div>
        </div>
       </div>
    );
};

export default Banner;