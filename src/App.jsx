import "./App.css";
import { Switch, Route } from "react-router";
import Testing from './components/Map/Testing.jsx'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"  component={Testing}/>
      </Switch>
    </div>
  );
}

export default App;
