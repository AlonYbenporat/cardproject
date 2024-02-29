import { useEffect, useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import { ThemeContext } from "../context/ThemeContext";
import { ListContext } from "../context/ListContext";
import axios from "axios";
import { CardsStaticUrl } from "../Service/ConstantsApi";
import CardItem from "../Components/CardItem";

function UserCards() {
  const { theme, reversedTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const { selectedItem, setSelectedItem } = useContext(ListContext);
  const storedToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const config = {
      method: "get",
      url: CardsStaticUrl,
      headers: {
        "X-API-Key": storedToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        const userItems = response.data
          .filter((item) => item.user_id === userId)
          .map((item) => ({
            ...item,
            isLikedByUser: item.likes.includes(userId),
          }));
        setItems(userItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCardClick = (item) => {
    setSelectedItem(item);
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

      const isLikedByUser = updatedLikes.includes(userId);

      const updatedItems = items.map((item) => {
        if (item._id === itemId) {
          return { ...item, likes: updatedLikes, isLikedByUser };
        }
        return item;
      });

      setItems(updatedItems);
      const response = await axios.patch(
        `${CardsStaticUrl}/${itemId}`,
        { likes: updatedLikes },
        { headers: { "x-auth-token": storedToken } }
      );
    } catch (error) {}
  };
  if (selectedItem) {
    return <CardItem />;
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
    <div className={`bg-${theme} `}>
      <NavBar></NavBar>
      <h1>My Cards</h1>
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
                className={`card bg-${theme} `}
                onClick={() => handleCardClick(item)}
                style={{ width: "300px", height: "500px" }}>
                <button
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
                </button>
                <h4 className={`text-center text-${reversedTheme}`}>
                  {item.title}
                </h4>
                <h5 className={`text-center  text-${reversedTheme} `}>{item.subtitle}</h5>
                <a
                  className="text-center"
                  href={item.web}
                  target="_blank"
                  rel="noopener noreferrer ">
                  {item.web}
                </a>
                <img
                  onClick={() => handleCardClick(item)}
                  className="img-fluid"
                  src={item.image.url}
                  alt={item.image.alt}
                  style={{ width: "300px", height: "300px" }}
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
    </div>
  );
}

export default UserCards;
