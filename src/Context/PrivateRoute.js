import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { CartContext } from "./CartContext";

export const UserRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(CartContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLoginUser ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
export const AdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(CartContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLoginAdmin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
