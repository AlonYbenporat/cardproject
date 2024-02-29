import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Myheader from "../Components/MyHeader";
import FetchMyItems from "../Components/FetchMyItems";

function HomePage() {
  const { theme, reversedTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}></NavBar>
      <div className={`bg-${theme}`}>
        <Myheader />
        <div className="container">
          <div className="row">
            <FetchMyItems></FetchMyItems>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default HomePage;
