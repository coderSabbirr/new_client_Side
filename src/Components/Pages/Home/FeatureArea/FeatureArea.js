import React from 'react';
import './FeatureArea.css';
const FeatureArea = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="single-feature">
                        <div className="feature-icon">
                            <img src="https://i.ibb.co/N9R1Gsp/1.png" alt="" />
                        </div>
                        <div className="feature-content">
                            <h4 className="feature-title">Free Shipping</h4>
                            <span className="sub-title">Capped at $39 per order</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="single-feature">
                        <div className="feature-icon">
                            <img src="https://i.ibb.co/tMCwhwT/2-1.png" alt="" />
                        </div>
                        <div className="feature-content">
                            <h4 className="feature-title">Card Payments</h4>
                            <span className="sub-title">12 Months Installments</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="single-feature">
                        <div className="feature-icon">
                            <img src="https://i.ibb.co/J58mP20/3.png" alt="" />
                        </div>
                        <div className="feature-content">
                            <h4 className="feature-title">Easy Returns</h4>
                            <span className="sub-title">Shop With Confidence</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default FeatureArea;