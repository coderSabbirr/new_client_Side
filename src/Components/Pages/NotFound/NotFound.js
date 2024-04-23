import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';
import notFound from './notFound.svg';
const NotFound = () => {
    return (
        <div className="notFound">
            <img src={notFound} alt="" /><br/>
            <Link className="btn btn-primary mt-5" to="/home">Back To Home</Link>
        </div>
    );
};

export default NotFound;