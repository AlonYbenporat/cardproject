import { useEffect, useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import { ThemeContext } from "../context/ThemeContext";
import { ListContext } from "../context/ListContext";
import axios from "axios";
import { CardsStaticUrl } from "../Service/ConstantsApi";
import Footer from "../Components/Footer";
import CardItemLevel from "../Components/CardItemlevel";
import "../Style/cards.css";

function UserCards() {
  const { theme, reversedTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const { selectedItem, setSelectedItem } = useContext(ListContext);
  const storedToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [isTableView, setIsTableView] = useState(true);

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
  const handleTableView = () => {
    setIsTableView(true);
  };

  const handleCardView = () => {
    setIsTableView(false);
  };
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
    return <CardItemLevel></CardItemLevel>;
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
      <div className="m-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder=" Search Box - you can try search Site Name OR Address."
          className="form-control"
        />
      </div>
      <div className="sizeltr">
        {isTableView ? (
          <i className="bi bi-card-image" onClick={handleCardView}></i>
        ) : (
          <i className="bi bi-table" onClick={handleTableView}></i>
        )}
      </div>

      {isTableView ? (
        <table className="items text-center">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Description</th>
              <th>Email</th>
              <th>Web</th>
              <th>Likes</th>
              <th>Country</th>
              <th>City</th>
              <th>Street</th>
              <th>House number</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.subtitle}</td>
                <td title={item.description}>
                  {item.description.length > 10
                    ? `${item.description.slice(0, 10)}...`
                    : item.web}
                </td>
                <td>{item.email}</td>
                <td>
                  <a href={item.web} target="_blank" rel="noopener noreferrer">
                    {item.web}
                  </a>
                </td>
                <td>
                  <div
                    className={`text-center text-${reversedTheme}`}
                    style={{ position: "relative" }}>
                    {item.isLikedByUser ? (
                      <div style={{ position: "relative" }}>
                        <i
                          className="bi bi-heart-fill text-danger"
                          style={{ cursor: "pointer", fontSize: "25px" }}
                          onClick={() => handleLike(item._id)}></i>
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "14px",
                          }}>
                          {item.likes.length}
                        </span>
                      </div>
                    ) : (
                      <div style={{ position: "relative" }}>
                        <i
                          className="bi bi-heart"
                          style={{ cursor: "pointer", fontSize: "25px" }}
                          onClick={() => handleLike(item._id)}></i>
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "14px",
                          }}>
                          {item.likes.length}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td>{item.address.country}</td>
                <td>{item.address.city}</td>
                <td>{item.address.street}</td>
                <td>{item.address.houseNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="container">
          <div className="row">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="col-md-4 mb-5 ">
                <div
                  className={`card bg-${theme} `}
                  style={{ width: "300px", height: "500px" }}>
                  <div
                    className={`text-center text-${reversedTheme}`}
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
                  <h5 className={`text-center  text-${reversedTheme} `}>
                    {item.subtitle}
                  </h5>
                  <a
                    className="text-center"
                    href={item.web}
                    target="_blank"
                    rel="noopener noreferrer ">
                    {item.web}
                  </a>
                  <img
                    onClick={() => handleCardClick(item)}
                    className="card-image"
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
      )}
      <Footer></Footer>
    </div>
  );
}

export default UserCards;
