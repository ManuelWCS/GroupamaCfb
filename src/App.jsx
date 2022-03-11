import "./App.css";
import Clean from "./components/Clean/Clean.jsx";
import Faq from "./components/FrequentlyAskedQuestions/FrequentlyAskedQuestions.jsx";
import { Routes, Route } from "react-router-dom";
import Tempo from './components/Tempo/Tempo.jsx'

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Clean/>} />
          <Route path="/faq" element={<Faq/>} />
          {/* <Route path='/faq' element={<Tempo/>}/> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
