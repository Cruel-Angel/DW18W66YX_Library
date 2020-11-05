import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { CartContext } from "../../Context/CartContext";
import { useQuery } from "react-query";

import ProfileBG from "../../Asset/Profile_BG.png";
import Email from "../../Asset/Email_Icon.png";
import Gender from "../../Asset/Gender_Icon.png";
import Phone from "../../Asset/Phone_Icon.png";
import Address from "../../Asset/Address_Icon.png";

import { API, urlAsset } from "../../config/api";

import ListBook from "../../Components/ListBook";

import Profile_addPP from "../../Components/Profile_addPP";

import "../../App.css";

const Profile = () => {
  const [state] = useContext(CartContext);
  const [modalShow, setModalShow] = React.useState(false);

  const { isLoading, error, data: User, refetch } = useQuery(
    "loadProfile",
    () => API.get(`/user/${state.user.id}`)
  );

  return (
    <>
      {state.user === undefined || isLoading || error ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </>
      ) : (
        <div>
          <Container>
            <div
              className="row"
              style={{
                fontFamily: "times news roman",
                fontSize: "36px",
                fontWeight: "bold",
                lineHeight: "101.5%",
                marginLeft: "-30px",
                marginBottom: "39px",
              }}
            >
              Profile
            </div>
            <div className="row">
              <Row
                style={{
                  backgroundImage: `url(${ProfileBG})`,
                  backgroundRepeat: "no-repeat",
                  width: "995px",
                  height: "334px",
                }}
              >
                <Row>
                  <div className="col-5">
                    <div
                      style={{
                        paddingTop: "37px",
                        paddingLeft: "31px",
                      }}
                    >
                      <Col>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Col xs={1}>
                            <img
                              src={Email}
                              alt="email"
                              style={{ marginTop: "10px" }}
                            />
                          </Col>
                          <Col xs={11} style={{ marginLeft: "15px" }}>
                            <div className="DataUser">{state.user.email}</div>
                            <div className="DetailDataUser">Email</div>
                          </Col>
                        </div>
                      </Col>
                      <Col style={{ marginTop: "28px" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Col xs={1}>
                            <img
                              src={Gender}
                              alt="gender"
                              style={{ marginTop: "10px" }}
                            />
                          </Col>
                          <Col xs={11} style={{ marginLeft: "15px" }}>
                            <div className="DataUser">{state.user.gender}</div>
                            <div className="DetailDataUser">Gender</div>
                          </Col>
                        </div>
                      </Col>
                      <Col style={{ marginTop: "28px" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Col xs={1}>
                            <img
                              src={Phone}
                              alt="phone"
                              style={{ marginTop: "10px" }}
                            />
                          </Col>
                          <Col xs={11} style={{ marginLeft: "15px" }}>
                            <div className="DataUser">{state.user.phone}</div>
                            <div className="DetailDataUser">Mobile Phone</div>
                          </Col>
                        </div>
                      </Col>
                      <Col style={{ marginTop: "28px" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Col xs={1}>
                            <img
                              src={Address}
                              alt="address"
                              style={{ marginTop: "10px" }}
                            />
                          </Col>
                          <Col xs={11} style={{ marginLeft: "15px" }}>
                            <div className="DataUser">{state.user.address}</div>
                            <div className="DetailDataUser">Address</div>
                          </Col>
                        </div>
                      </Col>
                    </div>
                  </div>
                  <div className="col-7">
                    <div
                      style={{
                        marginTop: "41px",
                        marginRight: "41.33px",
                        marginLeft: "300px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignContent: "center",
                        }}
                      >
                        <div>
                          <img
                            alt="avatar"
                            className="figure-img img-fluid rounded"
                            src={urlAsset.avatar + User.data.data.user?.avatar}
                            style={{
                              width: 226,
                              height: 202,
                              borderRadius: "3px",
                            }}
                          />
                        </div>
                        <div style={{ paddingTop: "14px" }}>
                          <Button
                            variant="none"
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
                            onClick={() => setModalShow(true)}
                          >
                            Change Photo Profile
                          </Button>
                          <Profile_addPP
                            refetch={() => refetch()}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                        </div>
                      </div>
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
            </div>
            <div style={{ marginTop: "150px", marginLeft: "-15px" }}>
              <ListBook route="PROFILE" />
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Profile;
