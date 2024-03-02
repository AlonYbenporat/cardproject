import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useImageList } from "../Components/ImageList";
import initialFormData from "../HelperFunctions/FormData";
import axios from "axios";
import { CardsStaticUrl } from "../Service/ConstantsApi";
import NavBar from "../Components/NavBar";
import { Alert } from "react-bootstrap";
import Footer from "../Components/Footer";

function AddItems() {
  const { theme, reversedTheme } = useContext(ThemeContext);
  const storedToken = localStorage.getItem("token");
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [items, setItems] = useState([]);
  const [imageList] = useImageList();
  const userId = localStorage.getItem("userId");

  const fetchItems = async () => {
    try {
      const response = await axios.get(CardsStaticUrl, {
        headers: {
          "x-auth-token": storedToken,
        },
      });
      const userItems = response.data
        .filter((item) => item.user_id === userId)
        .map((item) => ({
          ...item,
          isLikedByUser: item.likes.includes(userId),
        }));
      setItems(userItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [formData, setFormData] = useState(initialFormData);

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
      const response = await axios.post(CardsStaticUrl, formData, {
        headers: {
          "x-auth-token": storedToken,
          "Content-Type": "application/json",
        },
      });
      fetchItems();
      setSuccessMessage("Card added successfully!");
      setFailureMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
      resetForm();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;
        switch (errorMessage) {
          case 'Joi Error: card "phone" mast be a valid phone number':
            setFailureMessage("Phone number is invalid");
            break;
          case 'Joi Error: card "mail" mast be a valid mail':
            setFailureMessage("Email is invalid");
            break;
          case 'Joi Error: "title" length must be at least 2 characters long':
            setFailureMessage(" Your title length is too short");
            break;
          case 'Joi Error: "subtitle" length must be at least 2 characters long':
            setFailureMessage(" Your subtitle length is too short");
            break;
          case 'Joi Error: card "web" mast be a valid url':
            setFailureMessage(" Website address is invalid");
            break;
          case 'Joi Error: "address.country" length must be at least 2 characters long':
            setFailureMessage(" Country name is too short");
            break;
          case 'Joi Error: "address.city" length must be at least 2 characters long':
            setFailureMessage(" City name is too short");
            break;
          case 'Joi Error: "address.street" length must be at least 2 characters long':
            setFailureMessage(" Street name is too short");
            break;
          case 'Joi Error: "description" length must be at least 2 characters long':
            setFailureMessage("Description length is too short");
            break;
          default:
            setFailureMessage(
              "Please check your input data and try again. Remember: all fields are required"
            );
        }
      } else {
        setFailureMessage("Failed to add item.");
      }
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
            "x-auth-token": storedToken,
            "Content-Type": "application/json",
          },
        }
      );
      fetchItems();
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
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${CardsStaticUrl}${itemId}`, {
        headers: {
          "x-auth-token": storedToken,
        },
      });

      setSuccessMessage("Card deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      fetchItems();
    } catch (error) {
      console.error("Failed to delete card:", error);
      setFailureMessage("Failed to delete card.");
      setTimeout(() => setFailureMessage(""), 3000);
    }
  };
  return (
    <>
      <NavBar></NavBar>
      <div className={`bg-${theme} text-${reversedTheme}`}>
        <h1 className="text-center">Add Card to site</h1>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {failureMessage && <Alert variant="danger">{failureMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <button
                type="submit"
                className="btn btn-block"
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
              </button>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Title"
                    onChange={handleInputChange}
                    value={formData.title}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
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
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Website:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="web"
                    value={formData.web}
                    onChange={handleInputChange}
                    placeholder="Web address"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
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
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
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
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
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
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone Number:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>State</label>
                  <input
                    className="form-control"
                    type="text"
                    name="state"
                    value={formData.address.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
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
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>House Number</label>
                    <input
                      type="number"
                      className="form-control"
                      name="houseNumber"
                      placeholder="Pick House number"
                      value={formData.address.houseNumber}
                      onChange={handleAddressChange}
                      min="1"
                      step="1"
                      s
                      pattern="\d+"
                      inputMode="numeric"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-2 ">
                  <div className="form-group">
                    <label>Zip</label>
                    <input
                      type="number"
                      className="form-control"
                      name="zip"
                      placeholder="Pick Zip Code"
                      value={formData.address.zip}
                      onChange={handleAddressChange}
                      min="1000"
                      step="1"
                      pattern="\d+"
                      inputMode="numeric"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Select Image:</label>
                <select
                  className="form-control"
                  name="image"
                  onChange={(e) => handleImageSelect(imageList[e.target.value])}
                  required>
                  <option value="">Select Image</option>
                  {imageList.map((image, index) => (
                    <option key={index} value={index}>
                      {image.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                  />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <h1 className="text-center">Your Cards</h1>
        <div className="container">
          <div className="row">
            {items.map((item) => (
              <div key={item._id} className="col-md-4 mb-4">
                <div className={`card bg-${theme} text-${reversedTheme}`}>
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {item.subtitle}
                    </h6>
                    <p className="card-text">{item.phone}</p>
                    <p className="card-text">{item.email}</p>
                    <a href={item.web} className="card-text">
                      {item.web}
                    </a>
                    <p className="card-text ">
                      {item.address.street}, {item.address.houseNumber},{" "}
                      {item.address.city}, {item.address.state},{" "}
                      {item.address.country}, {item.address.zip}
                    </p>
                    <img
                      className="card-image"
                      src={item.image.url}
                      alt={item.image.alt}
                    />
                    <p className="card-text">
                      {item.description.length > 50
                        ? `${item.description.substring(0, 50)}...`
                        : item.description}
                    </p>
                    <div className="sizecenter">
                      <i
                        className="bi bi-pencil-square m-4"
                        onClick={() => handleEdit(item)}></i>
                      <i
                        class="bi bi-trash3 m-4"
                        onClick={() => handleDelete(item._id)}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
export default AddItems;
