import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import Icon from "../Asset/Icon.png";
import { AiFillHome } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { BiBookAdd } from "react-icons/bi";
import { GiBookshelf } from "react-icons/gi";

const NavBarRead = (props) => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            outline: "none",
            boxShadow: "none",
          }}
        >
          <img src={Icon} alt="Icon" />
        </Dropdown.Toggle>
        <Dropdown.Menu alignRight>
          <Dropdown.Item as={Link} to="/Home">
            <AiFillHome size={22} style={{ marginRight: 10 }} /> Home
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/Profile">
            <FaRegUserCircle size={22} style={{ marginRight: 10 }} /> Profile
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/MyLibrary">
            <GiBookshelf size={22} style={{ marginRight: 10 }} />
            My Library
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/AddBook">
            <BiBookAdd size={22} style={{ marginRight: 10 }} /> Add Book
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default NavBarRead;
