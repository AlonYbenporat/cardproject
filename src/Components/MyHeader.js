import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


function Myheader(){
 const {theme} =useContext(ThemeContext)
    return(
        <div className={`text-bg-${theme} text-${theme === "light" ? "dark" : "light"}`}>
            <div className="text-center py-3"  > 
                  <h1 >The Best site for Buisness Attraction in Spain</h1>
                  <h2 className="py-3">Most popular and Recent Visited </h2>
            </div>
        </div>
    );
}
export default Myheader;