import React from "react";
import "./Filter.css";

function Filter() {
  return (
    <div className="fullFilter">
      <div className="form">
        <h1> Veuillez remplir ces champs :</h1>
      </div>

      <div className="form">
        <label htmlFor="Sexe"> Sexe :</label>
        <select name="chooseSex" id="sex-select">
          <option value=""> Veuillez choisir</option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
          <option value="non-précisé">Non-précisé</option>
        </select>
      </div>
      <div className="form">
        <label htmlFor="age"> Âge : </label>
        <input id="number" type="number" value="17 ans"></input>
      </div>
      <div className="form">
        <label htmlFor="ZIP"> Code Postal :</label>
        <input id="ZIP" type="text" value="45000"></input>
      </div>

      <div className="form">
          <button className="button"> TROUVER MON CLUB</button>

      </div>
    </div>
  );
}

export default Filter;
