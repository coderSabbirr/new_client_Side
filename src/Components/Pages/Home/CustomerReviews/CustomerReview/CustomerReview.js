import React from 'react';
import './CustomerReview.css';
const CustomerReview = ({review}) => {

    const{name,photo,rating,description,ratingKey
    }=review;

    // customar rating 
 
    const ratingNumber =parseInt(rating)

  
    return (
     
           
  <div className="col-md-6 mb-4 review-card">
    <div className="card review-card-bac">
      <div className="card-body">
        <div>
          {[...Array(ratingNumber)].map(star=>{
             return <i key={ratingKey
             } className="fas rating fa-star" />
             
            })}
        </div>
        <p className="card-text">"{description}"</p>
      </div>
      {photo?
        <img src={photo} className="card-img-top" alt="..."/>:
        <img src="https://i.ibb.co/YRwf7tH/icons8-user-50.png" className="card-img-top" alt="..."/>
      }
      <h3>{name}</h3>
    </div>
  </div>
      
        
    );
};

export default CustomerReview;