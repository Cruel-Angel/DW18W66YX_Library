import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, urlAsset } from "../../config/api";
import { CartContext } from "../../Context/CartContext";
import { BsBookmark } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "react-bootstrap";
import AlertModal from "../../Components/AlertModal";
import { useMutation } from "react-query";
import ReactHtmlParser from "react-html-parser";
const style = {
  ket: {
    font: "avenir",
    fontSize: "24px",
    fontWeight: "700",
  },
  ket2: {
    font: "avenir",
    fontSize: "24px",
    fontWeight: "700",
    color: "#EE4622",
  },
  rincian: {
    font: "avenir",
    fontSize: "18px",
    color: "#929292",
    marginTop: "18px",
  },
  sinopsis: {
    font: "avenir",
    fontSize: "14px",
    color: "#929292",
  },
};

const Detail = () => {
  const { id } = useParams();
  const [state] = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState([]);
  const [categories, setCategories] = useState([]);
  const [relations, setRelations] = useState([]);
  const [click, setClick] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState("");
  const [FormData, setFormData] = useState({
    UserId: state.user.id,
    BookId: id,
  });
  const { UserId, BookId } = FormData;

  const history = useHistory();
  const [add] = useMutation(async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ BookId, UserId });
      await API.post("/relations", body, config);
      setLoading(false);
      setClick(true);
      setShow("add");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  });

  const [remove] = useMutation(async () => {
    try {
      setLoading(true);
      await API.delete(`/relations/${id}/${state.user.id}`);
      setLoading(false);
      setClick(true);
      setShow("remove");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  });

  useEffect(() => {
    const loadRelation = async () => {
      try {
        setLoading(true);
        const res = await API.get("/relations");
        setRelations(res.data.data.loadRelation);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadRelation();
    setClick(false);
  }, [click]);

  const isBookmark = relations.filter(
    (item) => item.UserId === state.user.id && item.BookId === id
  );

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/book/${id}`);
        await setBook(res.data.data.detailBooks);
        await setCategories(res.data.data.detailBooks.category);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getBook();
  }, []);
  console.log(book);
  return (
    <div className="container">
      {loading ? (
        <h1>NOW LOADING...</h1>
      ) : (
        <div style={{ padding: "37px 106px 72px 43px" }}>
          <div>
            <div
              className="row"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div className="col">
                <img
                  src={urlAsset.thumbnail + book.thumbnail}
                  width="400"
                  style={{
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="col">
                <div>
                  <div
                    style={{
                      fontFamily: "times news roman",
                      fontWeight: "bold",
                      fontSize: "64px",
                    }}
                  >
                    {book.title}
                  </div>
                  <p
                    style={{
                      marginTop: "-10px",
                      font: "avenir",
                      fontSize: "24px",
                      color: "#929292",
                    }}
                  >
                    {book.author}
                  </p>
                  <div style={{ paddingTop: "10px", marginBottom: "-5px" }}>
                    <p style={style.ket}>Publication Date</p>
                    <p style={style.rincian}>{book.publication}</p>
                  </div>
                  <div style={{ paddingTop: "5px", marginBottom: "-5px" }}>
                    <p style={style.ket}>Category</p>
                    {loading ? (
                      <p style={style.rincian}>loading</p>
                    ) : categories.length > 0 ? (
                      categories.map((categories) => {
                        return <p style={style.rincian}>{categories.name}, </p>;
                      })
                    ) : (
                      <p style={style.rincian}>this book has no categories</p>
                    )}
                  </div>
                  <div style={{ paddingTop: "5px", marginBottom: "-5px" }}>
                    <p style={style.ket}>Pages</p>
                    <p style={style.rincian}>{book.pages}</p>
                  </div>
                  <div style={{ paddingTop: "5px" }}>
                    <p style={style.ket2}>ISBN</p>
                    <p style={style.rincian}>{book.ISBN}</p>
                  </div>
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
              <div style={{ marginTop: "36px" }}>
                <p
                  className="text-justify"
                  style={{
                    font: "avenir",
                    fontSize: "18px",
                    color: "#929292",
                  }}
                >
                  {ReactHtmlParser(book.aboutBook)}
                </p>
              </div>
            </div>
            <div className="float-right">
              {isBookmark.length === 0 ? (
                <Button
                  variant="none"
                  style={{
                    background: "#EE4622",
                    color: "white",
                    font: "avenir",
                  }}
                  onClick={() => {
                    add();
                    setShowAlert(true);
                    setShow("");
                  }}
                >
                  Add to My Collection
                  <BsBookmark size={30} />
                </Button>
              ) : (
                <Button
                  variant="none"
                  style={{
                    background: "#EE4622",
                    color: "white",
                    font: "avenir",
                  }}
                  onClick={() => {
                    remove();
                    setShowAlert(true);
                    setShow("");
                  }}
                >
                  Remove from My Collection
                  <BsBookmark size={30} />
                </Button>
              )}
              <Button
                variant="none"
                style={{
                  background: "#E9E9E9",
                  color: "black",
                  marginLeft: "20px",
                }}
                onClick={() => history.push(`/ReadBook/${book.id}`)}
              >
                Read Book <IoIosArrowForward />
              </Button>
            </div>
          </div>
          <AlertModal show={showAlert} onHide={() => setShowAlert(false)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {show === "remove" ? (
                <p>
                  Your book has been successfully removed from your collection
                </p>
              ) : (
                <p>
                  Your literature has been successfully added to your collection
                </p>
              )}
            </div>
          </AlertModal>
        </div>
      )}
    </div>
  );
};

export default Detail;
