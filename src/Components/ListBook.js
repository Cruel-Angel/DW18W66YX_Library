import React from "react";
import { useHistory } from "react-router-dom";
import DataBuku from "../Data/DataBook.json";
const ListBook = () => {
  const history = useHistory();
  return (
    <div className="container">
      <div className="row">
        {DataBuku.map((DataBuku) => (
          <div
            className="col-md-3"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/Detail/${DataBuku.id}`)}
          >
            <img
              src={require(`../Data/Thumbnail/` + DataBuku.thumbnail)}
              className="responsive-img"
              width="180"
              style={{ borderRadius: "10px" }}
            />
            <p
              className="title tnr mb-2"
              style={{
                fontWeight: "700",
                fontSize: 24,
                lineHeight: "29px",
              }}
            >
              {DataBuku.title}
            </p>
            <p style={{ font: "avenir", fontSize: "18px", color: "#929292" }}>
              {DataBuku.Penulis}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBook;
