import React, { useEffect, useState } from "react";
import LogoCFB from "../../assets/CompressedPictures/Logos/logoplateforme.webp";
import background from "../../assets/CompressedPictures/Logos/BACKGROUND.webp";
import ecussonLigue from "../../assets/CompressedPictures/Logos/LogoLigue.webp";
import { Link } from "react-router-dom";


/* VERSIONS CSS */
import "./css/Preloader.css";
import "./css/Preloader.mobile.css";
import "./css/Preloader.tablet.css";
import "./css/Preloader.bigTablet.css";
import "./css/Preloader.desktop.css";
import "./css/Preloader.bigscreen.css";
import "./css/Preloader.bigdesktop.css";

function Preloader(props) {
  let limit = 541;

  const [counter, setCounter] = useState(0);

  function increment() {
    for (let i = 0; i < limit; i++) {
      if (counter < limit) {
        setTimeout(() => {
          setCounter(counter + 5);
        }, 1);
      } else {
        stop();
      }
    }
  }
  // function thaht make the counter stops at the limit
  function stop() {
    setCounter(limit);
  }

  useEffect(() => {
    increment();
  }, [counter, ]);

  return (
    <>
    <div className="generalWrapper">

        <div className="headerPreload">
          <Link to="/">
            <img src={ecussonLigue} className="headerLogo" alt="logo" />
          </Link>
        </div>
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
            <h4 className="LandingTitle4">
              {" "}
              TROUVEZ UN CLUB PRÈS DE CHEZ VOUS{" "}
            </h4>
          </div>
        </div>

        <div className="LinkContainer">
          <Link to="/trouvetonclub">
            <img
              src={LogoCFB}
              alt="logo Centre Frappe & But"
              className="LogoPlateforme"
            ></img>
          </Link>
          <Link to="/trouvetonclub">
            <button className="myButton">ACCÈDER</button>
          </Link>
        </div>
        <h4 className="LandingTitle5">
          {" "}
          Plateforme dévéloppée par la Ligue du Centre-Val de Loire de Football{" "}
        </h4>
      </div>
      </div>

    </>
  );
}

export default Preloader;
