import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";
import { ThemeContext } from "../context/ThemeContext";
import { ListContext } from "../context/ListContext";
import { CardsStaticUrl } from "../Service/ConstantsApi";
import CardItem from "../Components/CardItem";


function Likes() {
  const { theme, reversedTheme } = useContext(ThemeContext);
  const [items, setItems] = useState([]);
  const { selectedItem, setSelectedItem } = useContext(ListContext);
  const [likedItems, setLikedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userId = localStorage.getItem("userId");
  const storedToken = localStorage.getItem("token");
  const [totalLikes, setTotalLikes] = useState(0);
  

  
  useEffect(() => {
    const fetchLikedItems = async () => {
      try {
      
        const response = await axios.get(CardsStaticUrl, { headers: { Authorization: storedToken } });
        const filteredLikedItems = response.data.filter(item => item.likes.includes(userId));
        setLikedItems(filteredLikedItems);
        const likesCount = filteredLikedItems.reduce((total, item) => total + item.likes.length, 0);
        setTotalLikes(likesCount);
        console.log('Liked Items:',filteredLikedItems);
      } catch (error) {
        console.error("Error fetching liked items:", error);
      }
    };
    fetchLikedItems();
  }, [userId, storedToken]); 

  const handleCardClick = (item) => {
    console.log('Selected Item:', item);
    setSelectedItem(item);
  };
  const handleUnlike = async (itemId) => {
    try {
      const response = await axios.patch(
        `${CardsStaticUrl}/${itemId}`,
        { likes: likedItems.find(item => item._id === itemId).likes.filter(id => id !== userId) },
        { headers: { 'x-auth-token':  storedToken } }
      );

      const updatedResponse = await axios.get(CardsStaticUrl, { headers: { Authorization: storedToken } });
      const updatedItems = updatedResponse.data;
      setItems(updatedItems);
      setLikedItems(updatedItems.filter(item => item.likes.includes(userId)));
    } catch (error) {
      console.log("Error unliking item:", error);
    }
  };
  if (selectedItem) {
    return (
      <>
        <NavBar />
        <CardItem />
      </>
    );
  }
  const totaUserlLikes = likedItems.length;
  const filteredItems = likedItems.filter(item => {
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        if (typeof item[key] === 'string' && item[key].toLowerCase().includes(searchQuery.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  });

  return (
    <>
      <NavBar />
      <div className={`bg-${theme}`}>
        <h1 className={`text-center text-${reversedTheme}`}>
        <button type="button" class="btn btn-primary m-3 ">
        Total likes: {totaUserlLikes} <span class="badge badge-secondary"></span>
        </button></h1>
        <div className="container">
          <div className="row">
            <div className="m-3">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder=" Search Box - you can try search Site Name OR Address."
                className="form-control"
              />
            </div>
            {filteredItems.map((item, index) => (
              <div key={item.id} className="col-md-4 mb-5">
                <div className={`card bg-${theme} text-center `}  style={{ width: '300px', height: '500px' }}>
                   <i className="bi bi-trash3" style={{ fontSize: '24px' }} onClick={() => handleUnlike(item._id)}></i>
                  <h4 className={`text-center text-${reversedTheme}`}>{item.title}</h4>
                  <h5 className="text-center">{item.subtitle}</h5>
                  <a className="text-center" href={item.web} target="_blank" rel="noopener noreferrer ">{item.web}</a>
                  <img className="img-fluid" onClick={() => handleCardClick(item)} src={item.image.url} alt={item.image.alt} style={{ width: '300px', height: '300px' }} />
                  <div className={`card body p-2 bg-${theme}`} style={{ height: '100%' }}>
                    <div className={`card-title text-${reversedTheme} text-center `}>
                      <h5 >{item.address.state}-{item.address.city}</h5>
                      <h5>{item.address.street},{item.address.houseNumber}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Likes;
                      
                  
                      
     