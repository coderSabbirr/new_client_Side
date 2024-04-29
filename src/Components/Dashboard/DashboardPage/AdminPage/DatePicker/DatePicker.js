import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import "./DatePic.css";

const DatePicker = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
    axios
      .get("https://662fa90843b6a7dce3105483.mockapi.io/products")
      .then((response) => {
        setProducts(response.data);
        setAllProducts(response.data);
      });
  }, []);

  const handleSelect = (date) => {
    let filtered = allProducts.filter((product) => {
      let productDate = new Date(product.createdAt);
      return (
        productDate >= date.selection.startDate &&
        productDate <= date.selection.endDate
      );
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setProducts(filtered);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  return (
    <div className="date-pic">
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Prodcut</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            let date = new Date(product.createdAt);
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>

                <td>{date.toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DatePicker;
