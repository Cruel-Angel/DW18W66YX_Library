import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Carousel } from "react-bootstrap";
import ListBook from "../../Components/ListBook";
import Frame from "../../Asset/Frame.png";
import Fix_You from "../../Data/Thumbnail/Fix_You.png";
import { useHistory } from "react-router-dom";
import { API, urlAsset } from "../../config/api";
const Home = () => {
  const [category, setCategory] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("All");
  useEffect(() => {
    const loadcategory = async () => {
      try {
        setLoading(true);
        const res = await API.get("/categories");

        setCategory(res.data.data.categorys);
        try {
          setLoading(true);
          const res = await API.get("/books");

          setBooks(res.data.data);
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadcategory();
  }, []);
  console.log(books);
  const history = useHistory();
  return (
    <div>
      <div className="container-fluid">
        <div
          className="row"
          style={{
            backgroundImage: `url(${Frame})`,
            width: "100%",
            height: "443px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="col-6 float-md-right"
            style={{ padding: "99px 74px 100px 78px" }}
          >
            <p
              style={{
                fontFamily: "times news roman",
                fontWeight: "bold",
                fontSize: "60px",

                lineHeight: "97.44px",
              }}
            >
              Share, read and <em>love</em>
            </p>
            <p style={{ fontFamily: "avenir", fontSize: "15px" }}>
              Reading is fascinating
            </p>
          </div>
          <div
            className="col-6 float-md-left"
            style={{ padding: "28px 106px 29px 0px" }}
          >
            <Carousel controls={false} indicators={false}>
              {loading
                ? null
                : books.map((item) => {
                    if (item.status === "Approved") {
                      return (
                        <Carousel.Item interval={2500}>
                          <img
                            className="img-thumbnail"
                            src={urlAsset.thumbnail + item.thumbnail}
                            alt={item.title}
                            width="265"
                            height="386"
                            style={{ cursor: "pointer", borderRadius: "10px" }}
                            onClick={() => history.push(`/Detail/${item.id}`)}
                          />
                        </Carousel.Item>
                      );
                    }
                  })}
            </Carousel>
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
          <div>
            <Dropdown
              drop="left"
              onSelect={(e) => {
                setSelected(e);
              }}
            >
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
                {selected}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="All">All</Dropdown.Item>
                {loading || !category ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  category.map((category, index) => {
                    return (
                      <Dropdown.Item
                        eventKey={category.name}
                        key={index}
                        as={Button}
                      >
                        {category.name}
                      </Dropdown.Item>
                    );
                  })
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div style={{ marginLeft: "-20px", paddingRight: "50px" }}>
          {category.map((category, index) => {
            if (selected === category.name && category.books.length === 0) {
              return (
                <h1>
                  {category.name} NO BOOK FOUNDED || THIS CATEGORY HAS NO BOOKS
                </h1>
              );
            }
          })}
        </div>
      </div>
      <div style={{ marginLeft: "-10px" }}>
        <ListBook selected={selected} route="HOME" />
      </div>
    </div>
  );
};

export default Home;
