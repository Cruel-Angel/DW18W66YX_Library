import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ListBook from "../../Components/ListBook";
const MyLibrary = () => {
  return (
    <div>
      <Container fluid={true}>
        <Row>
          <div
            style={{
              fontFamily: "times news roman",
              fontSize: "36px",
              fontWeight: "bold",
              lineHeight: "101.5%",
              marginLeft: "10px",
            }}
          >
            My Library
          </div>
          <div style={{ marginTop: "45px" }}>
            <ListBook />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MyLibrary;
