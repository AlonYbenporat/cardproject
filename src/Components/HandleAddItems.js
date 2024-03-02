import React, { useContext, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import NavBar from "./NavBar";
import "../Style/cards.css";
import { Button, Row, Col, Alert, Card } from "react-bootstrap";
import initialFormData from "../HelperFuncrions/FormData";
import { useImageList } from "./ImageList";
import { CardsStaticUrl } from "../Service/ConstantsApi";
import Footer from "./Footer";

function HandleAddItems() {
  const { theme, reversedTheme } = useContext(ThemeContext);
  const token = localStorage.getItem("token");
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imageList] = useImageList();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
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
  });
  const resetForm = () => {
    setFormData(initialFormData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value,
      },
    }));
  };
  const handleImageSelect = (selectedImage) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: {
        url: selectedImage.path,
        alt: selectedImage.name,
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        formData,
        {
          headers: {
            "x-auth-token": `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAddedItems([...addedItems, response.data]);
      setSuccessMessage("Card Wasd added successfully!");
      setFailureMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
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
      });
    } catch (error) {
      console.error(error);
      setFailureMessage("Failed to add item.");
      setSuccessMessage("");
      setTimeout(() => setFailureMessage(""), 3000);
    }
  };
  const handleEdit = (editedItem) => {
    setEditMode(true);
    setEditItemId(editedItem._id);
    setFormData({
      title: editedItem.title,
      subtitle: editedItem.subtitle,
      description: editedItem.description,
      phone: editedItem.phone,
      email: editedItem.email,
      web: editedItem.web,
      image: {
        url: editedItem.image.url,
        alt: editedItem.image.alt,
      },
      address: {
        state: editedItem.address.state,
        country: editedItem.address.country,
        city: editedItem.address.city,
        street: editedItem.address.street,
        houseNumber: editedItem.address.houseNumber,
        zip: editedItem.address.zip,
      },
    });
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${CardsStaticUrl}${editItemId}`,
        formData,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const updatedItems = addedItems.map((item) =>
        item._id === editItemId ? response.data : item
      );
      setAddedItems(updatedItems);
      setSuccessMessage("Card updated successfully!");
      resetForm();
      setEditMode(false);
      setFailureMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to update card:", error);
      setFailureMessage("Failed to update card.");
      setSuccessMessage("");
      setTimeout(() => setFailureMessage(""), 3000);
      resetForm();
    }
  };
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${CardsStaticUrl}${itemId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const updatedItems = addedItems.filter((item) => item._id !== itemId);
      setAddedItems(updatedItems);
      setSuccessMessage("Card deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to delete card:", error);
      setFailureMessage("Failed to delete card.");
      setTimeout(() => setFailureMessage(""), 3000);
    }
  };
  return (
    <div className={`bg-${theme} text-${reversedTheme}`}>
      <NavBar />
      <h1>Add Card to site</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {failureMessage && <Alert variant="danger">{failureMessage}</Alert>}
            <form onSubmit={handleSubmit}>
              <div className={`row bg-${theme}`}>
                <div className="col">
                  <label>Title:</label>
                  <input
                    className={`form-control`}
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    required
                  />
                  <label>Subtitle:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="Subtitle"
                    required
                  />
                  <label>Description:</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                  />
                  <label>Phone:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    required
                  />
                  <label>Email:</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                  <label>Website:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="web"
                    value={formData.web}
                    onChange={handleInputChange}
                    placeholder="Website"
                    required
                  />
                  <label>Select Image:</label>
                  <select
                    className="form-control"
                    name="image"
                    onChange={(e) =>
                      handleImageSelect(imageList[e.target.value])
                    }
                    required>
                    <option value="">Select Image</option>
                    {imageList.map((image, index) => (
                      <option key={index} value={index}>
                        {image.name}
                      </option>
                    ))}
                  </select>
                  <label>State:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="state"
                    value={formData.address.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                    required
                  />
                  <label>Country:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="country"
                    value={formData.address.country}
                    onChange={handleAddressChange}
                    placeholder="Country"
                    required
                  />
                  <label>City:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                    required
                  />
                  <label>Street:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="street"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                    placeholder="Street"
                    required
                  />
                  <label>House Number:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="houseNumber"
                    value={formData.address.houseNumber}
                    onChange={handleAddressChange}
                    placeholder="House Number"
                    required
                  />
                  <label>ZIP Code:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="zip"
                    value={formData.address.zip}
                    onChange={handleAddressChange}
                    placeholder="ZIP Code"
                    required
                  />
                  <Button
                    type="submit"
                    className="btn btn-success m-3"
                    disabled={
                      !formData.title ||
                      !formData.subtitle ||
                      !formData.description ||
                      !formData.phone ||
                      !formData.email ||
                      !formData.web ||
                      !formData.image.url ||
                      !formData.address.state ||
                      !formData.address.country ||
                      !formData.address.city ||
                      !formData.address.street ||
                      !formData.address.houseNumber ||
                      !formData.address.zip
                    }
                    onClick={editMode ? handleUpdate : handleSubmit}>
                    {editMode ? "Update" : "Add"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            {addedItems.map((item) => (
              <div key={item._id} className="container mt-4">
                <div className="row">
                  <div className="col-md-2 offset-md-2">
                    <Card className="custom-card">
                      <div>
                        <Button
                          className="btn btn-info m-5"
                          onClick={() => handleEdit(item)}>
                          Edit
                        </Button>
                        <Button
                          className="btn btn-danger m-5"
                          onClick={() => handleDelete(item._id)}>
                          Delete
                        </Button>
                      </div>
                      <Card.Img
                        variant="top"
                        src={item.image.url}
                        alt={item.image.alt}
                      />
                      <Card.Body>
                        <Card.Title>Title: {item.title}</Card.Title>
                        <Card.Subtitle>
                          SubTitle : {item.subtitle}
                        </Card.Subtitle>
                        <Card.Text>phone: {item.phone}</Card.Text>
                        <Card.Text>{item.email}</Card.Text>
                        <Card.Text>{item.web}</Card.Text>
                        <Card.Text>
                          Address: {item.address.state},{item.address.country},
                          {item.address.city}
                        </Card.Text>
                        <Card.Text>
                          {item.address.street},{item.address.houseNumber},
                          {item.address.zip}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default HandleAddItems;
