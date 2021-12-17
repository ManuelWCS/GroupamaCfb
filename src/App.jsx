import "./App.css";
import { Switch, Route } from "react-router";
import Map from "./components/Mobile/Map.jsx"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Map} />
      </Switch>
    </div>
  );
}

export default App;
