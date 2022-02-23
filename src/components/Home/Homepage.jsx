import React from "react";
import "./Homepage.css";
import Main from "../../components/Map/Testing.jsx";


function Homepage() {
  return (
    <div className="homepage">
      <div className="mainContent">
        <div className="photo"></div>
        <div className="photo2"></div>
          <h1 className="mainTitle">BIENVENUE</h1>
          <h3 className="mainDescription">
            TROUVEZ UN CLUB PRÈS DE CHEZ VOUS !
          </h3>
        {/* fin contentWrapper */}
      </div>{" "}
      {/* fin mainContent */}
      <div className="textContainer">
        <h2 className="secondTitle">
          {" "}
          541 CLUBS DE FOOTBALL EN RÉGION CENTRE-VAL DE LOIRE
        </h2>
        <h4 className="descriptionText">
          La Ligue Centre-Val de Loire de Football et son partenaire Groupama vous proposent cette plateforme afin de découvrir l'ensemble
          des clubs de notre Région !
        </h4>
      </div>
      {/* Fin div textes*/}
      <div className="yo">
        <h4 className="titleBanner"> À VOUS DE JOUER </h4>
      </div>
      <Main className="mapAndForm" />

    </div> // fin homepage
  );
}

export default Homepage;
