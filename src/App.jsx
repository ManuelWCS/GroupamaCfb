import "./App.css";
import { Switch, Route } from 'react-router';
// import Mobile2 from './components/Mobile/Mobile2.jsx'
// import Mobile from './components/Mobile/Mobile.jsx'



function App() {
  return (
    <div className="App">
             <Switch>
            <Route exact path="/" component={Mobile}/> 
             {/* <Route path="/mobile2" component={Mobile2}/>  */}
       </Switch>
    </div>
  );
}

export default App;
