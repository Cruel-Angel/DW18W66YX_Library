import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import DataBook from "../../Data/DataMyBook.json";
import { BsBookmark } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "react-bootstrap";
import NotifAdminAddBook from "../Admin/NotifAdminAddBook";
const style = {
  ket: {
    font: "avenir",
    fontSize: "20px",
    fontWeight: "700",
  },
  ket2: {
    font: "avenir",
    fontSize: "20px",
    fontWeight: "700",
    color: "#EE4622",
  },
  rincian: {
    font: "avenir",
    fontSize: "18px",
    color: "#929292",
    marginTop: "-20px",
  },
  sinopsis: {
    font: "avenir",
    fontSize: "14px",
    color: "#929292",
  },
};
function Detail() {
  const [modalShow, setModalShow] = React.useState(false);
  const { id } = useParams();
  const deskripsi = DataBook.filter((item) => item.id === parseInt(id));
  const history = useHistory();
  return (
    <div className="container">
      <div style={{ marginRight: "70px" }}>
        <div className="row">
          <div className="col-md-4">
            <img
              style={{ borderRadius: "10px" }}
              width="260"
              src={require(`../../Data/Thumbnail/` + deskripsi[0].thumbnail)}
            />
          </div>
          <div className="col-md-8">
            <div
              style={{
                marginTop: "-10px",
                fontFamily: "times news roman",
                fontWeight: "bold",
                fontSize: "36px",
              }}
            >
              {deskripsi[0].title}
            </div>
            <p
              style={{
                marginTop: "-10px",
                font: "avenir",
                fontSize: "20px",
                color: "#929292",
              }}
            >
              {deskripsi[0].Penulis}
            </p>
            <div style={{ paddingTop: "10px", marginBottom: "-5px" }}>
              <p style={style.ket}>Publication Date</p>
              <p style={style.rincian}>{deskripsi[0].tgl_publikasi}</p>
            </div>
            <div style={{ paddingTop: "5px", marginBottom: "-5px" }}>
              <p style={style.ket}>Category</p>
              <p style={style.rincian}>{deskripsi[0].category}</p>
            </div>
            <div style={{ paddingTop: "5px", marginBottom: "-5px" }}>
              <p style={style.ket}>Pages</p>
              <p style={style.rincian}>{deskripsi[0].pages}</p>
            </div>
            <div style={{ paddingTop: "5px" }}>
              <p style={style.ket2}>ISBN</p>
              <p style={style.rincian}>{deskripsi[0].ISBN}</p>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row" style={{ marginLeft: "5px" }}>
          <div
            style={{
              fontFamily: "times news roman",
              fontSize: "26px",
              fontWeight: "bold",
            }}
          >
            About This Book
          </div>
          <p
            className="text-justify"
            style={{
              font: "avenir",
              fontSize: "18px",
              color: "#929292",
              paddingTop: "18px",
            }}
          >
            {deskripsi[0].sinopsis}
          </p>
        </div>
        <div className="row">
          <div className="col-md-12 bg-light text-right">
            <div style={{ marginRight: "-20px" }}>
              <Button
                variant="none"
                style={{ backgroundColor: "#EE4622", color: "white" }}
                onClick={() => setModalShow(true)}
              >
                Add Library
                <BsBookmark />
              </Button>
              <NotifAdminAddBook
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <Button
                variant="none"
                style={{
                  background: "#E9E9E9",
                  color: "black",
                  marginLeft: "20px",
                }}
                onClick={() => history.push(`/ReadMyBook/${deskripsi[0].id}`)}
              >
                Read Book <IoIosArrowForward />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
