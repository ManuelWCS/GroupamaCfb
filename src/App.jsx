import "./App.css";
import Clean from "./components/Clean/Clean.jsx";
// import Faq from "./components/FrequentlyAskedQuestions/FrequentlyAskedQuestions.jsx";
import { Routes, Route } from "react-router-dom";
import {useState, useEffect } from "react";
import Faq from "./components/FAQ/Faq";
import Preload from './components/Preloader/Preloader';

function App() {
  const [spinner, setSpinner] = useState(true);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 10000000);
  }, []);
  
  return (
    <>
      <div className="App">
        <Routes>
          {spinner === true ? 
          <Route path="/" element={<Preload/>}/> : 

          <Route path="/" element={<Clean/>} /> }
          {/* <Route path="/faq" element={<Faq/>} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
