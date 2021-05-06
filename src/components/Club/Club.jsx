import React from "react";
import Header from "../header/Header.jsx";
import "./Club.css";
import { useEffect, useState } from "react";
import axios from "axios";


function Club() {
  const [equipe, setEquipe] = useState([]);
  const [ville, setVille] =useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/villes")
      .then((res) => setEquipe(res.data));
  }, []);
  console.log(equipe);
  console.log(category)

  return (
    <div className="fullClub">
      <Header />

      <div className="Filtres">
          <div className="categoryFilter">
        <label htmlFor="Category"> Catégorie :</label>
        <select name="chooseCategory" id="select-category" placeholder="Choisir categorie" onChange={(e) => { setCategory(e.target.value)}}>
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

        <select onChange={(e) => { setVille(e.target.value)}}>
          {equipe.map((equipes, key) => {
            return (
              <option key={key} value={equipes.Localite}>
                {" "}
                {equipes.Localite}{" "}
              </option>
            );
          })}
        </select>

        <div className="results">
            <h1>Les équipes près de {ville} pour la catégorie {category} </h1>
        
        </div>
      </div>
    </div>
  );
}

export default Club;
