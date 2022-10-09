import "./App.css";
import Store from "./store";
import { Main } from "./components/common/Main";
import tennis from "./tennis.png";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={tennis} width="400" height="200" alt="banner" />
        </header>
        <Store>
          <Main />
        </Store>
      </div>
    </BrowserRouter>
  );
}

export default App;
