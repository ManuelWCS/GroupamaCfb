import React from "react";
import "./Clean.css";
import "../../components/Map/fonts.css";

function Clean() {
  return (
    <div className="BlocTel">
      <div className="BlocPresentation">
        <div className="mainPicture"></div>
        <h1 className="mainTitle">BIENVENUE</h1>
        <h3 className="mainDescription">TROUVEZ UN CLUB PRÈS DE CHEZ VOUS !</h3>
      </div>{" "}
      {/* Fin BlocPresentation*/}
      <div className="BlocTexte">
        <div className="textContainer">
          <h2 className="secondTitle">
            {" "}
            541 CLUBS DE FOOTBALL EN RÉGION CENTRE-VAL DE LOIRE
          </h2>
          <h4 className="descriptionText">
            La Ligue Centre-Val de Loire de Football et son partenaire Groupama
            vous proposent cette plateforme afin de découvrir l'ensemble des
            clubs de notre Région !
          </h4>
        </div>{" "}
        {/* Fin textContainer*/}
      </div>
      {/* Fin BlocPresentation*/}
      <div className="BlocBanniere">
        <h4 className="titleBanner"> À VOUS DE JOUER </h4>
      </div>{" "}
      {/* Fin BlocBanniere*/}
    </div>
  );
}

export default Clean;
