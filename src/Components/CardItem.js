import React, { useContext } from "react";
import { ListContext } from "../context/ListContext";
import { ThemeContext } from "../context/ThemeContext";
import NavBar from "./NavBar";

function CardItem() {
  const { theme, reversedTheme } = useContext(ThemeContext);
  const { selectedItem, setSelectedItem } = useContext(ListContext);
  console.log("CardItem - Received value:", selectedItem);
  const handleGoBack = () => {
    setSelectedItem(null);
  };

  const { title, subtitle, description, image, phone, email, web, address } =
    selectedItem || {};

  return (
    <>
      <NavBar></NavBar>

      <div
        className={`card  bg-${theme} mx-auto  `}
        style={{ width: "600px", height: "800px" }}>
        <button className="btn btn-secondary m-3 p-3" onClick={handleGoBack}>
          <i class="bi bi-arrow-counterclockwise m-3"></i>
        </button>
        <h1 className={`card-title text-center text-${reversedTheme}`}>
          {title}
        </h1>
        <h4 className={`text-${reversedTheme} text-center`}>{subtitle}</h4>

        <div>
          <i
            className={`bi bi-telephone m-3 p-2 ${
              theme === "dark" ? "text-light" : ""
            }`}></i>
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
        <div>
          <i
            className={`bi bi-envelope m-3 p-2 ${
              theme === "dark" ? "text-light" : ""
            }`}></i>
          <a href={`mailto:${email}`}>{email}</a>
        </div>

        <div>
          <i
            className={`bi bi-globe m-3 p-2 ${
              theme === "dark" ? "text-light" : ""
            }`}></i>
          <a href={web} target="_blank" rel="noopener noreferrer">
            {web}
          </a>
        </div>
        <div>
          <i
            className={`bi bi-geo-alt m-3 p-2 ${
              theme === "dark" ? "text-light" : ""
            }`}></i>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              address
            )}`}
            target="_blank"
            rel="noopener noreferrer">
            {address.street}, {address.city}, {address.country},{address.street}
            ,{address.houseNumber},{address.zip}
          </a>
        </div>
        <p className={`text-${reversedTheme} text-center`}>{description}</p>
        <img className="card-img-top" src={image.url} alt={image.alt} />
      </div>
    </>
  );
}

export default CardItem;
