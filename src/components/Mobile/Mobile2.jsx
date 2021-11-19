import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Header from "../header/Header";
import "./Mobile2.css";
import popupBtn from "../../assets/Boutons/howitworks.png";
import webLogo2 from "../../assets/footer/web.png";
import ytLogo from "../../assets/footer/youtube.png";
import fbLogo from "../../assets/footer/fb.png";
import Searchbar from "../Searchbar/Searchbar.js";
import axios from "axios";
import buttonImg from '../../assets/Boutons/buttontransparent.png'


export function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);
  L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius + 1000);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Vous êtes ici <br />
      </Popup>
    </Marker>
  );
}




export default function Leaflet() {
  const [gender, setGender] = useState("");
  const [ageEntered, setageEntered] = useState();
  const [isValid, setisValid] = useState(false);
  const [cities, setCities] = useState([]);
  const [category, setCategory] = useState([]);
  const [citySelected, setcitySelected] = useState([]);
  const [allclubs, setallClubs] = useState([]);
  const [categorySelected, setcategorySelected] = useState([]);


  const [propertyFiltered, setPropertyFiltered] = useState({
    ageEntered: null,
    citySelected: "ORLEANS",
    type: 'Libre',
    gender: null,
    category: "libre",
  })

  const filteringClub = () => {
    let categorie = category.filter(
      (cat) =>
      (propertyFiltered.gender === cat.gender
        && propertyFiltered.ageEntered >= cat.minAge
        && propertyFiltered.ageEntered <= cat.maxAge &&
        propertyFiltered.type === cat.type))

    const clubFiltered = allclubs.filter((item) => item.Category === categorie[0].name &&
      item.Localite === propertyFiltered.citySelected);
    // console.log(clubFiltered)
    // console.log(categorie)
    // console.log(propertyFiltered)
    // console.log(citySelected)
  }

  const oneChange = (e) => {
    setPropertyFiltered({ ...propertyFiltered, [e.target.name]: e.target.value })
  }



  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/cities")
      .then((res) => setCities(res.data))
  }, []);
  // console.log(cities)

  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/categories")
      .then((res) => setCategory(res.data))
  }, [])
  // console.log(category)

  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/allteams").then((res) => setallClubs(res.data))
  }, [])
  // console.log(allclubs)

  return (
    <div className="fullContent">
      <Header />
      <div className="content">
        <div className="mainTitleDiv">
          <h1 className="mainTitle">Trouvez un club près </h1>
          <h1 className="mainTitle">
            {" "}
            de chez <b className="strong">vous</b> !
          </h1>
        </div>

        <div className="popupContainer">
          <img className="popUp" src={popupBtn}></img>
        </div>

        <div className="mobileContent">
          <div className="mapContent">
            <MapContainer
              className="leafletContainer4"
              center={[48.856614, 2.3522219]}
              zoom={13}
              scrollWheelZoom
              style={{ height: "100vh" }}
              doubleClickZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
            </MapContainer>
          </div>

          <div className="filters">
            <div className="filtersWrapper">
              <div className="agefilterContainer">
                <span className="ageTitle"> VOTRE AGE</span>
                <input
                  name="ageEntered"
                  id="ageInput"
                  className="ageInput"
                  // onChange={(e) => {
                  //   setageEntered(e.target.value);
                  // }}
                  onChange={(e) => { oneChange(e) }}
                  type="number"
                  min="0"
                  max="99"
                  maxLength={2}
                  placeholder="Votre age ici "
                ></input>
              </div>

              <div className="genderContainer">
                <span className="genderTitle">COMPETITION :</span>
                <div className="genderWrapper" >
                  <label className="genderChoice" htmlFor="man">
                    Masculine
                    <input
                      name="gender"
                      type="checkbox"
                      value="Male"
                      // onClick={() => setGender("Male")}
                      onClick={(e) => { oneChange(e) }}
                      id="checkboxMale"
                      className="checkboxes"


                    />
                  </label>

                  <label className="genderChoice" htmlFor="woman">
                    Féminine
                    <input
                      name="gender"
                      type="checkbox"
                      value="Female"
                      id="checkboxFemale"
                      onChange={(e) => { oneChange(e) }}
                      className="checkboxes"

                    />
                  </label>
                </div>
              </div>

              <div className="categoryContainer">
                <span className="categoryTitle">CATEGORIE :</span>
                <div className="categoryWrapper">
                  <span className="categorySelected"> {categorySelected} à {citySelected}</span>
                </div>
              </div>

              <div className="searchbarContainer">
                <span className="searchbarTitle"> VOTRE VILLE </span>
                <Searchbar placeholder="Rechercher" name="citySelected"
                  selection={(value) => {
                    setcitySelected(value)
                  }}
                  data={cities}

                />
              </div>

              <div className="buttonContainer">
                <button className="trigger">

                  <img className="btnClub" src={buttonImg} onClick={() => filteringClub()} />

                </button>
              </div>

            </div>
            <div className="resultats">
              hello je suis les résultats
              <div className="cardClub" id="scroll">
                <div className="cardInfo">
                  <h2 className="clubTypo"></h2>
                  <div className="contact">
                    <div className="secondRow">
                      <img src="" alt="" className="cardImages2" />
                      <span className="spane">
                        <a href="" className="mail"></a>
                      </span>

                    </div>
                    <div className="thirdRow">
                      <div className="locLogo" />
                      <span className="locInfo"></span>

                    </div>
                    <div className="moreInfo">
                      <div className="infoLogo">
                      </div>
                      <a href="">
                        <span className="moreInfoclub"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>





          </div>
          {/* // Fin de la div qui englobe tout 'background' */}
        </div>
      </div>

    </div>
  );
}