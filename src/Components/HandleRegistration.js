import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { UsersApiBaseURL } from "../Service/ConstantsApi";
import { resetFormData } from "../Service/formUtils";
import "../Style/cards.css";

function HandleRegistration() {
  const [show, setShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isAdminlogin, setIsAdminlogin] = useState(false);

  useEffect(() => {
    const isAdminlogin = localStorage.getItem("isAdmin") === "true";
    if (isAdminlogin) {
      setIsAdminlogin(true);
    }
  }, []);
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
    isAdmin: false,
    isBusiness: false,
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

    axios
      .post(`${UsersApiBaseURL}/users`, formData)
      .then((response) => {
        if (formData.isBusiness) {
          alert(
            "You are registered successfully! Business is a trial for 30 days."
          );
          handleClose();
          resetFormData(setFormData);
        } else {
          setAlertShow(true);
          setTimeout(() => {
            setAlertShow(false);
          }, 2000);
          handleClose();
          resetFormData(setFormData);
        }
      })
      .catch((error) => {
        console.error("eroor status of data", error.response.data);
        console.error("eroor status", error.response.status);
        console.error("Error adding user:", error);
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data;
          switch (errorMessage) {
            case "User already registered":
              alert("User already registered");
              break;
            case 'Joi Error: user "phone" mast be a valid phone number':
              alert(" invalid phone number");
              break;
            case 'Joi Error: user "mail" mast be a valid mail':
              alert("Email is invalid");
              break;
            case 'Joi Error: user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-':
              alert(
                "Password requirements: at least nine characters long, contain an uppercase letter lowercase letter number,special character"
              );
              break;
            default:
              alert("An error occurred while registering. Please try again.");
          }
        } else {
          alert(
            "Failed to register. Make sure you fill up all fields and try again."
          );
        }
      });
  };

  return (
    <div>
      <button className="btn" onClick={handleShow}>
        Register
      </button>
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
                minLength={2}
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type in your Last Name"
                name="last"
                value={formData.name.last}
                onChange={handleNameChange}
                required
                minLength={2}
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
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your State"
                name="state"
                value={formData.address.state}
                onChange={handleaddressChange}
                required
                minLength={2}
              />
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                name="country"
                value={formData.address.country}
                onChange={handleaddressChange}
                required
                minLength={2}
              />
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                name="city"
                value={formData.address.city}
                onChange={handleaddressChange}
                required
                minLength={2}
              />
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street"
                name="street"
                value={formData.address.street}
                onChange={handleaddressChange}
                required
                minLength={2}
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
              {isAdminlogin && (
                <Form.Check
                  type="checkbox"
                  label="User Is an Admin"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={(e) =>
                    setFormData({ ...formData, isAdmin: e.target.checked })
                  }
                />
              )}
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
          You are registered successfully! You can now login.
        </div>
      )}
    </div>
  );
}
export default HandleRegistration;
