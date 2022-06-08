import "./App.css";
import Clean from "./components/Clean/Clean.jsx";
import { Routes, Route } from "react-router-dom";



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
