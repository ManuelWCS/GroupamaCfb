import React from "react";
import "./Filter.css";

function Filter() {
  return (
    <div className="fullFilter">
      <div className="form">
        <h1> Veuillez remplir ces champs :</h1>
      </div>

      <div className="form">
        <label htmlFor="Category"> Catégorie :</label>
        <select name="chooseCategory" id="select-category">
          <option value=""> Veuillez choisir</option>
          <option value="enfants">Enfants (entre 6 et 13 ans) </option>
          <option value="adolescents">
            Adolescents garçons (entre 13 et 18 ans){" "}
          </option>
          <option value="adolescentes">
            Adolescentes filles (entre 13 et 18 ans)
          </option>
          <option value="seniorH">Seniors Hommes (entre 18 et 35 ans)</option>
          <option value="seniorF">Seniors Femmes (entre 18 et 35 ans)</option>
          <option value="veteransH">Vétérans Hommes (35 ans et + )</option>
          <option value="veteransF">Vétérans Femmes (35 ans et + )</option>
        </select>
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
