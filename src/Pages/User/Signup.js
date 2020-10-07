import React, { component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Signin from "./Signin";

function Signup(props) {
  const [modalShowsignin, setModalShowsignin] = React.useState(false);
  return (
    <Modal
      {...props}
      size="lg-6"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <strong>Sign Up</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <form>
            <Form>
              <Form.Group>
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>

              <Form.Group>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group>
                <Form.Control type="text" placeholder="Fullname" />
              </Form.Group>

              <Form.Group>
                <Form.Control as="select">
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Femlae</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Control type="number" placeholder="Phone" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
            </Form>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", flexDirection: "row" }}>
        <Button
          variant="none"
          style={{
            marginBottom: "20px",
            width: "100%",
            backgroundColor: "#ee4622",
            color: "white",
          }}
          onClick={props.onHide}
        >
          Sign Up
        </Button>
        <div style={{ width: "100%", textAlign: "center" }}>
          <p>
            Jika belum memiliki akun silakan klik link{" "}
            <a href="#" onClick={props.onHide}>
              <a href="#" onClick={() => setModalShowsignin(true)}>
                ini
              </a>
            </a>
            <Signin
              show={modalShowsignin}
              onHide={() => setModalShowsignin(false)}
            />
          </p>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
export default Signup;
