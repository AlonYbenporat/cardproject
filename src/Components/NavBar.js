import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Button, Dropdown} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListContext } from '../context/ListContext';
import HandleRegistration from "./HandleRegistration";
import HandleLogin from "./HandleLogin";
import EditUserDetails from "./EditUserDetails";
import '../Style/cards.css';



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
  
   useEffect(() => {
    const loggedInValue = localStorage.getItem("isLoggedin");
    const businessValue = localStorage.getItem("isBusiness");
    const isAdminValue = localStorage.getItem("isAdmin");
    setIsLoggedIn(loggedInValue === "true");
    setIsBusiness(businessValue === "true");
    setIsAdmin(isAdminValue === "true");
    const userData = JSON.parse(localStorage.getItem("userProp51"));
    console.log('firstame from Userdata ', userData)
    if (userData) {
      setUserName(`${userData.name.first}-${userData.name.last}`); 
    }
  }, [isAdmin,isBusiness]);
 
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsBusiness(localStorage.getItem("isBusiness") === "true"); 
  };

   const handleLogout = () => {
     alert("Thank you for your Visit our SIte, come Back soon!  ")
     localStorage.clear();
      setIsLoggedIn(false);
      setIsBusiness(false);
      setIsAdmin(false);
      navigate("/")
   }
  const handleAddItemsClick = () => {
    navigate("/AddItems");
  };

  const HandleEditUserDetails =  () => {
    console.log("handleEditUserDetails called");
    setShowEditUserModal(true); 
    console.log("showEditUserModal:", showEditUserModal);
  };
 

  return (
    <nav className={`navbar navbar-expand-sm navbar-${theme}`} style={{ backgroundColor: theme === 'dark' ? '#1C2833' : '#12121dc6' }}>
      <div className="collapse navbar-collapse">
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {isLoggedIn ? userFirstName : "My Profile"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {isLoggedIn ? (
            <>
             {isAdmin &&(
            <>
            <Dropdown.Item onClick ={() => navigate("/UsersTable")} >Users Mangment</Dropdown.Item>
           <Dropdown.Item onClick ={() => navigate("/ItemTable")} >Card items Mangment </Dropdown.Item>
           </>
          )}  {isBusiness && (
              <Dropdown.Item onClick={handleAddItemsClick}>AddCard</Dropdown.Item>
          )}
              <Dropdown.Item onClick={()=> navigate("/MyCards")}>My cards</Dropdown.Item>
              <Dropdown.Item onClick={()=> navigate("/MyLikes")}>My Favorite</Dropdown.Item>
              <Dropdown.Item onClick={HandleEditUserDetails}>Edit UserDetails</Dropdown.Item>
              <Dropdown.Item className="active" onClick={handleLogout}>Logout</Dropdown.Item>
            </>
          ) : (
            <>
              <Dropdown.Item onClick={() => setShowLoginModal(true)}>Login</Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Button
              className="primary m-3"
              onClick={() => {
                setSelectedItem(null);
                navigate("/");
              }}
            >
              <i className="bi bi-house m-3 "></i>Home
            </Button>
          </li>
       
          <li className="m-3">
            <HandleRegistration></HandleRegistration>
          </li>
          <li className="nav-item active">
            <Button
              className="primary m-3"
              onClick={() => {
                navigate("/AboutUs");
              }}
            >
              <i className="bi bi-map m-3"></i>About Us
            </Button>
          </li>   
        </ul>
      </div>

      <img src="images/spain-flag-background.jpg" alt="spain-flag" className="icon-image" style={{ width: '100px', height: '40px', margin: '15px' }}></img>
      <div className="form-check form-switch">
        <input
          type="checkbox"
          id="cbToggleDisplay"
          className="form-check-input"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <label
          className={`form-check-label text-${theme === "dark" ? reversedTheme : theme} text-capitalize`}
          htmlFor="cbToggleDisplay"
        >
          {theme}
          {theme === "dark" ? (
            <i className="bi bi-moon-fill m-1"></i>
          ) : (
            <i className={`bi bi-brightness-high m-1 text-${reversedTheme}`}></i>
          )}
        </label>
      </div>
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
