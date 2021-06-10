import React from "react";
import Header from "../header/Header.jsx";
import "./Club.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import homebtn from "../../assets/Boutons/home.png";
import { Link } from "react-router-dom";
import LogoClub from "../../assets/Marqueurs/SelectedClub.png";
import L from "leaflet";
import logomail from "../../assets/Boutons/contact.png";
import geologo from "../../assets/PopUp/localisation.png";
import maillogo from "../../assets/PopUp/mail.png";
import ballon from "../../assets/Habillage/balloon.png";
import '../Home/Home.css'

function Club() {
  const [villeclub, setVilleClub] = useState([]);
  const [ville, setVille] = useState([]);
  const [category, setCategory] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [club, setClub] = useState([]);
  const [clubChoisi, setClubChoisi] = useState([]);

  const markerClub = L.icon({
    iconSize: [50, 50],
    iconAnchor: [23.5, 47],
    iconUrl: LogoClub,
  });

  useEffect(() => {
    axios
      .get("https://api-clubs-cvl.herokuapp.com/cities")
      .then((res) => setVilleClub(res.data));
  }, []);
  console.log(villeclub);
  console.log(SelectedCategory);
  console.log(ville);

  useEffect(() => {
    axios
      .get("https://api-clubs-cvl.herokuapp.com/allteams")
      .then((res) => setClub(res.data));
  }, []);
  console.log(club);

  useEffect(() => {
    axios
      .get("https://api-clubs-cvl.herokuapp.com/categories")
      .then((res) => setCategory(res.data));
  }, []);
  console.log(category);

  function refreshPage() {
    window.location.reload();
  }

  function testFct() {
    setClubChoisi(
      club.filter(
        (clubs) =>
          clubs.Localite === `${ville}` &&
          clubs.Category === `${SelectedCategory}`
      )
    );
    console.log(clubChoisi);
    console.log(SelectedCategory);
  }

  return (
    <div className="fullClub">
      <Header />
      <div className="Filtres">
        <div className="categoryFilter">
          <select
            name="chooseCategory"
            id="select-category"
            className="selector"
            placeholder="Choisir categorie"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            {category.map((categorie, key) => {
              return (
                <option key={key} value={categorie.name}>
                  {categorie.name}{" "}
                </option>
              );
            })}
          </select>

          <form onSubmit={refreshPage} className="selectCity">
            <select
              className="selector2"
              onChange={(e) => {
                setVille(e.target.value);
              }}
            >
              {villeclub.map((villeclub, key) => {
                return (
                  <option key={key} value={villeclub.name}>
                    {" "}
                    {villeclub.name}{" "}
                  </option>
                );
              })}
            </select>
          </form>
        </div>

        <div className="buttons">
          <Link to="/">
            <img className="homebtn" src={homebtn} alt="acceuil" />
          </Link>
          <button className="buttonClub" onClick={testFct}>
            Test
          </button>
        </div>
      </div>

      <h1 className="filtresTitle">
        Les équipes près de <span className="red">{ville} </span>pour la
        <br></br> catégorie <span className="blue"> {SelectedCategory} </span>
      </h1>
      <div className="resultsAndMap">
        <div className="results">
          {club
            .filter(
              (club) =>
                club.Localite === `${ville}` &&
                club.Category === `${SelectedCategory}`
            )
            .map((clubs, index) => (
              <div
                className="resultsDiv"
                className="resultsDivMobile"
                key={index}
              >
                <div className="box">
                  <h1 className="titleCard">{clubs.Equipe}</h1>
                  <div className="cardImgTxt">
                    <img src={geologo} className="iconsClubs" />
                    <h3 className="cardDescription"> {clubs.Adresse}</h3>
                  </div>
                  <div className="cardImgTxt">
                    <img src={maillogo} className="iconsClubs" />
                    <h3 className="cardDescription">{clubs.Mail}</h3>{" "}
                  </div>
                  <div className="cardImgTxt">
                    <img src={ballon} className="iconsClubs" />
                    <h3 className="cardDescription">{clubs.Category}</h3>{" "}
                  </div>
                  
                  <div className="contact">
                    <img src={logomail} className="iconContact" />{" "}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="Map">
          <MapContainer
            center={[47.830261, 1.93609]}
            zoom={6}
            className="leaflet-container2"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[47.830261, 1.93609]}>
              <Popup className="LiguePopUp">
                <h1>Ligue Centre Val de Loire </h1>
              </Popup>
            </Marker>

            {clubChoisi.map((clubsChoisis, index) => {
              return (
                <Marker
                  position={[clubsChoisis.Latitude, clubsChoisis.Longitude]}
                  icon={markerClub}
                >
                  <Popup className="clubPopUp">
                    <h1 className="NameClub">{clubsChoisis.Adresse}</h1>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Club;
