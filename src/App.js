import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./Components/Context/AuthProvider";
import Dashbaord from "./Components/Dashboard/Dashboard/Dashboard";
import Booking from "./Components/Pages/Booking/Booking";
import Login from "./Components/Pages/Login/Login";
import NotFound from "./Components/Pages/NotFound/NotFound";
import ProductView from "./Components/Pages/ProductView/ProductView";
import Register from "./Components/Pages/Register/Register";
import Shop from "./Components/Pages/Shop/Shop";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Footer from "./Components/Shared/Footer/Footer";
import Header from "./Components/Shared/Header/Header";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route exact path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/productview/:productId">
              <ProductView></ProductView>
            </Route>

            <PrivateRoute path="/dashboard">
              <Dashbaord></Dashbaord>
            </PrivateRoute>
            {/* <PrivateRoute path="/dashboard">
              <Sidebar></Sidebar>
            </PrivateRoute> */}

            <Route path="/shop/productview/:productId">
              <ProductView></ProductView>
            </Route>

            <PrivateRoute path="/booking/:productId">
              <Booking></Booking>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>

            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div>

    // <div className="App">
    //   <AuthProvider>
    //     <Router>
    //       <Header />
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route index element={<Home />} />
    //         <Route path="home" element={<Home />} />
    //         <Route path="shop" element={<Shop />} />
    //         <Route path="login" element={<Login />} />
    //         <Route path="register" element={<Register />} />
    //         <Route path="productview/:productId" element={<ProductView />} />
    //         <Route path="shop/productview/:productId" element={<ProductView />} />

    //         <Route path="booking/:productId" element={<PrivateRoute >
    //           <Booking />
    //         </PrivateRoute>}></Route>

    //         <Route path="dashbord/myorder" element={<PrivateRoute >
    //           <MyOrder />
    //         </PrivateRoute>}></Route>
    //         <Route path="addreview" element={<PrivateRoute >
    //           <ReviewAdd />
    //         </PrivateRoute>}></Route>

    //         <Route path="dashbord" element={<PrivateRoute >
    //           <Dashbaord />
    //         </PrivateRoute>}></Route>

    //           <Route path={`dashbord/manageproduct`} element={<AdminRoute >
    //             <ManageProducts />
    //           </AdminRoute>}></Route>
    //           <Route path={`dashbord/managereview`} element={<AdminRoute >
    //             <ManageReview />
    //           </AdminRoute>}></Route>
    //           <Route path={`dashbord/manageorder`} element={<AdminRoute >
    //             <MangeOrder />
    //           </AdminRoute>}></Route>
    //           <Route path={`dashbord/manageproduct`} element={<AdminRoute >
    //             <ManageProducts />
    //           </AdminRoute>}></Route>
    //           <Route path={`dashbord/addproduct`} element={<AdminRoute >
    //             <AddProducts />
    //           </AdminRoute>}></Route>

    //         <Route path="makeadmin" element={<MakeAdmin />} />
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </Router>
    //   </AuthProvider>

    //   </div>
  );
}

export default App;
