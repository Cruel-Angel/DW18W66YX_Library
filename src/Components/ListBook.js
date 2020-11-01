import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { API, urlAsset } from "../config/api";
import { CartContext } from "../Context/CartContext";
const ListBook = (props) => {
  const [state, dispatch] = useContext(CartContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        if (props.selected === "All" || props.route === "PROFILE") {
          const res = await API.get("/books");

          setBooks(res.data.data);
        } else {
          if (props.route === "HOME") {
            const res = await API.get(`/category/${props.selected}`);

            setBooks(res.data.data.category.books);
          } else if (props.route === "MYLIBRARY") {
            const res = await API.get(`/user/${state.user.id}`);

            setBooks(res.data.data.user.books);
          }
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.response);
      }
    };
    loadBooks();
  }, [props.selected]);

  const founded = books.find((item) => item.uploadBy === state.user.id);
  return (
    <div className="row">
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </>
      ) : props.route !== "PROFILE" ? (
        books.map((books) => {
          if (books.status === "Approved") {
            return (
              <div
                className="col-md-3"
                onClick={() => history.push(`/Detail/${books.id}`)}
                style={{
                  cursor: "pointer",
                  maxWidth: 230,
                  paddingTop: "15px",
                  borderRadius: "10px",
                  marginRight: "20px",
                }}
              >
                <div className="container-fluid">
                  <img
                    src={urlAsset.thumbnail + books.thumbnail}
                    className="responsive-img"
                    width="200"
                    height="270"
                    style={{
                      marginLeft: "-15px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "times news roman",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                >
                  {books.title}
                </div>
                <p
                  style={{
                    font: "avenir",
                    fontSize: "18px",
                  }}
                >
                  {books.author}
                </p>
              </div>
            );
          }
        })
      ) : founded !== undefined ? (
        books.map((books) => {
          if (books.uploadBy === state.user.id) {
            return (
              <div
                className="col-md-3"
                onClick={() =>
                  books.status === "Approved"
                    ? history.push(`/Detail/${books.id}`)
                    : null
                }
                style={{
                  cursor: books.status === "Approved" ? "pointer" : "default",
                  backgroundColor:
                    books.status === "Approved"
                      ? "white"
                      : "rgb(196,196,196,0.7)",
                  maxWidth: 230,
                  marginRight: "10px",
                  paddingTop: "15px",
                  marginTop: "15px",
                  borderRadius: "10px",
                }}
              >
                <div className="container-fluid">
                  <img
                    src={urlAsset.thumbnail + books.thumbnail}
                    className="responsive-img"
                    width="200"
                    height="270"
                    style={{
                      marginLeft: "-15px",
                      opacity: books.status === "Approved" ? "1" : "0.5",
                      borderRadius: "10px",
                    }}
                  />
                  {books.status === "Cancel" ? (
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
                  ) : books.status === "Waiting to be verified" ? (
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
                    opacity: books.status === "Approved" ? "1" : "0.5",
                  }}
                >
                  {books.title}
                </div>
                <p
                  style={{
                    font: "avenir",
                    fontSize: "18px",
                    opacity: books.status === "Approved" ? "1" : "0.5",
                  }}
                >
                  {books.author}
                </p>
              </div>
            );
          }
        })
      ) : (
        <h1>YOU DON'T HAVE ANY BOOKS</h1>
      )}
    </div>
  );
};

export default ListBook;
