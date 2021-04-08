import React, { useState, useEffect } from "react";
import "./Loader.css";
import LogoLigue from "../../assets/logoLigue.png";
import user from "../../assets/userss.png";

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
        <picture>
          {" "}
          <img className="logo-loader" src={LogoLigue} alt="logoLCVL" />
        </picture>
        <h1 className="titles"> Trouvez votre équipe</h1>
        <h2 className="titles"> Près de chez vous</h2>
        <h3 className="titles">
          {" "}
          Remplissez les informations recquises et nous vous montrerons les
          clubs ainsi que les équipes près de chez vous !
        </h3>
        <div className="tuto">
          <div className="tuto1"></div>

          <div className="tuto2"></div>

          <div className="tuto3"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
