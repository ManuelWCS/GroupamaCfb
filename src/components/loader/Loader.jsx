import React, { useState, useEffect } from "react";
import "./Loader.css";
import LogoLigue from "../../assets/logoLigue.png";
import user from "../../assets/userss.png";
import loader from "../../assets/web.png"

function Loader() {
  const [page, setPage] = useState([]);

  useEffect(() => {
    setPage(document.getElementsByClassName("total"));
  }, []);

  const showPage = () => {
    page[0].style.display = "none";
  };

  return (
    <div onClick={showPage} className="total">
      <div className="total-part">
        <img className="tutoLoader" src={loader}/>
        
      
      </div>
    </div>
  );
}

export default Loader;
