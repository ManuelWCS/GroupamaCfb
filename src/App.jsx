import "./App.css";
import { Routes, Route } from "react-router-dom";
import Newheader from './components/Header2/Header2.jsx'
import Clean from './components/Clean/Clean.jsx';
import Faq from './components/FAQ/Faq.jsx'


function App() {
  return (
      <div className="App">
      <Newheader/>
    <Routes>
      <Route path="/" element={<Clean />} />
      <Route path="/faq" element={<Faq />}/>




    </Routes>
    </div>
  );
}

export default App;
