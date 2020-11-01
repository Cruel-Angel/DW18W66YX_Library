import React, { useContext, useEffect, useState } from "react";
import { API } from "../../config/api";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Navbar from "./Navbar";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
const HomeAdmin = () => {
  const [state] = useContext(CartContext);
  const [cancelId, setCancelId] = useState(null);
  const [approveId, setApproveId] = useState(null);
  const [resetId, setResetId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { isLoading, error, data: books, refetch } = useQuery("loadBook", () =>
    API.get(`/books`)
  );

  const [reset] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ status: "Waiting to be verified" });
      const res = await API.patch(`/book/${resetId}`, body, config);

      refetch();
    } catch (err) {
      console.log(err);
    }
  });

  const [Cancel] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ status: "Cancel" });
      const res = await API.patch(`/book/${cancelId}`, body, config);

      refetch();
    } catch (err) {
      console.log(err);
    }
  });
  const [Approve] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ status: "Approved" });
      const res = await API.patch(`/book/${approveId}`, body, config);

      refetch();
    } catch (err) {
      console.log(err);
    }
  });
  const [onDelete] = useMutation(async () => {
    try {
      const res = await API.delete(`/book/${deleteId}`);
      refetch();
    } catch (err) {}
  });
  const history = useHistory();
  if (!state.isLoginAdmin) {
    history.push(`/`);
  }

  return (
    <div>
      {isLoading || !books ? (
        <h1>Now Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
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
          <table className="table" style={{ marginBottom: "300px" }}>
            <tr>
              <th>No</th>
              <th>User or Author</th>
              <th>ISBN</th>
              <th>File</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            <tbody>
              {books.data.data.map((item, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>{item.author}</td>
                  <td>{item.ISBN}</td>
                  <td>{item.file}</td>
                  <td
                    style={{
                      color:
                        item.status === "Approved"
                          ? "#0ACF83"
                          : item.status === "Cancel"
                          ? "#FF0742"
                          : "#F7941E",
                    }}
                  >
                    {item.status}
                  </td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {item.status === "Approved" ? (
                        <div>
                          <AiFillCheckCircle size={40} color="#3BB54A" />
                          <Button
                            variant="warning"
                            onClick={() => {
                              setResetId(item.id);
                              reset();
                            }}
                            style={{
                              background: "##ffcc00",
                              color: "white",
                              textAlign: "center",
                              padding: "7px 22px 6px 21px",
                              marginLeft: "50px",
                            }}
                          >
                            Reset
                          </Button>
                        </div>
                      ) : item.status === "Cancel" ? (
                        <div>
                          <MdCancel size={40} color="#FF0742" />
                          <Button
                            variant="warning"
                            onClick={() => {
                              setResetId(item.id);
                              reset();
                            }}
                            style={{
                              background: "##ffcc00",
                              color: "white",
                              textAlign: "center",
                              padding: "7px 22px 6px 21px",
                              marginLeft: "50px",
                            }}
                          >
                            Reset
                          </Button>
                        </div>
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
                            onClick={() => {
                              setCancelId(item.id);
                              Cancel();
                            }}
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
                              onClick={() => {
                                setApproveId(item.id);
                                Approve();
                              }}
                            >
                              Approve
                            </Button>
                          </div>
                        </div>
                      )}
                      <Button
                        variant="none"
                        onClick={() => {
                          setDeleteId(item.id);
                          onDelete();
                        }}
                        style={{
                          background: "#FF0742",
                          color: "white",
                          padding: "7px 22px 6px 21px",
                          marginLeft: "30px",
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomeAdmin;
