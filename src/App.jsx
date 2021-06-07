import "./App.css";
import Header from "./components/header/Header";
import "./App.css";
import Home from "./components/Home/Home";
import Filter from "./components/filters/Filter";
import Loader from './components/loader/Loader';
import { Switch, Route } from 'react-router';
import Club from './components/Club/Club.jsx'
import Clubsfiltres from './Clubsfiltres.jsx'




function App() {
  return (
    <div className="App">
      

      
       <Switch>
         <Route exact path="/" component={Home}/>
         <Route path="/trouvetonclub" component={Club}/>
         <Route path="/clubsfiltres" component={Clubsfiltres}/>
       </Switch>
    </div>
  );
}

export default App;
