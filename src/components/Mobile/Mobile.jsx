import React from "react";
import "./Mobile.css";
import Header from "../header/Header.jsx";
import Button from '../../assets/Boutons/buttontransparent.png'
import { useState, render, useEffect } from "react";
import axios from "axios";
import Howitworks from '../../assets/Boutons/howitworks.png';
import pin from '../../assets/PopUp/localisation.png';
import mail from '../../assets/PopUp/mail.png';
import '../../assets/fonts/Nuvel.ttf';
import '../../assets/fonts/nuvel-webfont.woff'
import MarkerClusterGroup from "react-leaflet-markercluster";
import Searchbar from "../Searchbar/Searchbar";



import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Circle,
  useMapEvents,
} from "react-leaflet";
import Modal from './Modal';
import useGelocation from "../Hook/useGeolocation";



function Mobile() {

  const [openModal, setOpenModal] = useState(false);
  const [allCities, setallCities] = useState([]);
  const [cityInput, setcityInput] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [categoryInput, setcategoryInput] = useState([]);
  const [allClubs, setallClubs] = useState([]);
  const [selectedClub, setselectedClub] = useState([]);
  const location = useGelocation();
  const [latMin, setLatMin] = useState(0);
  const [latMax, setLatMax] = useState(0);
  const [lngMin, setLngMin] = useState(0);
  const [lngMax, setLngMax] = useState(0);


  useEffect(() => {
    if (location.loaded === true) {
      setLatMin(location.coordinates.lat - 0.180227);
      setLatMax(location.coordinates.lat + 0.180227);
      setLngMin(location.coordinates.lng - 0.246349);
      setLngMax(location.coordinates.lng + 0.246349);
   
    } else {
      setLatMin(0);
      setLatMin(0);
      setLngMin(0);
      setLngMax(0);
    }
    console.log(location)
  }, [location] 
  );


  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/cities")
      .then((res) => setallCities(res.data))
  }, []);
  console.log(allCities)
  console.log(cityInput)

  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/categories")
      .then((res) => setCategorie(res.data))
  }, [])
  console.log(categorie)
  console.log(categoryInput)

  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/allteams").then((res) => setallClubs(res.data))
  }, []);

  console.log(allClubs)


  function findClub() {
    setselectedClub(
      allClubs.filter((allClubs) =>
        allClubs.Localite === `${cityInput}` &&
        allClubs.Category === `${categoryInput}`
      )
    )
  } console.log(selectedClub)

  function pageRefresh() {
    window.location.reload();
  }




  let setMap = [47.830261, 1.93609];





  return (
    <div className="pageMobile">
      <Header />
      <div className="toolBar">

        <img src={Howitworks} className="btnImg" onClick={() => {
          setOpenModal(true)
        }}/>
        {openModal && <Modal closeModal={setOpenModal} />}

      </div>
      <div className="map">
        <MapContainer className="leaflet-container3" center={setMap} zoom={9} scrollWheelZoom={true} minZoom={5}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

        { location.loaded === true ? (
          <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
            <Popup> 
              <h2>je suis al</h2>
              </Popup>
              </Marker> ) : null}
         
          
              <MarkerClusterGroup
              animate={true}
          onClusterClick={(cluster) =>
            console.warn(
              "cluster-click",
              cluster,
              cluster.layer.getAllChildMarkers()
            )
          }
        >
          {selectedClub.map((selectedClubs, propKey) => {
            return (
              <Marker
                position={[selectedClubs.Latitude, selectedClubs.Longitude]} value={propKey}>
                <Popup className="popUp">
                  <h1 className="nameClub"> {selectedClubs.Adresse} </h1>
                </Popup>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
        </MapContainer>

      </div>
      {/* Fin div map  */}

      <div className="filtres">
        <Searchbar placeholder="" merguez={(value)=>{
          setcityInput(value)
        }
 
        } 
        data={allCities} onChange={(e) => {
              setcityInput(e.target.value);
            }} />
        <div className="cityFilter">
          <span>VOTRE VILLE/CODE POSTAL </span>
{/* 
          
          <select
            className="citySelector"
            name="city" id=""
            placeholder="Votre Ville"
            onChange={(e) => {
              setcityInput(e.target.value);
            }}>
            <option value="" disabled selected hidden>Choisir</option>
            {allCities.map((allCities, key) => {
              return (
                <option key={key} value={allCities.name}> {allCities.name}</option>
              )
            })}
          </select> */}

        </div>
        <div className="categoriesFilter">

          <div className="categoryFilter">
            <span className="inputTitle">VOTRE CATEGORIE: </span>
            <form onSubmit={pageRefresh} className="categoryForm">
              <select
                className="categorieSelector"
                name="categorie"
                placeholder="Votre catégorie"
                onChange={(e) => {
                  setcategoryInput(e.target.value);
                }}>
                <option value="" disabled selected hidden>Choisir</option>

                {categorie.map((categorie, categoryKey) => {
                  return (
                    <option key={categoryKey} value={categorie.name}> {categorie.name}</option>
                  )
                })}
              </select>
            </form>

          </div>
        </div>

        <img className="button" src={Button} onClick={findClub}></img>
      </div>
 
      <div className={cityInput && categoryInput ? 'searchResults' : 'hidden'}>
        <h4>
          Les équipes près de </h4>
          <h2> <em className="red"> {cityInput} </em></h2>   
          <h4> avec la catégorie :</h4>
        <h2> <strong className="blue"> {categoryInput}</strong> :
        </h2>

      </div>  


      <div className="results">
        {selectedClub.map((selectedClub, index) =>
        (
          <div className="cardClub">
            <div>
              <div className="cardInfo">
              <h2 className="clubTypo">
              {selectedClub.Club}
                </h2> 
                <div className="contact">
                  <div className="firstRow">
                    <div className="test">

                  <img className="cardImages"/> 
                    </div>
                  <span className="spane"> {selectedClub.Adresse}</span>
                    </div>
                    <div className="secondRow">
                      <div className="test">

                    <img className="cardImages2"/> 
                      </div>
                    <span className="spane"> <a className="mail" href={`mailto:${selectedClub.Mail}?subject=[CFB] "Entrez l'objet de votre demande "`}> {selectedClub.Mail}</a></span>
                    </div>

                  </div>
                  </div>

              </div>
          </div>

        ))}
      </div>

    </div>
    // Fin de PageMobile
  );
}
export default Mobile;
