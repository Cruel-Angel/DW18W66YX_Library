import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CartContextProvider } from "./Context/CartContext";
import { UserRoute, AdminRoute } from "./Context/PrivateRoute";

//import Pages
import Landing from "./Pages/Landing";
import HomeAdmin from "./Pages/Admin/HomeAdmin";

import Detail from "./Pages/User/Detail";
import Home from "./Pages/User/Home";
import Sidebar from "./Pages/User/Sidebar";
import Profile from "./Pages/User/Profile";
import MyLibrary from "./Pages/User/MyLibrary";
import AddBook from "./Pages/User/AddBook";
import ReadBook from "./Pages/User/ReadBook";
import ReadMyBook from "./Pages/User/ReadMyBook";

import DetailMyBook from "./Pages/User/DetailMyBook";
import AdminAddBook from "./Pages/Admin/AdminAddBook";

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <AdminRoute exact path="/HomeAdmin" component={HomeAdmin} />
          <AdminRoute exact path="/AdminAddBook" component={AdminAddBook} />
          <UserRoute exact path="/ReadBook/:id" component={ReadBook} />
          <UserRoute exact path="/ReadMyBook/:id" component={ReadMyBook} />
          <div
            className="container-fluid"
            style={{ margin: "15px 106px 0px 78px" }}
          >
            <div className="row" style={{ paddingTop: "37px" }}>
              <div className="col-md-3 float-md-left">
                <UserRoute component={Sidebar} />
              </div>
              <div className="col-md-9 float-md-right">
                <UserRoute exact path="/Home" component={Home} />
                <UserRoute exact path="/Profile" component={Profile} />
                <UserRoute exact path="/MyLibrary" component={MyLibrary} />
                <UserRoute exact path="/AddBook" component={AddBook} />
                <UserRoute exact path="/Detail/:id" component={Detail} />
                <UserRoute
                  exact
                  path="/DetailMyBook/:id"
                  component={DetailMyBook}
                />
              </div>
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
