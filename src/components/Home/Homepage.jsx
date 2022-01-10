import React from "react";
import "./Homepage.css";
import Header from "../header/Header.jsx";
import photo from "../../assets/img/accueil2.png";

function Homepage() {
  return (
    <div>
      <Header />
      <div className="hero">
        <img className="photo" />
        <div className="content">
          <h1 className="wow">BIENVENUE</h1>
          <h2 className="wow2">TROUVEZ UN CLUB PRES DE CHEZ VOUS !</h2>
          
        </div>
      </div>
    </div>
  );
}

export default Homepage;
