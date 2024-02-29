import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { BaseUrlusers } from "../Service/ConstantsApi";

function EditUserDetails({ show, onClose }) {
  useEffect(() => {}, [show]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userProp51"));
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
    isBusiness: "",
    classCode: "",
  });

  useEffect(() => {
    console.log("userdata-Edit:", userData);
    if (userData) {
      setFormData(userData);
    }
  }, []);
  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: {
        ...prevFormData.name,
        [name]: value,
      },
    }));
  };

  const handleaddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value,
      },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      _id: id,
      name,
      image,
      address,
      email,
      isAdmin,
      isBusiness,
      classCode,
      createdAt,
      password,
      ...rest
    } = formData;
    const nameWithoutId = { ...name };
    delete nameWithoutId._id;
    const imageWithoutId = { ...image };
    delete imageWithoutId._id;
    const addressWithoutId = { ...address };
    delete addressWithoutId._id;
    const formDataWithoutId = {
      ...rest,
      name: nameWithoutId,
      image: imageWithoutId,
      address: addressWithoutId,
    };
    const config = {
      method: "put",
      url: `${BaseUrlusers}${userId}`,
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formDataWithoutId),
    };
    axios
      .request(config)
      .then((response) => {
        alert(" Your user details were updated succsessfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
        alert("Failed to update user details. Please try again.");
      });
  };
  return (
    <div>
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address Only"
                name="email"
                value={formData.email}
                disabled
              />
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
            </Form.Group>
            <Button className="m-3" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="m-3" variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default EditUserDetails;
