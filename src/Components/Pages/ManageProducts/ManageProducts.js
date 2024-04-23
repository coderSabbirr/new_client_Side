import React, { useEffect, useState } from "react";
import SingleProducts from "./SingleProducts/SingleProducts";

const ManageProducts = () => {
  const [mangaProduct, setMagaProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setMagaProduct(data));
  }, []);

  return (
    <div className="" style={{ backgroundColor: "#EFF0F5" }}>
      <h1 className="manage-all-product">All Product</h1>
      <div className="container">
        <div className="manage-products">
          {mangaProduct.map((product) => (
            <SingleProducts
              product={product}
              key={product._id}
            ></SingleProducts>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
