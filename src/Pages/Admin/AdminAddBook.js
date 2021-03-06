import React from "react";
import Navbar from "./Navbar";
import NotifAdminAddBook from "./NotifAdminAddBook";
import { Button, Form, Row, Col } from "react-bootstrap";
import { BiBookAdd } from "react-icons/bi";
import Attach from "../../Asset/Attach.png";
const AdminAddBook = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="container">
      <div style={{ paddingTop: "34px", paddingBottom: "50px" }}>
        <Navbar />
      </div>
      <div style={{ marginBottom: "45px" }}>
        <div
          style={{
            fontFamily: "times news roman",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          <text>Add Book</text>
        </div>
      </div>
      <div style={{ marginRight: "106px" }}>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>

          <Form.Group>
            <Form.Control type="text" placeholder="Publication Date" />
          </Form.Group>

          <Form.Group>
            <Form.Control type="text" placeholder="Category" />
          </Form.Group>

          <Form.Group>
            <Form.Control type="number" placeholder="Pages" />
          </Form.Group>

          <Form.Group>
            <Form.Control type="text" placeholder="ISBN" />
          </Form.Group>

          <Form.Group>
            <Form.Control
              placeholder="About This Book"
              as="textarea"
              rows="8"
            />
          </Form.Group>
          <Form.Group style={{ paddingTop: "30px" }}>
            <Form.File
              id="file"
              label="Custom file input"
              custom
              style={{ display: "none" }}
            />
            <label
              for="file"
              style={{
                padding: "10px 0px 10px 20px",
                borderColor: "grey",
                borderStyle: "solid",
                borderRadius: "5px",
                borderWidth: "thin",
                borderColor: "#D2D2D2",
              }}
            >
              Attach Book File{" "}
              <img
                src={Attach}
                style={{ paddingLeft: "50px", paddingRight: "10px" }}
              />
            </label>
          </Form.Group>
        </Form>
        <Row style={{ marginBottom: "30px" }}>
          <Col xs={9}></Col>
          <Col xs={3}>
            <div style={{ marginLeft: "40px" }}>
              <Button
                variant="none"
                type="submit"
                style={{
                  backgroundColor: "#ee4622",
                  color: "white",
                }}
                onClick={() => setModalShow(true)}
              >
                <text style={{ paddingRight: "15px" }}>Add Book</text>
                <BiBookAdd size="2em" />
              </Button>
              <NotifAdminAddBook
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminAddBook;
