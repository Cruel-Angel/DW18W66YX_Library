import React, { useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import ListBook from "../../Components/ListBook";
import Frame from "../../Asset/Frame.png";
import Fix_You from "../../Data/Thumbnail/Fix_You.png";
const Home = () => {
  return (
    <div>
      <div className="container-fluid">
        <div
          className="row"
          style={{
            backgroundImage: `url(${Frame})`,
            width: "100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="col-6 float-md-right"
            style={{ padding: "80px 0px 50px 78px" }}
          >
            <text
              style={{
                fontFamily: "times news roman",
                fontWeight: "bold",
                fontSize: "50px",
              }}
            >
              Share, read<br></br> and <em>love</em>
            </text>
            <p style={{ fontFamily: "avenir", fontSize: "15px" }}>
              Reading is fascinating
            </p>
          </div>
          <div
            className="col-6 float-md-left"
            style={{ padding: "28px 106px 29px 0px" }}
          >
            <img src={Fix_You} alt="fix you" />
          </div>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ marginTop: "51px", marginBottom: "45px" }}
        >
          <div
            style={{
              fontFamily: "times news roman",
              fontSize: "36px",
              fontWeight: "bold",
              lineHeight: "101.5%",
              marginLeft: "-19px",
            }}
          >
            List Book
          </div>
          <div style={{ marginRight: "15px" }}>
            <Dropdown drop="left">
              <Dropdown.Toggle
                variant="danger"
                id="dropdown-basic"
                style={{
                  backgroundColor: "rgb(233,233,233,0.7)",
                  color: "#000000",
                  outline: "none",
                  border: 0,
                }}
              >
                Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Romance</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Comedy</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Scif-fi</Dropdown.Item>
                <Dropdown.Item href="#/action-4">History</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Documentary</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div style={{ marginLeft: "-35px" }}>
          <ListBook />
        </div>
      </div>
    </div>
  );
};

export default Home;
