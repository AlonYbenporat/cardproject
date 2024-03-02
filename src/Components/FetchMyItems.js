import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import { ListContext } from "../context/ListContext";
import CardItem from "./CardItem";
import { CardsStaticUrl } from "../Service/ConstantsApi";
import "../Style/cards.css";

function FetchMyItems() {
  const [items, setItems] = useState([]);
  const { theme, reversedTheme } = useContext(ThemeContext);
  const { selectedItem, setSelectedItem } = useContext(ListContext);
  const [searchQuery, setSearchQuery] = useState("");
  const storedToken = localStorage.getItem("token");
  const [totalLikes, setTotalLikes] = useState(0);
  const userId = localStorage.getItem("userId");
  const fetchItems = async () => {
    try {
      const response = await axios.get(CardsStaticUrl, {
        headers: { Authorization: storedToken },
      });
      const itemsWithLikes = response.data.map((item) => {
        const isLikedByUser = item.likes.includes(userId);
        return { ...item, isLikedByUser };
      });
      setItems(itemsWithLikes);
      const totalLikesCount = itemsWithLikes.reduce(
        (total, item) => total + item.likes.length,
        0
      );
      setTotalLikes(totalLikesCount);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  const handleLike = async (itemId) => {
    try {
      const itemToUpdate = items.find((item) => item._id === itemId);
      if (!itemToUpdate) {
        console.error(`Item with ID ${itemId} not found.`);
        return;
      }
      const updatedLikes = itemToUpdate.likes.includes(userId)
        ? itemToUpdate.likes.filter((id) => id !== userId)
        : [...itemToUpdate.likes, userId];
      localStorage.setItem("likedItems", JSON.stringify(updatedLikes));
      const updatedItems = items.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            likes: updatedLikes,
            isLikedByUser: !item.isLikedByUser,
          };
        }
        return item;
      });
      setItems(updatedItems);
      const response = await axios.patch(
        `${CardsStaticUrl}/${itemId}`,
        { likes: updatedLikes },
        { headers: { "x-auth-token": storedToken } }
      );
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item._id === itemId) {
            return { ...item, likes: updatedLikes };
          }
          return item;
        })
      );
    } catch (error) {}
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    fetchItems();
  }, []);
  if (selectedItem) {
    return <CardItem items={items} />;
  }
  const filteredItems = items.filter((item) => {
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        if (
          typeof item[key] === "string" &&
          item[key].toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return true;
        }
      }
    }
    return false;
  });

  return (
    <div className="container">
      <div className="row">
        <div className="m-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder=" Search Box - you can try search Site Name OR Address."
            className="form-control"
          />
        </div>
        {filteredItems.map((item, index) => (
          <div key={item.id} className="col-md-4 mb-5">
            <div
              className={`card bg-${theme} text-${reversedTheme} `}
              style={{ width: "300px", height: "500px" }}>
              <div
                className={`text-center`}
                style={{ borderColor: "#FFFFFF" }}
                onClick={() => handleLike(item._id)}>
                {item.isLikedByUser ? (
                  <i
                    className="bi bi-heart-fill text-danger "
                    style={{ cursor: "pointer", fontSize: "30px" }}></i>
                ) : (
                  <i
                    className="bi bi-heart"
                    style={{ cursor: "pointer", fontSize: "28px" }}></i>
                )}{" "}
                <span style={{ marginLeft: "5px", fontSize: "30px" }}>
                  {item.likes.length}
                </span>
              </div>
              <h4 className={`text-center text-${reversedTheme}`}>
                {item.title}
              </h4>
              <h5 className="text-center">{item.subtitle}</h5>
              <a
                className="text-center"
                href={
                  item.web.startsWith("http") ? item.web : `http://${item.web}`
                }
                target="blank"
                rel="noopener noreferrer ">
                {item.web}
              </a>
              <img
                onClick={() => handleCardClick(item)}
                className="card-image"
                src={item.image.url}
                alt={item.image.alt}
              />
              <div
                className={`card body p-2 bg-${theme}`}
                style={{ height: "100%" }}>
                <div
                  className={`card-title text-${reversedTheme} text-center `}>
                  <h5>
                    {item.address.state}-{item.address.city}
                  </h5>
                  <h5>
                    {item.address.street},{item.address.houseNumber}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FetchMyItems;
