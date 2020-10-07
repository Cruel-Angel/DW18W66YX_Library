import React, { useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import dataUser from "../../Data/User.json";
import dataAdmin from "../../Data/Admin.json";
import Signup from "./Signup";
const Signin = (props) => {
  const history = useHistory();

  const [state, dispatch] = useContext(CartContext);

  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = FormData;

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dataUser.map((user) => {
      if (email === user.email && password === user.password) {
        console.log("LOGGIN Sebagai User");
        history.push(`/Home`);
        dispatch({
          type: "LOGIN_USER",
        });
      }
    });
    dataAdmin.map((admin) => {
      if (email === admin.email && password === admin.password) {
        history.push(`/HomeAdmin`);
        console.log("LOGGIN Sebagai Admin");
        dispatch({
          type: "LOGIN_ADMIN",
        });
      }
    });
  };

  const [modalShowsignup, setModalShowsignup] = React.useState(false);

  return (
    <Modal
      {...props}
      size="lg-6"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <strong>Sign In</strong>
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            variant="none"
            type="submit"
            style={{
              marginBottom: "20px",
              width: "100%",
              backgroundColor: "#ee4622",
              color: "white",
            }}
          >
            Sign In
          </Button>
          <div style={{ width: "100%", textAlign: "center" }}>
            <p>
              Jika belum memiliki akun silakan klik link{" "}
              <a href="#" onClick={() => setModalShowsignup(true)}>
                ini
              </a>
              <Signup
                show={modalShowsignup}
                onHide={() => setModalShowsignup(false)}
              />
            </p>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default Signin;
