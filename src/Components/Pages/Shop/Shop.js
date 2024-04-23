import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct/SingleProduct";
const Shop = () => {
  const [prodcuts, setproducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setproducts(data));
  }, []);

  return (
    <div>
      <div className="productsarea container">
        <h1 className="productsarea-title">#products</h1>
        <div className="products">
          {prodcuts?.map((prodcut) => (
            <SingleProduct key={prodcut._id} prodcut={prodcut}></SingleProduct>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
