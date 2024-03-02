import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { fetchUserData, loginUser } from "../Service/usersServices";
import axios from "axios";
import { BaseUrlusers } from "../Service/ConstantsApi";

function HandleLogin({ show, onClose, onLogin }) {
  const [alertShow, setAlertShow] = useState(false);
  const [alertTimeout, setAlertTimeout] = useState(null);
  const [isBusiness, setIsBusiness] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [userProp, setUserProp] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleShow = () => {
    setFormData({
      email: "",
      password: "",
    });
    setAlertShow(false);
    onLogin();
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLoginSuccess = (response) => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BaseUrlusers}${response.user._id}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((userResponse) => {
        localStorage.setItem("userId", response.user._id);

        const userProp = userResponse.data;
        localStorage.setItem(`userProp51`, JSON.stringify(userProp));
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
    localStorage.setItem("isLoggedin", true);
    localStorage.setItem("isBusiness", response.user.isBusiness);
    localStorage.setItem("isAdmin", response.user.isAdmin);
    setIsBusiness(response.user.isBusiness);
    handleClose();
    setAlertShow(true);
    const timeoutId = setTimeout(() => {
      setAlertShow(false);
    }, 3000);
    setAlertTimeout(timeoutId);
    setLoginAttempts(0);
    onLogin(response.name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loginAttempts >= 3) {
        setFormData({
          email: "",
          password: "",
        });
        alert(
          "Too many login attempts. Please try again later. you are cuurntely lock "
        );
        handleClose();
        return;
      }
      const response = await loginUser(formData.email, formData.password);
      if (response.success) {
        handleShow();
        setAlertShow(true);
        handleLoginSuccess(response);
        setLoginAttempts(0);
        const timeoutId = setTimeout(() => {
          setAlertShow(false);
        }, 3000);
        setAlertTimeout(timeoutId);
      } else {
        setLoginAttempts((prevAttempts) => prevAttempts + 1);
        alert("Invalid username or password. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        alert(
          error.response.data.message ||
            "Invalid username or password. Please try again."
        );
      } else {
        console.error("An error occurred:", error);
      }
      localStorage.setItem("isLoggedin", false);
      localStorage.setItem("isBusiness", false);
    }
  };

  useEffect(() => {
    return () => {
      if (alertTimeout) {
        clearTimeout(alertTimeout);
      }
    };
  }, [alertTimeout]);

  const handleClose = () => {
    onClose();
    setAlertShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login to your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>UserName</Form.Label>
              <Form.Control
                name="email"
                type="text"
                placeholder="Enter your User name"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Go Back
              </Button>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {alertShow && (
        <div
          className="alert alert-success position-fixed top-0 end-0 m-3"
          role="alert">
          You are logged in successfully!
        </div>
      )}
    </>
  );
}
export default HandleLogin;
