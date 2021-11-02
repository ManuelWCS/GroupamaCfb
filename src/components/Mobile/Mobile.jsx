import React from "react";
import "./Mobile.css";
import Header from "../header/Header.jsx";
import Button from '../../assets/Boutons/buttontransparent.png'
import { useState, useEffect } from "react";
import axios from "axios";
import Howitworks from '../../assets/Boutons/howitworks.png';
import '../../assets/fonts/Nuvel.ttf';
import '../../assets/fonts/nuvel-webfont.woff'
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Searchbar from "../Searchbar/Searchbar";
import {
  MapContainer,
  Marker,
  Popup,
  Circle,
  TileLayer
} from "react-leaflet";
import Modal from './Modal';
import useGelocation from "../Hook/useGeolocation";
import MarqueurClub from '../../assets/LogoClub.png';
import MarqueurLigue from '../../assets/MarqueurLigue.png';





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
  const [countClose, setCountClose] = useState(0)

  const LigueMarqueur = L.icon({
    iconSize: [40,60],
    iconAnchor: [23.5 , 47],
    iconUrl : MarqueurLigue,
  })

  const ClubMarqueur = L.icon({
    iconSize: [50,50],
    iconAnchor: [23.5 , 47],
    iconUrl : MarqueurClub,
  })


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

  let countClubs = selectedClub.filter(function(Club) {
    return ( selectedClub.Latitude <= latMax && selectedClub.L >= latMin&& selectedClub.Longitude <= lngMax && selectedClub.Longitude >= lngMin )
  })

  useEffect(()=> {
    setCountClose(countClubs.length)
  }, [countClubs]
  )


  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/cities")
      .then((res) => setallCities(res.data))
  }, []);

  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/categories")
      .then((res) => setCategorie(res.data))
  }, [])

  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/allteams").then((res) => setallClubs(res.data))
  }, []);



  function findClub() {
    setselectedClub(
      allClubs.filter((allClubs) =>
        allClubs.Localite === `${cityInput}` &&
        allClubs.Category === `${categoryInput}`
      )
    )
  } 

  function pageRefresh() {
    window.location.reload();
  }
  let setMap = [47.830261, 1.93609];


  return (
    <div className="pageMobile">
    <Header />
        <div className="background">
      <div className="toolBar">
        <img src={Howitworks} className="btnImg" onClick={() => {
          setOpenModal(true)
        }}/>
        {openModal && <Modal closeModal={setOpenModal} />}

      </div>

      <div className="slideContainer">
        <input type="range" min="1" max="10" value="1" id="myRange" className="slider"/>
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
              <h2> Je suis ici </h2> 
              </Popup>
              </Marker> ) : null}

              <Marker position={[47.830261, 1.93609]} icon={LigueMarqueur}>

              </Marker>
         
          
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
                position={[selectedClubs.Latitude, selectedClubs.Longitude]} value={propKey} icon={ClubMarqueur}>
                <Popup className="popUp">
                  <h1 className="nameClub"> {selectedClubs.Adresse} </h1>
                </Popup>
              </Marker>
              
            )
          })}
          <Circle 
          center={setMap}
          radius={1000}/>
        </MarkerClusterGroup>
        </MapContainer>

      </div>
      {/* Fin div map  */}

      <div className="filtres">
        <div className="inputCity">
        <span className="titleInput">VOTRE VILLE </span>
        <Searchbar placeholder="" selection={(value)=>{
          setcityInput(value)
        }
 
        } 
        data={allCities} onChange={(e) => {
              setcityInput(e.target.value);
              
            }} />
        </div>
        <div className="cityFilter">
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
            <span className="titleInput">VOTRE CATEGORIE: </span>
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
                    <option className="selectText" key={categoryKey} value={categorie.name}> {categorie.name} </option>
                    )
                  })}
              </select>
            </form>

          </div>
          
        </div>

        <img className="buttonFind" src={Button} onClick={findClub}></img>
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
          <div className="footeur">
            <p>Ligue de Football du Centre-Val de Loire</p>
          </div>
    </div>
    // Fin de PageMobile
  );
}
export default Mobile;
