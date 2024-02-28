import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function RegisterModal() {
  const [show, setShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [users, setUsers] = useState([]);
  const apiUrl = "https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev";
  const MyProjectID = "31e79780-d46c-496f-9b91-08b24583d0e9";
  const [formData, setFormData] = useState({
    Role: "",
    ID: "",
    ProjectID: MyProjectID,
    Name: "",
    Email: "",
    Password: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.Name || !formData.Email || !formData.Password) {
      alert("Please fill out all required fields.");
      return;
    }

    if (editMode) {
    } else {
      axios
        .post(
          `${apiUrl}/user/`,
          formData
        )
        .then((response) => {
         
          setUsers((prevUsers) => [...prevUsers, formData]);
          setFormData({
            Role: "",
            ID: "",
            ProjectID: MyProjectID,
            Name: "",
            Email: "",
            Password: "",
          });

          setAlertShow(true);


          setTimeout(() => {
            setAlertShow(false);
          }, 2000);

         
          handleClose();
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          alert("Failed to register, Make sure you fill up all fields then try again.");
        });
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-person-plus m-3"> Sign Up</i>
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Enter Your Details To Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type in your Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address Only"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                required
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type your password here"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                required
              />
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="Role"
                value={formData.Role}
                onChange={handleInputChange}
              >
                <option value="Guest">Guest</option>
              </Form.Control>
            </Form.Group>
            <Button className="m-3 " variant="secondary" onClick={handleClose}>
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
        <div className="alert alert-success position-fixed top-0 end-0 m-3" role="alert">
          You are registered successfully! Please login.
        </div>
      )}
    </div>
  );
}

export default RegisterModal;
