import React from "react";
import { Button, Modal } from "react-bootstrap";
const NotifAdminAddBook = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      variant="success"
    >
      <Modal.Body style={{ padding: "40px 123px 25px 123px" }}>
        <div
          style={{
            font: "avenir",
            textAlign: "center",
            color: "#22bb33",
            fontSize: "24px",
          }}
        >
          <p>Your book has been added successfully</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default NotifAdminAddBook;
