import "./App.css";
import { Switch, Route } from "react-router";
import Testing from "./components/Map/Testing.jsx";
import Homepage from "./components/Home/Homepage.jsx";
import Newheader from './components/Header2/Header2.jsx'
import New from './components/New/New.jsx'

function App() {
  return (
    <div className="App">
      <Newheader/>    
      <Homepage/>  
    </div>
  );
}

export default App;
