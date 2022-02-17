import "./App.css";
import Store from "./store";
import { Main } from "./components/common/Main";
import tennis from "./tennis.png";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={tennis} width="400" height="200" />
      </header>
      <Store>
        <div>Hello</div>
        <Main></Main>
      </Store>
    </div>
  );
}

export default App;
