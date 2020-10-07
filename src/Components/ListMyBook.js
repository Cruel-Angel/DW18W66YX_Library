import React from "react";
import { useHistory } from "react-router-dom";
import MyBook from "../Data/DataMyBook.json";
const ListMyBook = () => {
  const history = useHistory();
  return (
    <div className="container">
      <div className="row">
        {MyBook.map((MyBook) => (
          <div
            className="col-md-3"
            onClick={() =>
              MyBook.Status === "Approve"
                ? history.push(`/DetailMyBook/${MyBook.id}`)
                : null
            }
            style={{
              cursor: MyBook.Status === "Approve" ? "pointer" : "default",
              backgroundColor:
                MyBook.Status === "Approve" ? "white" : "rgb(196,196,196,0.7)",
              maxWidth: 230,
              margin: "0px 5px 10px 5px",
              paddingTop: "15px",
              borderRadius: "10px",
            }}
          >
            <div className="container-fluid">
              <img
                src={require(`../Data/Thumbnail/` + MyBook.thumbnail)}
                className="responsive-img"
                width="200"
                height="270"
                style={{
                  marginLeft: "-15px",
                  opacity: MyBook.Status === "Approve" ? "1" : "0.5",
                  borderRadius: "10px",
                }}
              />
              {MyBook.Status === "Cancel" ? (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    top: "50%",
                    left: "20%",
                    font: "avenir",
                    fontSize: "18px",
                    fontWeight: "800",
                  }}
                >
                  Book Canceled
                </div>
              ) : MyBook.Status === "Wait" ? (
                <div
                  style={{
                    color: "#FFD600",
                    position: "absolute",
                    top: "50%",
                    left: "7.5%",
                    font: "avenir",
                    fontSize: "18px",
                    fontWeight: "800",
                  }}
                >
                  Waiting to be verified
                </div>
              ) : null}
            </div>
            <div
              style={{
                fontFamily: "times news roman",
                fontWeight: "bold",
                fontSize: "24px",
                opacity: MyBook.Status === "Approve" ? "1" : "0.5",
              }}
            >
              {MyBook.title}
            </div>
            <p
              style={{
                font: "avenir",
                fontSize: "18px",
                opacity: MyBook.Status === "Approve" ? "1" : "0.5",
              }}
            >
              {MyBook.Penulis}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListMyBook;
