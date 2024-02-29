import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { UsersApiBaseURL } from "../Service/ConstantsApi";
import { resetFormData } from "../Service/formUtils";

function HandleRegistration() {
  const [show, setShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    name: {
      first: "",
      middle: "",
      last: "",
    },
    phone: "",
    email: "",
    password: "",
    image: {
      url: "",
      alt: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    isBusiness: true,
  });

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNameChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: {
        ...prevFormData.name,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleaddressChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingFields = [];
    if (!formData.name.first) missingFields.push("First Name");
    if (!formData.phone) missingFields.push("Phone");
    if (!formData.email) missingFields.push("Email");
    if (!formData.password) missingFields.push("Password");
    if (!formData.address.country) missingFields.push("Country");
    if (!formData.address.city) missingFields.push("City");
    if (!formData.address.street) missingFields.push("Street");
    if (!formData.address.houseNumber) missingFields.push("House Number");
    if (!formData.address.zip) missingFields.push("ZIP Code");
    if (missingFields.length > 0) {
      alert(
        `Please fill out the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    axios
      .post(`${UsersApiBaseURL}/users`, formData)
      .then((response) => {
        setAlertShow(true);
        setTimeout(() => {
          setAlertShow(false);
        }, 2000);
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        if (error.response) {
          console.error("Server response data:", error.response.data);
          console.error("Server response status:", error.response.status);
          console.error("Server response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received from the server");
        } else {
          console.error("Error setting up the request:", error.message);
        }
        alert(
          "Failed to register. Make sure you fill up all fields and try again."
        );
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-person-plus m-3"> Register</i>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Enter Your Details To Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type in your First Name"
                name="first"
                value={formData.name.first}
                onChange={handleNameChange}
                required
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type in your Last Name"
                name="last"
                value={formData.name.last}
                onChange={handleNameChange}
                required
              />
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address Only"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type your password here"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                name="country"
                value={formData.address.country}
                onChange={handleaddressChange}
                required
              />
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                name="city"
                value={formData.address.city}
                onChange={handleaddressChange}
                required
              />
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street"
                name="street"
                value={formData.address.street}
                onChange={handleaddressChange}
                required
              />
              <Form.Label>House Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your house number"
                name="houseNumber"
                value={formData.address.houseNumber}
                onChange={handleaddressChange}
                required
              />
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your ZIP code"
                name="zip"
                value={formData.address.zip}
                onChange={handleaddressChange}
                required
              />
              <Form.Check
                type="checkbox"
                label="I am Business User"
                name="isBusiness"
                checked={formData.isBusiness}
                onChange={(e) =>
                  setFormData({ ...formData, isBusiness: e.target.checked })
                }
              />
            </Form.Group>
            <Button
              className="m-3 "
              variant="secondary"
              onClick={() => {
                resetFormData(setFormData);
                handleClose();
              }}>
              Go Back
            </Button>
            <Button className="m-3" variant="success" type="submit">
              Register
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {alertShow && (
        <div
          className="alert alert-success position-fixed top-0 end-0 m-3"
          role="alert">
          You are registered successfully! Please login.
        </div>
      )}
    </div>
  );
}
export default HandleRegistration;
