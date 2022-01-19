import React from "react";
import "./Homepage.css";
import Main from "../../components/Map/Testing.jsx";
import fb from "../../assets/footer/fb.png";
import web from "../../assets/footer/web.png";
import yt from "../../assets/footer/youtube.png";
import Logo from '../../assets/img/GroupamaLogo.png'
import twi from '../../assets/img/twitter.png'
function Homepage() {
  return (
    <div className="homepage">
      <div className="mainContent">
        <div className="photo"></div>
        <div className="photo2"></div>
        <div className="contentWrapper">
          <h1 className="mainTitle">BIENVENUE</h1>
          <h3 className="mainDescription">
            TROUVEZ UN CLUB PRÈS DE CHEZ VOUS !
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
          La Ligue Centre-Val de Loire de Football et son partenaire Groupama vous proposent cette plateforme afin de découvrir l'ensemble
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
          Cette plateforme est soutenue par Groupama
        </p>
        <img className="logoGroupama" src={Logo} alt="" />
        <div className="sponsoLinks">
          <a
            href="https://www.facebook.com/groupama"
            target="_blank"
            rel="noreferrer"
          >
            <img src={fb} alt="" className="LinkCA" />
          </a>

          <a
            href="https://www.youtube.com/channel/UCcVU-JnuCbANGOl4vGcGpEg"
            target="_blank"
            rel="noreferrer"
          >
            <img src={yt} alt="" className="LinkCA" />
          </a>

          <a
            href="https://www.groupama.fr/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={web} alt="" className="LinkCA" />
          </a>

          <a
            href="https://twitter.com/GroupeGroupama"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twi} alt="" className="LinkCA" />
          </a>
        </div>
      </div>
      <div className="footer"></div>
      <div className="footHeure">
        <div className="logos">
          <a
            href="https://www.facebook.com/groupama"
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
