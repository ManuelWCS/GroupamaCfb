import React from "react";
import '../Cards/Cards.css'
function CardClub(props) {
  return (
    <>
      <div
        className={props.label.length > 0 ? "cardResultLabel" : "cardResult"}
        id="cardClub"
      >
        <div className="titleCardContainer">
          <span className="titleCard">{props.NomClub}</span>
        </div>

        <div className="columnContainer">
          <div className="colunm1">
            <div className="logo1"></div>
            <div className="logo2"></div>
            <div className="logo3"></div>
          </div>

          <div className="column2">
            <div className="info1">
              <a
                href={`mailto:${props.Mail}?subject=[CFB] "Entrez l'objet de votre
                                demande "`}
                className="mail"
              >
                {props.Mail}{" "}
              </a>
            </div>
            <div className="info2">{props.AdressePostale}</div>
            <div className="info3">
              <a
                href={`https://foot-centre.fff.fr/recherche-clubs/?query-affil=${props.NumClub}`}
                target="_blank"
                rel="noreferrer"
              >
                Voir plus d'infos
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardClub;
