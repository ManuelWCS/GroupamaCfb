import React from "react";
import "./Filter.css";
import Button from '../../assets/button.png';
import { Link } from 'react-router-dom';

function Filter() {
  return (
    <div className="fullFilter">
      <div className="filterTitle">
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
        <Link to="/trouvetonclub">  <img classname="button" src={Button}>
          
          </img> </Link>
       
      </div>

      
    </div>
  );
}

export default Filter;
