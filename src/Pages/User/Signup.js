import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../../config/api";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
import * as Yup from "yup";
const Signup = (props) => {
  const [state, dispatch] = useContext(CartContext);
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      gender: "Male",
      phone: "",
      address: "",
      isAdmin: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email required")
        .email("Invalid email format!"),
      password: Yup.string()
        .required("Password Required")
        .min(8, "Must be 8 characters or more!"),
      fullName: Yup.string().required().min(3),
      gender: Yup.string().required(),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone only accepts input numbers from 0-9")
        .required()
        .min(10),
      address: Yup.string().required().min(5),
    }),
    onSubmit: (values) => {
      registerAction(values);
    },
  });

  const [registerAction, { isLoading, error }] = useMutation(async (values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(values);

      try {
        const res = await API.post("/register", body, config);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data.data,
        });

        setAuthToken(res.data.data.token);

        try {
          const res = await API.get("/auth");
          dispatch({
            type: "USER_LOADED",
            payload: res.data.data.user,
          });
        } catch (err) {
          setErrorMsg(err.response.data.message);
          dispatch({
            type: "AUTH_ERROR",
          });
        }

        history.push("/Home");
      } catch (err) {
        setErrorMsg(err.response.data.message);
        dispatch({
          type: "LOGIN_FAIL",
        });
      }
    } catch (err) {
      setErrorMsg(err.response.data.message);
      console.log(err);
    }
  });
  return (
    <Modal
      {...props}
      size="lg-6"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {errorMsg ? <Alert variant="danger">{errorMsg || error}</Alert> : null}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <strong>Sign Up</strong>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="container">
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                {...getFieldProps("email")}
              />
              <Form.Text className="text-muted">
                {touched.email && errors.email ? (
                  <p style={{ color: "red" }}>{errors.email}</p>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                {...getFieldProps("password")}
              />
              <Form.Text className="text-muted">
                {touched.password && errors.password ? (
                  <p style={{ color: "red" }}>{errors.password}</p>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Fullname"
                name="fullName"
                {...getFieldProps("fullName")}
              />
              <Form.Text className="text-muted">
                {touched.fullName && errors.fullName ? (
                  <p style={{ color: "red" }}>{errors.fullName}</p>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                as="select"
                name="gender"
                {...getFieldProps("gender")}
              >
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
              <Form.Text className="text-muted">
                {touched.gender && errors.gender ? (
                  <p style={{ color: "red" }}>{errors.gender}</p>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                {...getFieldProps("phone")}
              />
              <Form.Text className="text-muted">
                {touched.phone && errors.phone ? (
                  <p style={{ color: "red" }}>{errors.phone}</p>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="address"
                {...getFieldProps("address")}
              />
              <Form.Text className="text-muted">
                {touched.address && errors.address ? (
                  <p style={{ color: "red" }}>{errors.address}</p>
                ) : null}
              </Form.Text>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="none"
            type="submit"
            style={{
              marginBottom: "20px",
              width: "100%",
              backgroundColor: "#ee4622",
              color: "white",
            }}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </>
            ) : (
              <>Sign up</>
            )}
          </Button>
          <div style={{ width: "100%", textAlign: "center" }}>
            <p>
              Jika belum memiliki akun silakan klik link{" "}
              <a href="#" onClick={props.onHide}>
                ini
              </a>
            </p>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Signup;
