import React, { useContext, useState } from "react";
import { ListContext } from "../context/ListContext";
import { ThemeContext } from "../context/ThemeContext";
import "../Style/cards.css";

function CardItem({ items }) {
  const { theme, reversedTheme } = useContext(ThemeContext);
  const { selectedItem, setSelectedItem } = useContext(ListContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGoBack = () => {
    setSelectedItem(null);
  };

  const { title, subtitle, description, image, phone, email, web, address } =
    selectedItem || {};

  const handleNextItem = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(items[nextIndex]);
  };
  const handleBackItem = () => {
    const nextIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(items[nextIndex]);
  };

  return (
    <>
      <div
        className={`card  bg-${theme} mx-auto  `}
        style={{ width: "600px", height: "800px" }}>
        <div className="text-center m-3 ">
          <i
            className="lgfont bi bi-arrow-left-circle-fill m-4"
            onClick={handleBackItem}></i>
          <i
            className="lgfont bi bi-arrow-counterclockwise m-4"
            onClick={handleGoBack}></i>
          <i
            className="lgfont bi bi-arrow-right-circle-fill m-4"
            onClick={handleNextItem}></i>
        </div>
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
              address.street + address.houseNumber
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
