import "./App.css";
import Router from "./Pages/Router";
import { ListProvider } from "./context/ListContext";
import MainWrapper from "./context/MainWraper";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <ListProvider>
          <MainWrapper>
            <Router> </Router>
          </MainWrapper>
        </ListProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
