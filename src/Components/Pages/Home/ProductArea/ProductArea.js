import React, { useEffect, useState } from "react";
import "./ProductArea.css";
import SingleProduct from "./SingleProduct.js/SingleProduct";
const ProductArea = () => {
  const [prodcuts, setproducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setproducts(data));
  }, []);
  return (
    <div className="productsarea container">
      <h1 className="productsarea-title">#products</h1>
      <div className="products">
        {prodcuts.slice(0, 8).map((prodcut) => (
          <SingleProduct key={prodcut._id} prodcut={prodcut}></SingleProduct>
        ))}
      </div>
    </div>
  );
};

export default ProductArea;
