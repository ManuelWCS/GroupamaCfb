import "./App.css";
import Clean from "./components/Clean/Clean.jsx";
import Faq from "./components/FrequentlyAskedQuestions/FrequentlyAskedQuestions.jsx";
import { Routes, Route } from "react-router-dom";
import Empty from './components/Empty/Empty.jsx'

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Clean/>} />
          <Route path="/empty" element={<Empty/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
