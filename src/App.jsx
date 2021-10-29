import "./App.css";
import "./App.css";
import Home from "./components/Home/Home";
import { Switch, Route } from 'react-router';
import Club from './components/Club/Club.jsx'
import Clubsfiltres from './Clubsfiltres.jsx'
import LocationMarker from './components/Mobile/Mobile.jsx'



function App() {
  return (
    <div className="App">
      

      
       <Switch>
         <Route exact path="/" component={Home}/>
         <Route path="/trouvetonclub" component={Club}/>
         <Route path="/clubsfiltres" component={Clubsfiltres}/>
         <Route path="/mobile" component={LocationMarker}/> 
       </Switch>
    </div>
  );
}

export default App;
