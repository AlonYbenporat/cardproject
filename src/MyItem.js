import React, { useState, useEffect } from "react";
import axios from "axios";

function Item() {
  const [items, setItems] = useState([]);
  const [bearerToken, setBearerToken] = useState("");
  const [projectID, setProjectID] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Check if the user token is stored in local storage
    const userToken = localStorage.getItem("USER_TOKEN");

    if (userToken) {
      // If the token is found, set it to the state
      setBearerToken(userToken);

      // Fetch items using the token, projectID, and category
      const fetchItems = async () => {
        const config = {
          headers: { Authorization: `Bearer ${userToken}` },
        };

        try {
          const response = await axios.get(
            `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/item/${projectID}_${category}`,
            config
          );
          setItems(response.data);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };

      // Trigger the fetchItems function
      fetchItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectID, category]);

  return (
    <div>
      <h1>My Items</h1>
      <div>
        <label>Project ID:</label>
        <input
          value={projectID}
          onChange={(e) => setProjectID(e.target.value)}
          placeholder="Project ID"
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.ItemID}>
            {JSON.stringify(item.Data)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Item;
