import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import AddProducts from "../../Pages/AddProducts/AddProducts";
import ManageProducts from "../../Pages/ManageProducts/ManageProducts";
import MangeReviews from "../../Pages/ManageReview/ManageReview";
import MangeOrders from "../../Pages/MangeOrder/MangeOrder";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import AddReviews from "../../Pages/ReviewAdd/ReviewAdd";
import AdminRoute from "../AdminRoute/AdminRoute";
import DashboardHome from "../DashboardHome/DashboardHome";
import AdminDeposit from "../DashboardPage/AdminPage/AdminDeposit/AdminDeposit";
import AdminSettings from "../DashboardPage/AdminPage/AdminSettings/AdminSettings";
import AdminWithdraw from "../DashboardPage/AdminPage/AdminWithdraw/AdminWithdraw";
import DepositAdminReport from "../DashboardPage/AdminPage/DepositAdminReport/DepositAdminReport";
import WithdrawAdminReport from "../DashboardPage/AdminPage/WithdrawAdminReport/WithdrawAdminReport";
import UserName from "../DashboardPage/DashboardUser/UserName/UserName";
import Deposit from "../DashboardPage/Deposit/Deposit";
import SettingsPage from "../DashboardPage/SettingsPage/SettingsPage";
import Support from "../DashboardPage/Support/Support";
import Withdraw from "../DashboardPage/Withdraw/Withdraw";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import "./Dashboard.css";

const Dashbaord = () => {
  const { user, logOut } = useAuth();
  let { path, url } = useRouteMatch();
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/checkAdmin/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data[0]?.role === "admin") {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      });
  }, [user?.email]);

  return (
    <div>
      <div className="dashboard-container ">
        <div className="row">
          <div className="col-md-2 ">
            <div className="Dashboard">
              <Link to={url}>
                <h5 className="dashboard-heading">{user.email} </h5>
              </Link>

              <div className="dashboard-all">
                {/* {isAdmin ? */}
                <>
                  <Link to={`${url}/mydashboard`}>
                    <li className="dashboard-menu bold">Dashboard</li>
                  </Link>
                  <Link to={`${url}/deposit`}>
                    <li className="dashboard-menu bold">Deposit</li>
                  </Link>

                  <Link to={`${url}/withdraw`}>
                    <li className="dashboard-menu bold">Withdraw</li>
                  </Link>
                  <Link to={`${url}/Support`}>
                    <li className="dashboard-menu bold">Support</li>
                  </Link>
                  <Link to={`${url}/Settings`}>
                    <li className="dashboard-menu bold">Settings</li>
                  </Link>
                </>
                :
                <>
                  <Link to={`${url}/admindeposit`}>
                    <li className="dashboard-menu">Deposit</li>
                  </Link>
                  <Link to={`${url}/admintwithdraw`}>
                    <li className="dashboard-menu">Withdraw</li>
                  </Link>
                  <Link to={`${url}/adminSettings`}>
                    <li className="dashboard-menu">Settings</li>
                  </Link>
                  <Link to={`${url}/depositreport`}>
                    <li className="dashboard-menu">Deposit Report</li>
                  </Link>
                  <Link to={`${url}/withdrawreport`}>
                    <li className="dashboard-menu mb-3">Withdraw Report</li>
                  </Link>
                </>
                <Link to="..">
                  <li
                    className="dashboard-menu logout-dashboard"
                    onClick={logOut}
                  >
                    {" "}
                    Logout
                  </li>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <Switch>
              <Route path={`${path}/mydashboard`}>
                <UserName />
              </Route>
              <Route path={`${path}/deposit`}>
                <Deposit />
              </Route>
              <Route path={`${path}/withdraw`}>
                <Withdraw />
              </Route>
              <Route path={`${path}/support`}>
                <Support />
              </Route>
              <Route path={`${path}/settings`}>
                <SettingsPage />
              </Route>
              <Route path={`${path}/myorder`}>
                <MyOrders></MyOrders>
              </Route>
              <Route path={`${path}/addreview`}>
                <AddReviews></AddReviews>
              </Route>

              <AdminRoute path={`${path}/admindeposit`}>
                <AdminDeposit />
              </AdminRoute>
              <AdminRoute path={`${path}/admintwithdraw`}>
                <AdminWithdraw />
              </AdminRoute>
              <AdminRoute path={`${path}/adminsettings`}>
                <AdminSettings />
              </AdminRoute>
              <AdminRoute path={`${path}/depositreport`}>
                <DepositAdminReport />
              </AdminRoute>
              <AdminRoute path={`${path}/withdrawreport`}>
                <WithdrawAdminReport />
              </AdminRoute>
              <AdminRoute path={`${path}/orderslist`}>
                <MangeOrders></MangeOrders>
              </AdminRoute>
              <AdminRoute path={`${path}/allreview`}>
                <MangeReviews></MangeReviews>
              </AdminRoute>
              <AdminRoute path={`${path}/addproduct`}>
                <AddProducts></AddProducts>
              </AdminRoute>
              <AdminRoute path={`${path}/mangeproducts`}>
                <ManageProducts></ManageProducts>
              </AdminRoute>
              <AdminRoute path={`${path}/makeAdmin`}>
                <MakeAdmin></MakeAdmin>
              </AdminRoute>

              <Route path={path}>
                <DashboardHome />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbaord;
