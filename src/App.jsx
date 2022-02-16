import "./App.css";
import { Switch, Route } from "react-router";
import Newheader from './components/Header2/Header2.jsx'
import Clean from './components/Clean/Clean.jsx';


function App() {
  return (
    <div className="App">
      <Newheader/>
      <Clean/>
    
    </div>
  );
}

export default App;
