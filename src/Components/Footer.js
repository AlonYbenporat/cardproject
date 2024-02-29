import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Footer() {
  const { theme, reversedTheme } = useContext(ThemeContext);
  return (
    <footer className={`footer bg-${theme} text-${reversedTheme}`}>
      <div className="container text-center py-5">
        <span className="m-10">&copy; All rights reserved Alon Ben Porat</span>
      </div>
    </footer>
  );
}
export default Footer;
