import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function MainWrapper({ children }) {
  const theme = useContext(ThemeContext);
  return (
    <div className={`container-fluid bg-${theme}`}>
      <div className="row">
        <div className="col">{children}</div>
      </div>
    </div>
  );
}

export default MainWrapper;
