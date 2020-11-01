import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { CartContextProvider, CartContext } from "./Context/CartContext";
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

import AdminAddBook from "./Pages/Admin/AdminAddBook";

import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(CartContext);
  const history = useHistory();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");

        if (res.data.data.user.isAdmin) {
          dispatch({
            type: "LOGIN_ADMIN",
            payload: res.data.data.user,
          });
        } else {
          dispatch({
            type: "USER_LOADED",
            payload: res.data.data.user,
          });
        }
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };

    loadUser();
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <AdminRoute exact path="/HomeAdmin" component={HomeAdmin} />
        <AdminRoute exact path="/AdminAddBook" component={AdminAddBook} />
        <UserRoute exact path="/ReadBook/:id" component={ReadBook} />
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
            </div>
          </div>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
