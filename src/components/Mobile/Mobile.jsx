import React from "react";
import "./Mobile.css";
import Header from "../header/Header.jsx";
import Button from '../../assets/Boutons/buttontransparent.png'
import { useState, useEffect, useRef } from "react";
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
  TileLayer,
  useMapEvents
} from "react-leaflet";
import Modal from './Modal';
import useGelocation from "../Hook/useGeolocation";
import MarqueurClub from '../../assets/LogoClub.png';
import MarqueurLigue from '../../assets/MarqueurLigue.png';
import MarqueurCher from '../../assets/Marqueurs/MarqueurCher.png';
import MarqueurEureEtLoir from '../../assets/Marqueurs/MarqueurEureEtLoire.png';
import MarqueurIndre from '../../assets/Marqueurs/MarqueurIndre.png';
import MarqueurLoiretCher from '../../assets/Marqueurs/MarqueurLoireEtCher.png';
import MarqueurLoiret from '../../assets/Marqueurloiret.png';
import MarqueurIndreEtLoire2 from '../../assets/Marqueurs/MarqueurIndreEtLoire.png';
import webLogo from '../../assets/footer/web.png';
import ytLogo from '../../assets/footer/youtube.png';
import fbLogo from '../../assets/footer/fb.png';
import ballon from '../../assets/Habillage/balloon.png'




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


  const LigueMarqueur = L.icon({
    iconSize: [40,50],
    iconAnchor: [13.5 , 47],
    iconUrl : MarqueurLigue,
  })

  const ClubMarqueur = L.icon({
    iconSize: [50,50],
    iconAnchor: [23.5 , 47],
    iconUrl : MarqueurClub,
  })

  const CherMarqueur = L.icon({
    iconSize: [50,50],
    iconAnchor: [13.50 , 47],
    iconUrl : MarqueurCher,
  })

  const EureEtLoirMarqueur = L.icon({
    iconSize: [50,50],
    iconAnchor: [13.50 , 47],
    iconUrl : MarqueurEureEtLoir
  })

  const IndreMarqueur = L.icon({
    iconSize: [40,50],
    iconAnchor: [13.50 , 47],
    iconUrl : MarqueurIndre
  })
  
  const LoirEtCherMarqueur = L.icon({
    iconSize: [40,50],
    iconAnchor: [13.50 , 47],
    iconUrl : MarqueurLoiretCher
  })

  const LoiretMarqueur = L.icon({
    iconSize: [60,50],
    iconAnchor: [13.50 , 47],
    iconUrl : MarqueurLoiret
  })
  const IndreEtLoireMarqueur = L.icon({
    iconSize: [60,50],
    iconAnchor: [13.50, 47],
    iconUrl : MarqueurIndreEtLoire2
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
        ))
      } 
      console.log(selectedClub)
      console.log(allClubs)

  function pageRefresh() {
    window.location.reload();
  }
    let setMap = [47.830261, 1.93609];

    
  


  

  
  return (
    <div className="pageMobile">
    <Header />
        <div className="background">
          <div className="mainTitle">
            <h1 className="mainTitle1">Trouvez un club près de chez <b className="typo">vous</b> !</h1>
          </div>
      <div className="toolBar">
        <img src={Howitworks} className="btnImg" onClick={() => {
          setOpenModal(true)
        }}/>
        {openModal && <Modal closeModal={setOpenModal} />}
      </div>
        <div className="mobile">

      <div className="map" >
        <MapContainer  doubleClickZoom={true} className="leaflet-container3" center={setMap} zoom={7} scrollWheelZoom={true} minZoom={5}  >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            />
        { location.loaded === true ? (
          <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
            <Popup> 
              <h2 className="myPosition"> Ma position </h2> 
              </Popup>
              <Circle 
          center={setMap}
          radius={10000}/>
              </Marker> ) : null}
              <Marker position={[47.830261, 1.93609]} icon={LigueMarqueur}>
              <Popup className="InstanceLigue">
            <a href="https://foot-centre.fff.fr//">
              <h3 >Ligue Centre-Val de Loire </h3>
            </a>
          </Popup>
              </Marker>
              <Marker position={[47.11563, 2.35849]} icon={CherMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://cher.fff.fr/">
              <h3>District de Football du Cher </h3>
            </a>
          </Popup>
        </Marker>
        <Marker position={[48.42918, 1.46021]} icon={EureEtLoirMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://eure-et-loir.fff.fr/">
              <h3>District de Football d'Eure Et Loire </h3>
            </a>
          </Popup>
        </Marker>
        <Marker position={[46.79267, 1.69726]} icon={IndreMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://indre.fff.fr/">
              <h3>District de Football de l'Indre </h3>
            </a>
          </Popup>
        </Marker>
        
        <Marker position={[47.9168433, 1.9246721]} icon={LoiretMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://foot-loiret.fff.fr/">
              <h3>District de Football du Loiret </h3>
            </a>
          </Popup>
        </Marker>
        <Marker position={[47.5766331, 1.3026806]} icon={LoirEtCherMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://loir-et-cher.fff.fr/">

            <h3>District de Football du Loir-et-Cher</h3>
            </a>
          </Popup>
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

          {selectedClub.map((selectedClubs, propKey )  => {
            return (
              <Marker
              position={[selectedClubs.Latitude, selectedClubs.Longitude]} value={propKey} icon={ClubMarqueur}>
                <Popup className="popUp">
                <h2 className="nameClub1"> {selectedClubs.Club}  </h2>
                  <h5 className="nameClub">  {selectedClubs.Adresse} </h5>
                </Popup>
              </Marker>
              
              )
            })}
        
        </MarkerClusterGroup>
        </MapContainer>
      </div>
      {/* Fin div map  */}
      <div className="filtres">

        <div className="inputCity">
        <div className="filtersImg">
          <img src={ballon}  alt="ballon.jpeg" className="filterLogos" />
        </div>
          <div className="desktop">

        <span className="titleInput">VOTRE VILLE </span>
        <Searchbar placeholder="" selection={(value)=>{
          setcityInput(value)
        }} 
        data={allCities} onChange={(e) => {
          setcityInput(e.target.value);
          
        }} />
        </div>
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
          <div className="filtersImg">
          <img src={ballon}  alt="ballon.jpeg" className="filterLogos" />

          </div>
          <div className="desktop">
            

            <span className="titleInput2">VOTRE CATEGORIE: </span>
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
        </div>
        <img className="buttonFind" src={Button} onClick={findClub} ></img>
      </div> 
       </div>
     <div className={ !selectedClub ? 'searchResults' : 'hidden'}>
        <h4>
          Les équipes près de </h4>
          <h2> <em className="red"> {cityInput} </em></h2>   
          <h4> avec la catégorie :</h4>
        <h2> <strong className="blue"> {categoryInput}</strong> :
        </h2>
      </div> 
     <div className="results" >
        {selectedClub.map((selectedClub, index) =>
        (
          <div className="cardClub" id="scroll"  >
            <div >
              <div className="cardInfo">
              <h2 className="clubTypo">
              {selectedClub.Club}
                </h2> 
                <div className="contact" >
                  
                    <div className="secondRow">
                    <img className="cardImages2"/> 
                    <span className="spane"> <a className="mail" href={`mailto:${selectedClub.Mail}?subject=[CFB] "Entrez l'objet de votre demande "`}> {selectedClub.Mail}</a></span>
                 
                    </div>
                    <div className="thirdRow">
                      <div className="locLogo"/> 
                      <span className="locInfo"> {selectedClub.Adresse} </span>
                      </div>
                      <div className="moreInfo">
                        <div className="infoLogo">                
                        </div>
                        <a href={`https://foot-centre.fff.fr/recherche-clubs/?query=${selectedClub.Localite}`}> <span className="moreInfoclub"> Voir plus d'informations</span></a>
                      </div>
                  </div>
                  </div>
              </div>
          </div>

))}
      </div> 
          </div>


      <div className="footeur">
        <div>
          <a href="https://foot-centre.fff.fr/wp-content/uploads/sites/9/prehome/prehome/index.html">
            <img className="logosFooter" src={webLogo} /></a></div>
          
       
        <div className="testibg">
          <a href="https://www.youtube.com/channel/UCs6RtJ9tefoU0iRnTkNzD6Q">
            <img className="logosFooter" src={ytLogo} />
          </a></div>
        <div>
          <a href="https://www.facebook.com/LCFofficiel/?ref=bookmarks"><img className="logosFooter" src={fbLogo} />  </a> </div>

</div>  



    </div>
    // Fin de PageMobile
  );
}
export default Mobile;
