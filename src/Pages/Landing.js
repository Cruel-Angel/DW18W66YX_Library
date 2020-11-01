import React from "react";
import { Button } from "react-bootstrap";
import Logo from "../Asset/Icon.png";
import Signin from "./User/Signin";
import Signup from "./User/Signup";
import "../App.css";
const Landing = () => {
  const [modalShowsignin, setModalShowsignin] = React.useState(false);
  const [modalShowsignup, setModalShowsignup] = React.useState(false);
  return (
    <div className="Landing_Body">
      <div style={{ padding: "0px 0px 235px 78px" }}>
        <img
          className="responsive-img"
          src={Logo}
          alt="Logo"
          style={{ paddingTop: "45px" }}
        />
        <div className="body" style={{ paddingRight: "500px" }}>
          <div
            style={{
              fontFamily: "Time New Rowman",
              fontSize: "90px",
              fontWeight: "700",
              paddingTop: "100px",
              paddingBottom: "35px",
              lineHeight: "94.86px",
            }}
          >
            <div>
              <em>Your</em> library{" "}
            </div>
            <div>anywhere</div>
          </div>
          <p style={{ fontSize: "24px" }}>
            Sign-up today and receive unlimited<br></br>access to all of your
            reading - share<br></br> your book.
          </p>
          <section
            className="button"
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "25px",
            }}
          >
            <Button
              variant="none"
              style={{
                marginBottom: "20px",
                width: "25%",
                backgroundColor: "#ee4622",
                color: "white",
              }}
              onClick={() => setModalShowsignup(true)}
            >
              Sign Up
            </Button>

            <Signup
              show={modalShowsignup}
              onHide={() => setModalShowsignup(false)}
            />

            <Button
              variant="none"
              style={{
                marginBottom: "20px",
                width: "25%",
                backgroundColor: "white",
                color: "black",
              }}
              variant="none"
              onClick={() => setModalShowsignin(true)}
            >
              Sign in
            </Button>
            <Signin
              show={modalShowsignin}
              onHide={() => setModalShowsignin(false)}
            />
          </section>
        </div>
      </div>
    </div>
  );
};
export default Landing;
