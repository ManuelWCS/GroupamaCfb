import "./App.css";
import Header from "./components/header/Header";
import "./App.css";
import Home from "./components/Home/Home";
import Filter from "./components/filters/Filter";
import Test from "./components/TEST/Test";

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      <Home />
    </div>
  );
}

export default App;
