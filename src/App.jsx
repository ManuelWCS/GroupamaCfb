import "./App.css";
import { Switch, Route } from "react-router";
import Mobile3 from "./components/Mobile/Mobile3.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Mobile3} />
      </Switch>
    </div>
  );
}

export default App;
