import "./App.css";
import "./App.css";
import { Switch, Route } from 'react-router';
import Mobile from './components/Mobile/Mobile.jsx'



function App() {
  return (
    <div className="App">
             <Switch>
            <Route exact path="/" component={Mobile}/> 
       </Switch>
    </div>
  );
}

export default App;
