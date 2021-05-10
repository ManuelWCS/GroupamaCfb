import React, { useState, useEffect } from "react";
import "./Loader.css";

import IntroVideo from '../../assets/CFBVideo.mp4'

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
        {/* <img className="tutoLoader" src={loader}/> */}
        <video className="tutoLoader"  autoPlay={true}>
          <source src={IntroVideo}
          type="video/mp4">
            

          </source>
        </video>
        
      
      </div>
    </div>
  );
}

export default Loader;
