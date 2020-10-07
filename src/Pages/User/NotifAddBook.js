import React from "react";
import { Button, Modal } from "react-bootstrap";
const NotifAddBook = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      variant="success"
    >
      <Modal.Body style={{ margin: "39px 36px 40px 37px" }}>
        <div
          style={{
            font: "avenir",
            textAlign: "center",
            color: "#22bb33",
            fontSize: "24px",
          }}
        >
          <p>
            Thank you for adding your own books to our website, please<br></br>
            wait 1 x 24 hours to verify whether this book is your writing
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default NotifAddBook;
