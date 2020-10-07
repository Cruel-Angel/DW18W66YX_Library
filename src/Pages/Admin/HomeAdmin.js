import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Navbar from "./Navbar";
import DataMyBook from "../../Data/DataMyBook.json";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { Button } from "react-bootstrap";
const HomeAdmin = () => {
  const [cek, dispatch] = useContext(CartContext);

  const history = useHistory();
  if (!cek.isLoginAdmin) {
    history.push(`/`);
  }

  const islogout = () => {
    return dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div>
      <div className="container">
        <div style={{ paddingTop: "34px", paddingBottom: "50px" }}>
          <Navbar />
        </div>
        <h1
          style={{
            font: "avenir",
            fontWeight: "650",
            fontSize: "36px",
            paddingBottom: "29px",
          }}
        >
          Book Verification
        </h1>
        <table className="table">
          <tr>
            <th>No</th>
            <th>User or Author</th>
            <th>ISBN</th>
            <th>E-book</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tbody>
            {DataMyBook.map((Book) => (
              <tr>
                <th>{Book.id}</th>
                <td>{Book.Penulis}</td>
                <td>{Book.ISBN}</td>
                <td>{Book.file_epub}</td>
                <td
                  style={{
                    color:
                      Book.Status === "Approve"
                        ? "#0ACF83"
                        : Book.Status === "Cancel"
                        ? "#FF0742"
                        : "#F7941E",
                  }}
                ></td>
                <td>
                  {Book.Status === "Approve" ? (
                    <AiFillCheckCircle size={40} color="#3BB54A" />
                  ) : Book.Status === "Cancel" ? (
                    <MdCancel size={40} color="#FF0742" />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "-20px",
                      }}
                    >
                      <Button
                        variant="none"
                        style={{
                          background: "#FF0742",
                          color: "white",
                          textAlign: "center",
                          padding: "7px 22px 6px 21px",
                        }}
                      >
                        Cancel
                      </Button>
                      <div style={{ marginLeft: "22px" }}>
                        <Button
                          variant="none"
                          style={{
                            background: "#0ACF83",
                            color: "white",
                            textAlign: "center",
                            padding: "7px 12px 6px 13px",
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeAdmin;
