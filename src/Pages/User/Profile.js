import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import ProfileBG from "../../Asset/Profile_BG.png";

import Email from "../../Asset/Email_Icon.png";
import Gender from "../../Asset/Gender_Icon.png";
import Phone from "../../Asset/Phone_Icon.png";
import Address from "../../Asset/Address_Icon.png";
import Avatar from "../../Asset/Avatar.jpg";

import ListMyBook from "../../Components/ListMyBook";

import "../../App.css";

const Profile = () => {
  return (
    <div>
      <Container>
        <div
          style={{
            fontFamily: "times news roman",
            fontSize: "36px",
            fontWeight: "bold",
            lineHeight: "101.5%",
            marginLeft: "-15px",
            marginBottom: "39px",
          }}
        >
          Profile
        </div>
        <Row
          style={{
            backgroundImage: `url(${ProfileBG})`,
            backgroundRepeat: "no-repeat",
            width: "995px",
            height: "334px",
          }}
        >
          <Row>
            <div
              style={{
                paddingTop: "37px",
                paddingLeft: "31px",
              }}
            >
              <Col>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Col xs={1}>
                    <img src={Email} style={{ marginTop: "10px" }} />
                  </Col>
                  <Col xs={11} style={{ marginLeft: "15px" }}>
                    <div className="DataUser">rizkiiqbal36@gmail.com</div>
                    <div className="DetailDataUser">Email</div>
                  </Col>
                </div>
              </Col>
              <Col style={{ marginTop: "28px" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Col xs={1}>
                    <img src={Gender} style={{ marginTop: "10px" }} />
                  </Col>
                  <Col xs={11} style={{ marginLeft: "15px" }}>
                    <div className="DataUser">Male</div>
                    <div className="DetailDataUser">Gender</div>
                  </Col>
                </div>
              </Col>
              <Col style={{ marginTop: "28px" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Col xs={1}>
                    <img src={Phone} style={{ marginTop: "10px" }} />
                  </Col>
                  <Col xs={11} style={{ marginLeft: "15px" }}>
                    <div className="DataUser">0822-9026-0399</div>
                    <div className="DetailDataUser">Mobile Phone</div>
                  </Col>
                </div>
              </Col>
              <Col style={{ marginTop: "28px" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Col xs={1}>
                    <img src={Address} style={{ marginTop: "10px" }} />
                  </Col>
                  <Col xs={11} style={{ marginLeft: "15px" }}>
                    <div className="DataUser">Jln. Johor No.5a asrama</div>
                    <div className="DetailDataUser">Address</div>
                  </Col>
                </div>
              </Col>
            </div>
            <div
              style={{
                marginTop: "41px",
                marginRight: "41.33px",
                marginLeft: "364px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Col>
                <img src={Avatar} width="180" />
              </Col>
              <div style={{ paddingTop: "20px" }}>
                <Form>
                  <Form.Group>
                    <Form.File
                      id="file"
                      label="Custom file input"
                      custom
                      style={{ display: "none" }}
                    />
                    <label
                      for="file"
                      style={{
                        font: "avenir",
                        fontSize: "18px",
                        cursor: "pointer",
                        background: "#EE4622",
                        color: "white",
                        borderRadius: "3px",
                        fontWeight: "lighter",
                        width: "227px",
                        height: "50px",
                        textAlign: "center",
                        alignItems: "center",
                        paddingTop: "10px",
                      }}
                    >
                      Change Photo Profile
                    </label>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Row>
          <div
            style={{
              fontFamily: "times news roman",
              paddingTop: "80px",
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            <p>My Books</p>
          </div>
        </Row>
        <div style={{ marginTop: "150px", marginLeft: "-35px" }}>
          <ListMyBook />
        </div>
      </Container>
    </div>
  );
};

export default Profile;
