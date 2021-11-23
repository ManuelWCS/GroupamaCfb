import "./App.css";
import { Switch, Route } from 'react-router';
// import Mobile2 from './components/Mobile/Mobile2.jsx'
import Mobile from './components/Mobile/Mobile.jsx'
// import Mobile3 from './components/Mobile/Mobile3.jsx'



function App() {
  return (
    <div className="App">
             <Switch>
            <Route exact path="/" component={Mobile}/> 
             {/* <Route exact path="/" component={Mobile2}/>  */}
             {/* <Route exact path="/" component={Mobile3}/> */}
       </Switch>
    </div>
  );
}

export default App;
