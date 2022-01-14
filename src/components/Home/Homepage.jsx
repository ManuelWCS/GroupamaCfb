import React from "react";
import "./Homepage.css";
import Header from "../header/Header.jsx";
import Main from "../../components/Map/Testing.jsx";
import fb from "../../assets/footer/fb.png";
import web from "../../assets/footer/web.png";
import yt from "../../assets/footer/youtube.png";
import logoCA from "../../assets/CA/logobigt.png";

function Homepage() {
  return (
    <div className="homepage">
      <div className="mainContent">
        <div className="photo"></div>
        <div className="photo2"></div>
        <div className="contentWrapper">
          <h1 className="mainTitle">BIENVENUE</h1>
          <h3 className="mainDescription">
            TROUVEZ UN CLUB PRES DE CHEZ VOUS !
          </h3>
        </div>{" "}
        {/* fin contentWrapper */}
      </div>{" "}
      {/* fin mainContent */}
      <div className="textContainer">
        <h2 className="secondTitle">
          {" "}
          541 CLUBS DE FOOTBALL EN RÉGION CENTRE-VAL DE LOIRE
        </h2>
        <h4 className="descriptionText">
          La Ligue Centre-Val de Loire de Football et son partenaire Crédit
          Agricole vous proposent cette plateforme afin de découvrir l'ensemble
          des clubs de notre Région !
        </h4>
      </div>
      {/* Fin div textes*/}
      <div className="yo">
        <h4 className="titleBanner"> À VOUS DE JOUER </h4>
      </div>
      <Main className="mapAndForm" />
      <div className="sponso">
        <p className="sponsoText">
          Cette plateforme est soutenue par le Crédit Agricole
        </p>
        <img className="logoCA" src={logoCA} alt="" />
        <div className="sponsoLinks">
          <a
            href="https://www.facebook.com/CreditAgricole"
            target="_blank"
            rel="noreferrer"
          >
            <img src={fb} alt="" className="LinkCA" />
          </a>

          <a
            href="https://www.youtube.com/c/Cr%C3%A9ditAgricoleM%C3%A9dia"
            target="_blank"
            rel="noreferrer"
          >
            <img src={yt} alt="" className="LinkCA" />
          </a>

          <a
            href="https://www.credit-agricole.fr/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={web} alt="" className="LinkCA" />
          </a>
        </div>
      </div>
      <div className="footer"></div>
      <div className="footHeure">
        <div className="logos">
          <a
            href="https://www.facebook.com/LCFofficiel/?ref=bookmarks"
            target="_blank"
            rel="noreferrer"
          >
            <img className="logos" alt="logo Facebook" src={fb} />
          </a>
        </div>

        <div className="logos">
          <a
            href="https://foot-centre.fff.fr/wp-content/uploads/sites/9/prehome/prehome/index.html"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="logos"
              alt="logo site Ligue Centre Val de Loire"
              src={web}
            />
          </a>
        </div>

        <div className="logos">
          <a
            href="https://www.youtube.com/channel/UCs6RtJ9tefoU0iRnTkNzD6Q"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="logos"
              alt="logo Youtube Ligue Centre-Val de Loire"
              src={yt}
            />
          </a>
        </div>
      </div>
    </div> // fin homepage
  );
}

export default Homepage;
