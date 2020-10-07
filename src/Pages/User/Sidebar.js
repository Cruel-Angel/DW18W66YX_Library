import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Icon from "../../Asset/Icon.png";
import Avatar from "../../Asset/Avatar.jpg";

import { FaRegUserCircle } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { BiBookAdd } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

import "../../App.css";

const Sidebar = () => {
  const [cek, dispatch] = useContext(CartContext);

  const history = useHistory();
  if (!cek.isLoginUser) {
    history.push(`/`);
  }

  const islogout = () => {
    return dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ul style={{ listStyle: "none" }}>
        <a>
          <img
            src={Icon}
            width="175"
            height="50"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/Home`)}
          />
        </a>
        <section
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
          }}
        >
          <img
            className="avatar-img"
            src={Avatar}
            alt="avatar"
            style={{
              verticalAlign: "middle",
              width: "75%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: " 46px",
              paddingBottom: "32px",
            }}
          />
          <br />
          <div
            style={{
              textAlign: "center",
              fontSize: "24px",
              font: "avenis",
              marginBottom: "67px",
            }}
          >
            <strong>Rizky Iqbal</strong>
          </div>
        </section>
        <hr />
        <li
          style={{
            backgroundColor:
              window.location.pathname === "/Profile" ? "#EE4622" : "",
            color: window.location.pathname === "/Profile" ? "white" : "",
            borderRadius: window.location.pathname === "/Profile" ? "50px" : "",
          }}
          onClick={() => history.push(`/Profile`)}
        >
          <span>
            <FaRegUserCircle />
            <text style={{ marginLeft: "23px" }}>Profile</text>
          </span>
        </li>
        <li
          style={{
            backgroundColor:
              window.location.pathname === "/MyLibrary" ? "#EE4622" : "",
            color: window.location.pathname === "/MyLibrary" ? "white" : "",
            borderRadius:
              window.location.pathname === "/MyLibrary" ? "50px" : "",
          }}
          onClick={() => history.push(`/MyLibrary`)}
        >
          <span>
            <GiBookshelf />
            <text style={{ marginLeft: "23px" }}>My Library</text>
          </span>
        </li>
        <li
          style={{
            backgroundColor:
              window.location.pathname === "/AddBook" ? "#EE4622" : "",
            color: window.location.pathname === "/AddBook" ? "white" : "",
            borderRadius: window.location.pathname === "/AddBook" ? "50px" : "",
          }}
          onClick={() => history.push(`/AddBook`)}
        >
          <span>
            <BiBookAdd />
            <text style={{ marginLeft: "23px" }}>Add Book</text>
          </span>
        </li>
        <br />
        <hr />
        <br />
        <li className="logout" onClick={() => islogout()}>
          <span>
            <FiLogOut />
            <text style={{ marginLeft: "23px" }}>Log Out</text>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
