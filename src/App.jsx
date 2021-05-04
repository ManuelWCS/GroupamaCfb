import "./App.css";
import Header from "./components/header/Header";
import "./App.css";
import Home from "./components/Home/Home";
import Filter from "./components/filters/Filter";
import Loader from './components/loader/Loader';
function App() {
  return (
    <div className="App">
      <Header />
      <Filter/>
      <Loader/>

       <Home /> 
    </div>
  );
}

export default App;
