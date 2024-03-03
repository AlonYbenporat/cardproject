import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListContext } from "../context/ListContext";
import HandleRegistration from "./HandleRegistration";
import HandleLogin from "./HandleLogin";
import EditUserDetails from "./EditUserDetails";
import "../Style/cards.css";
import "bootstrap/dist/js/bootstrap.bundle";

function NavBar() {
  const { theme, toggleTheme, reversedTheme } = useContext(ThemeContext);
  const [userFirstName, setUserName] = useState("");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { setSelectedItem } = useContext(ListContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState(null);

  useEffect(() => {
    const loggedInValue = localStorage.getItem("isLoggedin");
    const businessValue = localStorage.getItem("isBusiness");
    const isAdminValue = localStorage.getItem("isAdmin");
    setIsLoggedIn(loggedInValue === "true");
    setIsBusiness(businessValue === "true");
    setIsAdmin(isAdminValue === "true");
    const userData = JSON.parse(localStorage.getItem("userProp51"));
    if (userData) {
      setUserName(`${userData.name.first}-${userData.name.last}`);
    }
  }, [isAdmin, isBusiness]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsBusiness(localStorage.getItem("isBusiness") === "true");
  };

  const handleLogout = () => {
    alert("Thank you for your Visit our SIte, come Back soon!  ");
    localStorage.clear();
    setIsLoggedIn(false);
    setIsBusiness(false);
    setIsAdmin(false);
    navigate("/");
  };
  const handleAddItemsClick = () => {
    navigate("/AddItems");
  };

  const HandleEditUserDetails = () => {
    setShowEditUserModal(true);
  };
  const handleDropdownItemMouseOver = (itemName) => {
    setActiveDropdownItem(itemName);
  };

  return (
    <nav className={`navbar navbar-expand-sm`}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="m-3">
              <Dropdown>
                <Dropdown.Toggle className="active" id="dropdown-basic">
                  {isLoggedIn ? userFirstName : "Menu"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {isLoggedIn ? (
                    <>
                      {isAdmin && (
                        <>
                          <Dropdown.Item
                            onMouseOver={() =>
                              handleDropdownItemMouseOver("Users Management")
                            }
                            onClick={() => navigate("/UsersTable")}
                            className={
                              activeDropdownItem === "Users Management"
                                ? "active"
                                : ""
                            }>
                            Users Management
                          </Dropdown.Item>
                          <Dropdown.Item
                            onMouseOver={() =>
                              handleDropdownItemMouseOver(
                                "Card Items Management"
                              )
                            }
                            onClick={() => navigate("/ItemTable")}
                            className={
                              activeDropdownItem === "Card Items Management"
                                ? "active"
                                : ""
                            }>
                            Card Items Management
                          </Dropdown.Item>
                        </>
                      )}
                      {isBusiness && (
                        <Dropdown.Item
                          onMouseOver={() =>
                            handleDropdownItemMouseOver("Add Card")
                          }
                          onClick={handleAddItemsClick}
                          className={
                            activeDropdownItem === "Add Card" ? "active" : ""
                          }>
                          Add Card
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        onMouseOver={() =>
                          handleDropdownItemMouseOver("My Cards")
                        }
                        onClick={() => navigate("/MyCards")}
                        className={
                          activeDropdownItem === "My Cards" ? "active" : ""
                        }>
                        My Cards
                      </Dropdown.Item>
                      <Dropdown.Item
                        onMouseOver={() =>
                          handleDropdownItemMouseOver("My Favorite")
                        }
                        onClick={() => navigate("/MyLikes")}
                        className={
                          activeDropdownItem === "My Favorite" ? "active" : ""
                        }>
                        My Favorite
                      </Dropdown.Item>
                      <Dropdown.Item
                        onMouseOver={() =>
                          handleDropdownItemMouseOver("Edit User Details")
                        }
                        onClick={HandleEditUserDetails}
                        className={
                          activeDropdownItem === "Edit User Details"
                            ? "active"
                            : ""
                        }>
                        Edit User Details
                      </Dropdown.Item>
                      <Dropdown.Item
                        onMouseOver={() =>
                          handleDropdownItemMouseOver("Logout")
                        }
                        onClick={handleLogout}
                        className={
                          activeDropdownItem === "Logout" ? "active" : ""
                        }>
                        Logout
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item
                        onMouseOver={() => handleDropdownItemMouseOver("Login")}
                        onClick={() => setShowLoginModal(true)}
                        className={
                          activeDropdownItem === "Login" ? "active" : ""
                        }>
                        Login
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <button
                className="btn m-3"
                onClick={() => {
                  setSelectedItem(null);
                  navigate("/");
                }}>
                Home
              </button>
            </li>
            <li className="nav-item m-3">
              <HandleRegistration></HandleRegistration>
            </li>
            <li className="nav-item m-3">
              <button
                className="btn"
                onClick={() => {
                  navigate("/AboutUs");
                }}>
                About
              </button>
            </li>
            <li className="nav-item m-3">
              <button
                className="btn"
                onClick={() => {
                  navigate("/siteMap");
                }}>
                Site Map
              </button>
            </li>
          </ul>

          <div className="form-check form-switch">
            <label
              className={`form-check-label text-${
                theme === "dark" ? reversedTheme : theme
              } text-capitalize`}
              onClick={toggleTheme}>
              {theme === "dark" ? (
                <i className="bi bi-moon-fill moon-icon m-4"></i>
              ) : (
                <i className={`bi bi-brightness-high-fill sun-icon m-4`}></i>
              )}
            </label>
          </div>
        </div>
      </div>
      <img
        src="images/spain-flag-background.jpg"
        alt="spain-flag"
        className="icon-image"
        style={{ width: "80px", height: "30px", margin: "15px" }}></img>

      <HandleLogin
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}></HandleLogin>
      <EditUserDetails
        show={showEditUserModal}
        onClose={() => setShowEditUserModal(false)}
      />
    </nav>
  );
}
export default NavBar;
