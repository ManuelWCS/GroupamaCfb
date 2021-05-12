import React from "react";
import Header from "../header/Header.jsx";
import "./Club.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer, Circle } from "react-leaflet";

function Club() {
  const [equipe, setEquipe] = useState([]);
  const [ville, setVille] = useState([]);
  const [category, setCategory] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [club, setClub] = useState([]);
  const [clubChoisi, setClubChoisi] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/villes")
      .then((res) => setEquipe(res.data));
  }, []);
  console.log(equipe);
  console.log(SelectedCategory);
  console.log(ville);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/equipes")
      .then((res) => setClub(res.data));
  }, []);
  console.log(club);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/category")
      .then((res) => setCategory(res.data));
  }, []);
  console.log(category);
 

  function refreshPage() {
    window.location.reload();
  }

  function testFct() {
    setClubChoisi(club.filter((clubs) => clubs.Localite === `${ville}` && clubs.Category === `${SelectedCategory}`));
    console.log(clubChoisi);
  }


  return (
    <div className="fullClub">
      <Header />
      <div className="Filtres">
        <div className="categoryFilter">
          <label htmlFor="Category"> Catégorie :</label>
          <select
            name="chooseCategory"
            id="select-category"
            placeholder="Choisir categorie"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            {category.map((categorie, key) => {
              return (
                <option key={key} value={categorie.Category}>
                  {categorie.Category}{" "}
                </option>
              );
            })}
          </select>

          <form onSubmit={refreshPage} className="selectCity">
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
          <button onClick={testFct}>Test</button>
        </div>
      </div>

      <h1 className="filtresTitle">
        Les équipes près de <span className="red">{ville} </span>pour la
        catégorie <span className="blue"> </span>
      </h1>

      <div className="results">
        {club
          .filter((clubs) => clubs.Localite === `${ville}` && clubs.Category === `${SelectedCategory}`)
          .map((clubs, index) => (
            <div
              className="resultsDiv"
              className="resultsDivMobile"
              key={index}
            >
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
              <h3>
                CATEGORIE {clubs.Category}
              </h3>{" "}
            </div>
          ))}
      </div>

      <div className="Map">
        <MapContainer
          center={[47.830261, 1.93609]}
          zoom={8}
          className="leaflet-container2"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[47.830261, 1.93609]}>
            <Popup className="LiguePopUp">
              <a href="https://service-clubs.foot-centre.fr/">
                <img className="logoLigue" />
                <h1>Ligue Centre Val de Loire </h1>
                <h2> </h2>
              </a>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Club;
