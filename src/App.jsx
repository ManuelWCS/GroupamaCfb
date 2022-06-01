import "./App.css";
import Clean from "./components/Clean/Clean.jsx";
// import Faq from "./components/FrequentlyAskedQuestions/FrequentlyAskedQuestions.jsx";
import { Routes, Route } from "react-router-dom";

import Preload from "./components/Preloader/Preloader";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Clean />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
