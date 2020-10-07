import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";

import { CartContext } from "../../Context/CartContext";

import Avatar from "../../Asset/Avatar.jpg";
import Icon from "../../Asset/Icon.png";
import { BiBookAdd } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
const Navbar = () => {
  const [cek, dispatch] = useContext(CartContext);

  const history = useHistory();
  if (!cek.isLoginAdmin) {
    history.push(`/`);
  }

  const islogout = () => {
    return dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div
        className="col-md-3 d-flex justify-content-end"
        style={{ marginLeft: "-100px", marginRight: "200px" }}
      >
        <img src={Icon} width="175" height="50" />
      </div>
      <div className="col-md-9 d-flex justify-content-end">
        <Dropdown>
          <Dropdown.Toggle
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              outline: "none",
              boxShadow: "none",
            }}
          >
            <img
              src={Avatar}
              style={{
                height: 50,
                width: 50,
                border: "5px solid #C4C4C4",
                boxSizing: "border-box",
                borderRadius: 25,
              }}
              alt="Avatar"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight>
            <Dropdown.Item
              as={Link}
              to="/HomeAdmin"
              style={{
                marginBottom: ".5rem",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                backgroundColor:
                  window.location.pathname === "/HomeAdmin" ? "#0275d8" : "",
                color: window.location.pathname === "/HomeAdmin" ? "white" : "",
                cursor:
                  window.location.pathname === "/HomeAdmin"
                    ? "default"
                    : "pointer",
              }}
            >
              <AiFillHome size={22} style={{ marginRight: 10 }} /> Admin Home
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/AdminAddBook"
              style={{
                marginBottom: ".5rem",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                backgroundColor:
                  window.location.pathname === "/AdminAddBook" ? "#0275d8" : "",
                color:
                  window.location.pathname === "/AdminAddBook" ? "white" : "",
                cursor:
                  window.location.pathname === "/AdminAddBook"
                    ? "default"
                    : "pointer",
              }}
            >
              <BiBookAdd size={22} style={{ marginRight: 10 }} /> Add Book
            </Dropdown.Item>
            <hr style={{ margin: 0 }} />
            <Dropdown.Item
              as={Button}
              style={{
                marginTop: ".5rem",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => islogout()}
            >
              <FiLogOut
                size={22}
                style={{ marginRight: 10, color: "#ff0742" }}
              />{" "}
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
