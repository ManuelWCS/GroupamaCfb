import "./App.css";
import "./App.css";
import { Switch, Route } from 'react-router';
import Mobile from './components/Mobile/Mobile.jsx'
import SomeComponent from "./components/Testing/Test";



function App() {
  return (
    <div className="App">
             <Switch>
            <Route exact path="/" component={Mobile}/> 
            <Route path="/test" component={SomeComponent}/>
       </Switch>
    </div>
  );
}

export default App;
