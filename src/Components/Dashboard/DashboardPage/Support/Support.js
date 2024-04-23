import React, { useEffect, useState } from "react";

import "./Support.css";
const Support = () => {
  const [agent, setAgent] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/agentlist")
      .then((res) => res.json())
      .then((data) => setAgent(data));
  }, []);
  return (
    <div className="SupportAgent">
      <h5 className="page-title"> Agent List</h5>
      <div className="table-responsive ">
        <table className="table table-bordered ">
          <thead>
            <tr className="text-data">
              <th scope="col">SI No</th>
              <th scope="col">Name</th>
              <th scope="col">Whatsapp</th>
            </tr>
          </thead>
          <tbody>
            {agent.map((pd, index) => (
              <tr>
                <th scope="row">{pd?.agentID}</th>
                <td>{pd?.name}</td>
                <td>
                  <a href={`https://wa.me/${pd?.whatsapp}`}>{pd.whatsapp}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Support;
