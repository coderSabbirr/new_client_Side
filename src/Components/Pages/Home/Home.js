import React from 'react';
import Banner from './Banner/Banner';
import CustomerReviews from './CustomerReviews/CustomerReviews/CustomerReviews';
import FeatureArea from './FeatureArea/FeatureArea';
import OfferTimeLine from './OfferTimeLine/OfferTimeLine';
import ProductArea from './ProductArea/ProductArea';
import Slider from './Slider/Slider';

const Home = () => {
    return (
        <div>
            <Slider />
            <Banner />
            <FeatureArea />
            <ProductArea />
            <OfferTimeLine />
            <CustomerReviews />
        </div>
    );
};

export default Home;