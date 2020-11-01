import React, { useEffect, useState } from "react";
import NavBarRead from "./NavBarRead";
import { useParams } from "react-router-dom";
import { API, urlAsset } from "../../config/api";
import { ReactReader } from "react-reader";

const ReadBook = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/book/${id}`);
        setBook(res.data.data.detailBooks);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getDetail();
  }, []);
  console.log(book);
  return (
    <>
      <NavBarRead />
      {loading ? (
        <h1>NOW LOADING...</h1>
      ) : (
        <div style={{ position: "relative", height: "100vh" }}>
          <ReactReader
            url={urlAsset.file + book.file}
            title={book.title}
            location={"epubcfi(/6/2[cover]!/6)"}
            locationChanged={(epubcifi) => console.log(epubcifi)}
          />
        </div>
      )}
    </>
  );
};

export default ReadBook;
