import React, { useContext, useEffect, useState } from "react";
import ListBook from "../../Components/ListBook";
import { API } from "../../config/api";
import { CartContext } from "../../Context/CartContext";
const MyLibrary = () => {
  const [state, dispatch] = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [relations, setRelations] = useState([]);
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
  }, []);
  {
    loading ? console.log("LOADING RELATIONS....") : console.log(relations);
  }
  const founded = relations.find((item) => item.UserId === state.user.id);
  return (
    <div>
      <div
        style={{
          fontFamily: "times news roman",
          fontSize: "36px",
          fontWeight: "bold",
          lineHeight: "101.5%",
          marginLeft: "10px",
        }}
      >
        My Library
      </div>
      {!loading && founded !== undefined ? (
        <div style={{ marginTop: "45px", marginLeft: "10px" }}>
          <ListBook route="MYLIBRARY" />
        </div>
      ) : (
        <div style={{ marginTop: "45px", marginLeft: "10px" }}>
          <h1>You have no book marked</h1>
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
