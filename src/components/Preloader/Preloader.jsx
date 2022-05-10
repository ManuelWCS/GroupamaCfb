import React, { useEffect, useState } from "react";
import "./Preloader.css";
import LogoCFB from "../../assets/CompressedPictures/Logos/logo.png";
import background from "../../assets/CompressedPictures/Logos/BACKGROUND.png";
import { Link } from "react-router-dom";

function Preloader(props) {
  let limit = 541;

  const [counter, setCounter] = useState(0);

  function increment() {
    for (let i = 0; i < limit; i++) {
      if (counter < limit) {
        setTimeout(() => {
          setCounter(counter + 10);
        }, 1);
      } else {
        setCounter(limit);
      }
    }
  }
  // function thaht make the counter stops at the limit
  function stop() {
    setCounter(limit);
  }

  useEffect(() => {
    increment();
  }, [counter]);

  return (
    <div className="FullLanding">
      <div className="LandingTitlesContainer">
        <div className="BiggestTitle">
          <div className="firstLine">
            <img src={background} className="background" alt="background" />
            <h1 className="counterNumber">{counter}</h1>
            <h2 className="LandingTitle">CLUBS</h2>
          </div>
          <div className="secondLine">
            <h2 className="LandingTitle2">DE FOOTBALL</h2>
          </div>
          <div className="thirdLine">
            <h4 className="LandingTitle3"> EN RÉGION CENTRE VAL DE LOIRE </h4>
          </div>
        </div>
        <div className="SmallestTitle">

        </div>
        <div className="LinkContainer">
        <Link to="/trouvetonclub" >
          <button className="btnLink">
            <p className="btnContent">
            LOCALISEZ-MOI !

            </p>
          </button>

          </Link>

        </div>
        
        <div className="NavigationTitle">
          <h4 className="LandingTitle3"> TROUVEZ UN CLUB PRÈS DE CHEZ VOUS</h4>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
