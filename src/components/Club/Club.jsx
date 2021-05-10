import React from "react";
import Header from "../header/Header.jsx";
import "./Club.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";

function Club() {
  const [equipe, setEquipe] = useState([]);
  const [ville, setVille] = useState([]);
  const [category, setCategory] = useState([]);
  const [club, setClub] = useState([]);
  const [filteredCityClub, setfilteredCityClub] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/villes")
      .then((res) => setEquipe(res.data));
  }, []);
  console.log(equipe);
  console.log(category);
  console.log(ville);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/equipes")
      .then((res) => setClub(res.data));
  }, []);
  console.log(club);
  console.log(filteredCityClub);

  function refreshPage() {
    window.location.reload();

    const position = [51.505, -0.09];
  }

  return (
    <div className="fullClub">
      <Header/>
      <div className="Filtres">
        <div className="categoryFilter">
          <label htmlFor="Category"> Catégorie :</label>
          <select
            name="chooseCategory"
            id="select-category"
            placeholder="Choisir categorie"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
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

        <form onSubmit={refreshPage}>
          <label htmlFor="City"> Votre ville :</label>
          <select
            onChange={(e) => {
              setVille(e.target.value);
            }}
          >
            {equipe.map((equipes, key) => {
              return (
                <option key={key} value={equipes.Localite}>
                  {" "}
                  {equipes.Localite}{" "}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <h1>
        Les équipes près de {ville} pour la catégorie {category}{" "}
      </h1>

      <div className="results">
        {club
          .filter((clubs) => clubs.Localite === `${ville}`)
          .map((clubs) => (
            <div className="resultsDiv">
              <h3 className="titleCard">Club : {clubs.NomChampionnat} </h3>
              <br></br>
              <h3>Equipe : {clubs.NomEquipe}</h3>
              <h3>
                {" "}
                Ville du club : {clubs.Localite} {clubs.Lat} {clubs.Longitude}{" "}
              </h3>
              <h3> Adresse du club : {clubs.AdressePostale} </h3>
              <h3>Nom de l'équipe : {clubs.NomEquipe} </h3>
              <h3>
                Mail et personne à contacter{clubs.MailClub} {clubs.Civilite}{" "}
                {clubs.Nom} {clubs.Prenom}{" "}
              </h3>{" "}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Club;
