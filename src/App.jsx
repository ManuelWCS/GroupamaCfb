import "./App.css";
import { Switch, Route } from "react-router";
import Map from "./components/Map/Map.jsx"
import Testing from './components/Map/Testing.jsx'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Map} />
        <Route path="/test" component={Testing}/>
      </Switch>
    </div>
  );
}

export default App;
