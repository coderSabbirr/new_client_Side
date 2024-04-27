import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./Components/Context/AuthProvider";
import Dashbaord from "./Components/Dashboard/Dashboard/Dashboard";
import SilderPro2 from "./Components/Dashboard/Dashboard/SilderPro2";
import Login from "./Components/Pages/Login/Login";
import NotFound from "./Components/Pages/NotFound/NotFound";
import Register from "./Components/Pages/Register/Register";
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

            <Route exact path="/silder">
              <SilderPro2 />
            </Route>

            <PrivateRoute path="/dashboard">
              <Dashbaord></Dashbaord>
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
  );
}

export default App;
