import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
function Sitemap() {
  const { theme, reversedTheme } = useContext(ThemeContext);

  return (
    <div className={`bg-${theme}`}>
      <NavBar></NavBar>
      <div className={`container py-4 bg-${theme}`}>
        <h3 className={`card-title text-center text-${reversedTheme}`}>
          Site Map
        </h3>
        <div className={`card bg-${theme} text-${reversedTheme}`}>
          <div className="card-body">
            <p>
              <strong>Home Page:</strong>
            </p>
            <ul>
              <li>View all cards of all users.</li>
              <li>Zoom in to see detailed card information.</li>
            </ul>
            <p>
              <strong>Registration:</strong>
            </p>
            <ul>
              <li>
                <strong>Standard User Registration:</strong>
                <ul>
                  <li>Save liked cards and view them in your favorites.</li>
                  <li>Edit your user details.</li>
                  <li>Toggle between dark and light site themes.</li>
                  <li>Zoom in to view card details.</li>
                </ul>
              </li>
              <li>
                <strong>
                  Business User Registration (In addition to standard user
                  features):
                </strong>
                <ul>
                  <li>Add cards to the site.</li>
                  <li>Edit your own cards.</li>
                  <li>Track the number of likes received on your cards.</li>
                </ul>
              </li>
            </ul>
            <p>
              <strong>Navigation:</strong>
            </p>
            <ul>
              <li>
                Navigate between different pages such as Home, About Us, My
                Cards, My Favorites, etc.
              </li>
            </ul>
            <p>
              <strong>Pages:</strong>
            </p>
            <ul>
              <li>
                <strong>About Us:</strong>
                <ul>
                  <li>Information about the website and its purpose.</li>
                </ul>
              </li>
              <li>
                <strong>My Cards:</strong>
                <ul>
                  <li>View all cards uploaded by the user.</li>
                  <li>Edit card details.</li>
                </ul>
              </li>
              <li>
                <strong>My Favorites:</strong>
                <ul>
                  <li>View all cards marked as favorites by the user.</li>
                  <li>Edit card details.</li>
                </ul>
              </li>
            </ul>
            <p>
              <strong>Site-wide Features:</strong>
            </p>
            <ul>
              <li>Dark and light theme toggle accessible from any page.</li>
              <li>
                Zoom functionality for detailed card viewing available
                site-wide.
              </li>
            </ul>
            <li>
              <strong>Admin Access:</strong>
              <ul>
                <li>
                  Grant admin users access to users and item tables to manage
                  and view details.
                </li>
              </ul>
            </li>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Sitemap;
