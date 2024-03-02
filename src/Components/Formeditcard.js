import React from "react";
import { Button, Modal } from "react-bootstrap";

const FormEditCards = ({
  theme,
  formData,
  handleInputChange,
  handleSubmit,
  editMode,
  disableSubmit,
}) => {
  return (
    <Modal.Body>
      <form onSubmit={handleSubmit}>
        <div className={`form-group bg-${theme}`}>
          <label>Type Card Title</label>
          <input
            className={`form-control`}
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder={`Card Title `}
            required
          />
        </div>
        <div className="form-group">
          <label>Subtitle:</label>
          <input
            className="form-control"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            placeholder="Subtitle"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number"
            required
          />
        </div>
        <div className="form-group">
          <label>Website:</label>
          <input
            className="form-control"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="Url"
            required
          />
        </div>
        <div className="form-group">
          <label>Adress:</label>
          <input
            className="form-control"
            name="adress"
            value={formData.adress}
            onChange={handleInputChange}
            placeholder="adress"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required></textarea>
        </div>
        <Button
          className="btn btn-success m-3"
          type="submit"
          disabled={disableSubmit}>
          {editMode ? "Update" : "Add"}
        </Button>
      </form>
    </Modal.Body>
  );
};
export default FormEditCards;
