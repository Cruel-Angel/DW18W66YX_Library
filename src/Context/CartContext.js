import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  isLoginUser: false || localStorage.getItem("isLogin_User"),
  isLoginAdmin: false || localStorage.getItem("isLogin_Admin"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      localStorage.setItem("isLogin_User", true);
      return {
        ...state,
        isLoginUser: true,
        isLoginAdmin: false,
      };
    case "LOGIN_ADMIN":
      localStorage.setItem("isLogin_Admin", true);
      return {
        ...state,
        isLoginAdmin: true,
        isLoginUser: false,
      };
    case "LOGOUT":
      localStorage.removeItem("isLogin_User");
      localStorage.removeItem("isLogin_Admin");
      return {
        ...state,
        isLoginUser: false,
        isLoginAdmin: false,
      };
    default:
      throw new Error();
  }
};

export const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartContext.Provider>
  );
};
