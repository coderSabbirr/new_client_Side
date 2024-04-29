import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../../../../Hook/useAuth";
import "./UserHistory";

const UserHistory = () => {
  const [userList, setUserList] = useState([]);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    fetch("http://localhost:5000/userlist")
      .then((res) => res.json())
      .then((data) => setUserList(data));
  }, []);
  console.log(userList.agent);
  return (
    <div className=" p-2">
      <h3 className="page-title mt-4 ">User History</h3>
      <div className="">
        <Container className="text-center ">
          <div className="">
            <div className="table-responsive ">
              <table className="table table-bordered ">
                <thead>
                  <tr className="text-data">
                    <th scope="col">SI No</th>
                    <th scope="col">Name</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Agent Name</th>
                  </tr>
                </thead>
                <tbody>
                  {userList?.map((pd, index) => (
                    <tr key={pd._id}>
                      <th scope="row">{index + 1}</th>
                      <th scope="row">{pd.displayName}</th>
                      <td>{pd.email}</td>

                      <td>{pd.agentName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UserHistory;
