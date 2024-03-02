import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import NavBar from "../Components/NavBar";
import { BaseUrlusers } from "../Service/ConstantsApi";
import "../Style/cards.css";
import {
  generateUsersPdf,
  handleExportCSV,
  handlePrint,
} from "../HelperFunctions/tableUtils";
import Footer from "../Components/Footer";

function UserTable() {
  const [users, setUsers] = useState([]);
  const { theme, reversedTheme } = useContext(ThemeContext);
  const storedToken = localStorage.getItem("token");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const totalAdmins = users.filter((users) => users.isAdmin).length;
  const totalBusinessUsers = users.filter((users) => users.isBusiness).length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrlusers}`, {
          headers: {
            "x-auth-token": storedToken,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (userId) => {
    try {
      const response = await axios.get(`${BaseUrlusers}${userId}`, {
        headers: {
          "x-auth-token": storedToken,
        },
      });
      const userData = response.data;
      userData.isBusiness = !userData.isBusiness;
      const updateResponse = await axios.patch(
        `${BaseUrlusers}${userId}`,
        userData,
        {
          headers: {
            "x-auth-token": storedToken,
          },
        }
      );
      if (updateResponse.status === 200) {
        const updatedUserData = updateResponse.data;
        const businessStatus = updatedUserData.isBusiness
          ? "Business"
          : "Regular";
        alert(
          `User "${updatedUserData.name.first} ${updatedUserData.name.last}" is now ${businessStatus}`
        );
        fetchUserData();
      } else {
        const updatedUserData = updateResponse.data;
        alert(
          `Failed to edit Buisness status to ${updatedUserData.name.first} ${updatedUserData.name.last}. Please try again later.`
        );
      }
    } catch (error) {
      console.error("Error editing user:", error);
      alert(
        "An error occurred while editing Buisness user status. Please try again later."
      );
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.get(`${BaseUrlusers}${userId}`, {
        headers: {
          "x-auth-token": storedToken,
        },
      });
      const { name } = response.data;
      const confirmDelete = window.confirm(
        `Are you sure you want to delete ${name.first} ${name.last}?`
      );
      if (!confirmDelete) {
        return;
      }
      await axios.delete(`${BaseUrlusers}${userId}`, {
        headers: {
          "x-auth-token": storedToken,
        },
      });
      const updatedItems = items.filter((item) => item._id !== userId);
      setItems(updatedItems);
      fetchUserData(storedToken);
    } catch (error) {
      console.error("Error deleting user:", error);
      if (
        error.response &&
        error.response.data === "Could not delete admin user"
      ) {
        alert(`Delete Admin user is Forbidden!!!`);
      } else {
        alert(
          "An error occurred while deleting user. Please try again later or contact support."
        );
      }
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${BaseUrlusers}`, {
        headers: {
          "x-auth-token": storedToken,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSort = (key) => {
    const sorted = [...users].sort((a, b) => {
      const valueA = key.split(".").reduce((obj, k) => obj[k], a);
      const valueB = key.split(".").reduce((obj, k) => obj[k], b);

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    setUsers(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const filteredUsers = users.filter((user) => {
    for (const key in user) {
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        if (
          typeof user[key] === "string" &&
          user[key].toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return true;
        }
      }
    }
    return false;
  });

  return (
    <div className={`bg-${theme} text-${reversedTheme}`}>
      <NavBar></NavBar>
      <h1>Users Managment</h1>

      <div className="m-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder=" Search by Name, Email or Address."
          className="form-control"
        />
      </div>
      <h3>Users: {users.length}</h3>
      <h3>Admins: {totalAdmins}</h3>
      <h3>Business Users: {totalBusinessUsers}</h3>
      <div className="size">
        <i
          className="bi bi-filetype-csv m-2"
          onClick={() => handleExportCSV(filteredUsers)}></i>
        <i
          className="bi bi-file-pdf m-2"
          onClick={() => generateUsersPdf(filteredUsers)}></i>
        <i className="bi bi-printer m-2" onClick={handlePrint}></i>
      </div>
      <table className="items text-center">
        <thead>
          <tr>
            <th>index</th>
            <th scope="col" onClick={() => handleSort("name.first")}>
              Name{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("phone")}>
              Phone{" "}
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
              Address{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("isAdmin")}>
              Admin Role{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("createdAt")}>
              createdAt{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-numeric-down"></i>
              ) : (
                <i className="bi bi-sort-numeric-up"></i>
              )}
            </th>
            <th>ID</th>
            <th scope="col" onClick={() => handleSort("isBusiness")}>
              Buisness Status{" "}
              {sortDirection === "asc" ? (
                <i className="bi bi-sort-down"></i>
              ) : (
                <i className="bi bi-sort-up"></i>
              )}
            </th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{`${user.name.first} ${user.name.middle} ${user.name.last}`}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{`${user.address.state}, ${user.address.country} ${user.address.city}, ${user.address.street} ${user.address.houseNumber},${user.address.zip}`}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>{new Date(user.createdAt).toLocaleDateString("en-GB")}</td>

              <td>{user._id}</td>
              <td>
                <input
                  type="checkbox"
                  id={`cbToggleDisplay-${user._id}`}
                  checked={user.isBusiness}
                  className="form-check-input"
                  onChange={() => handleEdit(user._id)}
                />
              </td>
              <td>
                <i
                  className=" sizetrash bi bi-trash"
                  onClick={() => handleDelete(user._id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer></Footer>
    </div>
  );
}
export default UserTable;
