import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { ListContext } from "../context/ListContext";
import { BaseUrlusers, CardsStaticUrl } from "../Service/ConstantsApi";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import {
  generatePdf,
  handleExportCSV,
  handlePrint,
} from "../HelperFunctions/tableUtils";

function ItemTable() {
  const [items, setItems] = useState([]);
  const { theme, reversedTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const storedToken = localStorage.getItem("token");
  const [totalLikes, setTotalLikes] = useState(0);
  const [selectedDays, setSelectedDays] = useState(-1);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(CardsStaticUrl, {
          headers: { Authorization: storedToken },
        });
        const items = response.data;
        const filteredItems = items.filter((item) => {
          const createdDate = new Date(item.createdAt);
          const currentDate = new Date();
          const differenceInTime =
            currentDate.getTime() - createdDate.getTime();
          const differenceInDays = differenceInTime / (1000 * 3600 * 24);
          return selectedDays === -1 || differenceInDays <= selectedDays;
        });
        const itemsWithLikes = await Promise.all(
          filteredItems.map(async (item) => {
            const validUserIds = item.likes.filter((userId) => userId);
            if (validUserIds.length > 0) {
              const likedByUsers = await Promise.all(
                validUserIds.map(async (userId) => {
                  try {
                    const userResponse = await axios.get(
                      `${BaseUrlusers}${userId}`,
                      {
                        headers: { "x-auth-token": storedToken },
                      }
                    );
                    return userResponse.data.name.first;
                  } catch (error) {
                    console.error(
                      `Error fetching user with ID ${userId}:`,
                      error
                    );
                    return null;
                  }
                })
              );
              return { ...item, likedByUsers };
            } else {
              return item;
            }
          })
        );
        const totalLikesCount = itemsWithLikes.reduce(
          (total, item) => total + item.likes.length,
          0
        );
        setTotalLikes(totalLikesCount);
        setItems(itemsWithLikes);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [selectedDays]);
  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await axios.delete(`${CardsStaticUrl}/${itemId}`, {
        headers: {
          "x-auth-token": storedToken,
        },
      });

      if (response.status === 200) {
        const updatedItems = items.filter((item) => item._id !== itemId);
        setItems(updatedItems);
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

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
  const handleSort = (key) => {
    const sorted = [...items].sort((a, b) => {
      if (key === "likes") {
        return sortDirection === "asc"
          ? b[key].length - a[key].length
          : a[key].length - b[key].length;
      } else {
        const valueA = key.split(".").reduce((obj, k) => obj[k], a);
        const valueB = key.split(".").reduce((obj, k) => obj[k], b);
        if (typeof valueA === "string" && typeof valueB === "string") {
          const strA = valueA.toLowerCase();
          const strB = valueB.toLowerCase();
          if (strA < strB) return sortDirection === "asc" ? -1 : 1;
          if (strA > strB) return sortDirection === "asc" ? 1 : -1;
          return 0;
        } else {
          if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
          if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
          return 0;
        }
      }
    });
    setItems(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  return (
    <div className={`bg-${theme} text-${reversedTheme}`}>
      <NavBar></NavBar>
      <h1> Items Mangment</h1>
      <div className="m-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder=" Search Parmeter."
          className="form-control"
        />
      </div>
      <h2>total items: {items.length}</h2>
      <h3 className={`text-${reversedTheme}`}>
        <select
          className="text-center"
          value={selectedDays}
          onChange={(e) => setSelectedDays(parseInt(e.target.value))}>
          <option value={-1}>All Items</option>
          <option value={1}>Last day</option>
          <option value={7}>Last Week</option>
          <option value={15}>Last 15 days</option>
          <option value={30}>Last 30 days</option>
          <option value={60}>Last 60 days</option>
          <option value={90}>Last 90 days</option>
          <option value={120}>Last 120 days</option>
        </select>
        <i class="bi bi-funnel"></i>
      </h3>
      <div className="size">
        <i
          class="bi bi-filetype-csv m-2"
          onClick={() => handleExportCSV(filteredItems)}></i>
        <i class="bi bi-file-pdf m-2" onClick={() => generatePdf(items)}></i>
        <i class="bi bi-printer m-2" onClick={handlePrint}></i>
      </div>
      <table className="items text-center">
        <thead>
          <tr>
            <th scope="col">index</th>
            <th scope="col">Delete</th>
            <th scope="col" onClick={() => handleSort("likes")}>
              <i
                className="bi bi-heart-fill text-danger "
                style={{ cursor: "pointer", fontSize: "18px" }}></i>
            </th>
            <th scope="col" onClick={() => handleSort("title")}>
              Title{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("subtitle")}>
              Subtitle{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("web")}>
              Website{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("email")}>
              Email{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("address.state")}>
              State{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("address.country")}>
              {" "}
              Country{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("address.city")}>
              City{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("address.street")}>
              Street{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col">HouseNumber</th>
            <th scope="col" onClick={() => handleSort("address.zip")}>
              Zip{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody className={`text-${reversedTheme}`}>
          {filteredItems.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <i
                  className="bi bi-trash"
                  onClick={() => handleDelete(item._id)}></i>
              </td>
              <td
                title={item.likedByUsers ? item.likedByUsers.join(", ") : ""}
                onMouseOver={() => console.log(item.likedByUsers)}>
                {item.likes.length}
              </td>
              <td>{item.title}</td>
              <td>
                {item.subtitle.length > 10
                  ? `${item.subtitle.slice(0, 10)}...`
                  : item.subtitle}
              </td>
              <td
                title={item.web}
                onClick={() => window.open("https://" + item.web)}>
                {item.web.length > 10
                  ? `${item.web.slice(0, 10)}...`
                  : item.web}
              </td>
              <td>{item.email}</td>
              <td>{item.address.state}</td>
              <td>{item.address.country}</td>
              <td>{item.address.city}</td>
              <td>{item.address.street}</td>
              <td>{item.address.houseNumber}</td>
              <td>{item.address.zip}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer></Footer>
    </div>
  );
}
export default ItemTable;
