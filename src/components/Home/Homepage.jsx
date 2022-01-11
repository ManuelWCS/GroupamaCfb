import React from "react";
import "./Homepage.css";
import Header from "../header/Header.jsx";
import Main from "../../components/Map/Testing.jsx";

function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <div className="mainContent">
        <div className="photo"></div>
        <div className="contentWrapper">
          <h1 className="mainTitle">BIENVENUE</h1>
          <h3 className="mainDescription">
            TROUVEZ UN CLUB PRES DE CHEZ VOUS !
          </h3>
        </div>{" "}
        {/* fin contentWrapper */}
      </div>
      {/* fin mainContent */}
      <div className="textContainer">
        <h2 className="secondTitle">
          {" "}
          541 CLUBS DE FOOTBALL EN RÉGION CENTRE-VAL DE LOIRE
        </h2>
        <h4 className="descriptionText">
          La Ligue Centre-Val de Loire de Football et son partenaire Crédit
          Mutuel vous proposent cette plateforme pour vous donner accès aux
          nombreux clubs de football implantés dans notre région
        </h4>
      </div>{" "}
      {/* Fin div textes*/}
      <div className="yo">
        <h4 className="titleBanner"> A VOUS DE JOUER </h4>

        <a href="https://relaxed-banach-2aac18.netlify.app/"> LIEN</a>
      </div>
    </div> // fin homepage
  );
}

export default Homepage;
