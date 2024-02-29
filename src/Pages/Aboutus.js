import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Communication from "../Components/communication";

function AboutUs() {
  const { theme, reversedTheme } = useContext(ThemeContext);
  return (
    <>
      <NavBar></NavBar>
      <div className={`text-bg-${theme} text-${reversedTheme}`}>
        <div className="text py-3">
          <h1 className="text-center">About Us</h1>
          <div className="container-md">
            <h2 className="py-3 text-center">
              we offer you to see and add Business cards to our site, be a part
              of amazing spain attraction and helps to share there experiences
            </h2>
          </div>
        </div>
      </div>
      <div class={`row position-center p-4 bg-${theme}`}>
        <div class="col-sm-4 m-4 p-4">
          <div className={`card-center bg-${theme}`}>
            <div class="card-body">
              <h3 class={`card-title text-center text-${reversedTheme}`}>
                Spain Is a Dream Destination For Travelers
              </h3>
              <p class={`card-text text-${reversedTheme} lead`}>
                You can find the soul of Spain in tourist experiences like
                these, which represent the country's rich history, fascinating
                culture, and enchanting natural beauty. From the bustling street
                life of La Rambla in Barcelona and Plaza Mayor in Madrid to the
                forest of columns and Moorish arches disappearing into the
                silent expanse of Cordoba's Great Mosque, Spain exudes a vibrant
                energy and a captivating blend of past and present. And if you
                get off the main tourist routes and venture into less
                tourist-oriented towns, you'll be pleasantly surprised by what
                you find. Plan your sightseeing and find interesting things to
                do with our list of the top attractions in Spain.
              </p>
              <img
                className="img-fluid"
                src="https://i.ibb.co/RYNny4N/Toledo-Skyline.jpg"
                alt="Toledo_sky"></img>
            </div>
          </div>
        </div>
        <div class="col-sm-4 m-4 p-4">
          <div class="card-center">
            <div class="card-body">
              <h3 class={`card-title text-${reversedTheme} mb-3`}>
                You can find us Here:
                <i class="bi bi-arrow-down-right-circle"></i>
              </h3>
              <div className="google-map-code ">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.5428404108097!2d-3.6943295405732743!3d40.41897725562121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287d6da3df33%3A0xe119406d894c5d21!2zQy5HcmFuIFbDrWEsIENlbnRybywgTWFkcmlkLCDXodek16jXkw!5e0!3m2!1siw!2sil!4v1703509427440!5m2!1siw!2sil"
                  width="800"
                  height="720"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
                <Communication></Communication>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
export default AboutUs;
