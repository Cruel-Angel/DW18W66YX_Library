import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { CartContext } from "../../Context/CartContext";

import Attach from "../../Asset/Attach.png";
import AlertModal from "../../Components/AlertModal";
import Navbar from "./Navbar";
const AdminAddBook = () => {
  const [state] = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [when, setWhen] = useState("");
  const [CategoryId, setCategoryId] = useState(1);
  const [newBook, setNewBook] = useState([]);
  const [getISBN, setGetISBN] = useState("");
  useEffect(() => {
    const loadcategory = async () => {
      try {
        setLoading(true);
        const res = await API.get("/categories");

        setCategories(res.data.data.categorys);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadcategory();
  }, []);
  let getYear = 0;
  let Month = 0;
  if (when) {
    getYear = parseInt(when.substr(0, 4));
    Month = parseInt(when.substr(5, 2));
  }
  let getMonth = "";
  [
    "January ",
    "February ",
    "March ",
    "April ",
    "May ",
    "June ",
    "July ",
    "August ",
    "September ",
    "October ",
    "November ",
    "December ",
  ].map((month, index) => {
    if (index + 1 === Month) {
      getMonth = month;
    }
  });
  let getPublication = getMonth.concat(getYear);

  const SUPPORTED_FORMATS_IMAGE = ["image/jpg", "image/jpeg", "image/png"];
  const SUPPORTED_FORMATS_FILE = ["application/epub+zip"];

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    values,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      uploadBy: state.user.id,
      title: "",
      author: "",
      pages: "",
      ISBN: "",
      aboutBook: "",
      file: "",
      thumbnail: "",
      status: state.user.isAdmin ? "Approved" : "Waiting to be verified",
    },
    validationSchema: Yup.object({
      title: Yup.string().required().min(3),
      pages: Yup.number().required(),
      ISBN: Yup.string()
        .matches(/^[0-9]+$/, "ISBN only accepts input numbers from 0-9")
        .required()
        .min(12),
      author: Yup.string().required(),
      aboutBook: Yup.string().required(),
      thumbnail: Yup.mixed()
        .required()
        .test(
          "fileFormat",
          "Sorry only accept image filetype",
          (value) => value && SUPPORTED_FORMATS_IMAGE.includes(value.type)
        ),
      file: Yup.mixed()
        .required()
        .test(
          "fileFormat",
          "Sorry only accept epub/pdf filetype",
          (value) => value && SUPPORTED_FORMATS_FILE.includes(value.type)
        ),
    }),
    onSubmit: (values) => {
      storeBook(values);
      resetForm({ values: "" });
      setErrorMsg("");
    },
  });

  const [storeBook, { isLoading, error }] = useMutation(async (values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("uploadBy", values.uploadBy);
      formData.append("title", values.title);
      formData.append("publication", getPublication);
      formData.append("pages", values.pages);
      formData.append("ISBN", values.ISBN);
      formData.append("author", values.author);
      formData.append("file", values.file);
      formData.append("thumbnail", values.thumbnail);
      formData.append("status", values.status);
      formData.append("aboutBook", values.aboutBook);

      const res = await API.post("/book", formData, config);

      try {
        const res = await API.get(`/bookBy/${getISBN}`);

        await setNewBook(res.data.data.detailBooks);
      } catch (err) {
        console.log(err.response.data.message);
        setErrorMsg(err.response.data.message);
      }
      setShowAlert(true);
    } catch (err) {
      console.log(err.response.data.message);
      setErrorMsg(err.response.data.message);
    }
  });
  useEffect(() => {
    const addRelation = async () => {
      try {
        console.log("ini buku yang barusaja dibuat ==> ");
        console.log(newBook);
        console.log("ini id buku yang barusaja dibuat ==> ");
        const BookId = newBook.id;
        console.log(BookId);
        console.log("ini CategoryId = " + CategoryId);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify({ BookId, CategoryId });
        const res = API.post(`relation`, body, config);
      } catch (err) {
        console.log(err.response.data.message);
        setErrorMsg(err.response.data.message);
      }
    };
    addRelation();
  }, [newBook]);
  return (
    <div className="container">
      <div style={{ paddingTop: "34px", paddingBottom: "50px" }}>
        <Navbar />
      </div>
      <div style={{ marginBottom: "45px" }}>
        <div
          style={{
            fontFamily: "times news roman",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          <p>Add Book</p>
        </div>
      </div>
      <div style={{ marginLeft: "-20px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              {...getFieldProps("title")}
              style={{ width: "100%", marginTop: "31px" }}
            />
            <Form.Text className="text-muted">
              {touched.title && errors.title ? (
                <p style={{ color: "red" }}>{errors.title}</p>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group onChange={(e) => setWhen(e.target.value)}>
            <Form.Control
              type="date"
              placeholder="Publication Date"
              style={{ width: "100%", marginTop: "31px" }}
            />
            <Form.Text className="text-muted">
              {touched.publication && errors.publication ? (
                <p style={{ color: "red" }}>{errors.publication}</p>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group onChange={(e) => setCategoryId(e.target.value)}>
            <Form.Control
              as="select"
              style={{ width: "100%", marginTop: "31px" }}
            >
              {loading || !categories ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </>
              ) : (
                categories.map((item, index) => {
                  return <option value={item.id}>{item.name}</option>;
                })
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="number"
              placeholder="Pages"
              name="pages"
              {...getFieldProps("pages")}
              style={{ width: "100%", marginTop: "31px" }}
            />
            <Form.Text className="text-muted">
              {touched.pages && errors.pages ? (
                <p style={{ color: "red" }}>{errors.pages}</p>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group onChange={(e) => setGetISBN(e.target.value)}>
            <Form.Control
              type="text"
              placeholder="ISBN"
              name="ISBN"
              {...getFieldProps("ISBN")}
              style={{ width: "100%", marginTop: "31px" }}
            />
            <Form.Text className="text-muted">
              {touched.ISBN && errors.ISBN ? (
                <p style={{ color: "red" }}>{errors.ISBN}</p>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Author"
              name="author"
              {...getFieldProps("author")}
              style={{ width: "100%", marginTop: "31px" }}
            />
            <Form.Text className="text-muted">
              {touched.author && errors.author ? (
                <p style={{ color: "red" }}>{errors.author}</p>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="About this book"
              name="aboutBook"
              {...getFieldProps("aboutBook")}
              style={{ width: "100%", marginTop: "31px" }}
            />{" "}
            <Form.Text className="text-muted">
              {touched.aboutBook && errors.aboutBook ? (
                <p style={{ color: "red" }}>{errors.aboutBook}</p>
              ) : null}
            </Form.Text>
          </Form.Group>
          <div className="form-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                onChange={(e) => {
                  setFieldValue("thumbnail", e.target.files[0]);
                }}
                id="thumbnail"
              />
              <label
                for="thumbnail"
                style={{
                  padding: "10px 0px 10px 20px",
                  borderColor: "grey",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  borderWidth: "thin",
                  borderColor: "#D2D2D2",
                  cursor: "pointer",
                }}
              >
                {values.thumbnail.name
                  ? values.thumbnail.name
                  : "Attache Book Thumbnail"}
                <img
                  src={Attach}
                  style={{ paddingLeft: "50px", paddingRight: "10px" }}
                />
              </label>
              <span className="help-block text-danger">
                {touched.thumbnail ? errors.thumbnail : ""}
              </span>
            </div>
          </div>
          <div className="form-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                onChange={(e) => {
                  setFieldValue("file", e.target.files[0]);
                }}
                id="file"
              />
              <label
                for="file"
                style={{
                  padding: "10px 0px 10px 20px",
                  borderColor: "grey",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  borderWidth: "thin",
                  borderColor: "#D2D2D2",
                  cursor: "pointer",
                }}
              >
                {values.file.name ? values.file.name : " Attach Book file"}
                <img
                  src={Attach}
                  style={{ paddingLeft: "50px", paddingRight: "10px" }}
                />
              </label>
              <span className="help-block text-danger">
                {touched.file ? errors.file : ""}
              </span>
            </div>
          </div>
          <div className="float-right">
            {errorMsg ? (
              <Alert variant="danger">{errorMsg || error}</Alert>
            ) : null}
            <Button
              variant="none"
              type="submit"
              style={{
                backgroundColor: "#ee4622",
                color: "white",
                font: "avenir",
              }}
            >
              Add Book
            </Button>
          </div>
        </Form>
        {state.user.isAdmin ? (
          <AlertModal show={showAlert} onHide={() => setShowAlert(false)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>Your book has been successfully carried out</p>
            </div>
          </AlertModal>
        ) : (
          <AlertModal show={showAlert} onHide={() => setShowAlert(false)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>Your book has been successfully carried out</p>
              <p>please wait 1 x 24 hours to verify this book</p>
            </div>
          </AlertModal>
        )}
      </div>
    </div>
  );
};

export default AdminAddBook;
