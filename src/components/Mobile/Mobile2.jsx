import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Header from "../header/Header";
import "./Mobile2.css";
import popupBtn from "../../assets/Boutons/howitworks.png";
import axios from "axios";
import buttonImg from '../../assets/Boutons/buttontransparent.png'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import svg from './fond.svg'
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'react-leaflet-markercluster/dist/styles.min.css';




export function GeoLoc() {
  const [position, setPosition] = useState(null);


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

    });
  }, [map]);



  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Vous êtes ici <br />
      </Popup>
    </Marker>)

}


export default function Leaflet() {

  const [cities, setCities] = useState([]);
  const [category, setCategory] = useState([]);
  const [allclubs, setallClubs] = useState([]);
  const [clubFiltered, setClubFiltered] = useState([]);
  const [propertyFiltered, setPropertyFiltered] = useState({
    ageEntered: null,
    citySelected: "",
    type: 'Libre',
    gender: '',
    category: "",
  })

  const filteringClub = (e) => {
    e.preventDefault();
    let categorie = category.filter(
      (cat) =>
      (propertyFiltered.gender === cat.gender
        && propertyFiltered.ageEntered >= cat.minAge
        && propertyFiltered.ageEntered <= cat.maxAge &&
        propertyFiltered.type === cat.type))

    console.log(categorie)

    const result = allclubs.filter((item) => item.Category === categorie[0].name && item.Localite === propertyFiltered.citySelected);

    setClubFiltered(result);
    console.log(result)
  }

  const oneChange = (e) => {
    setPropertyFiltered({ ...propertyFiltered, [e.target.name]: e.target.value })
  }



  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/cities")
      .then((res) => {
        let result = [];
        res.data.forEach(element => {
          result.push({ label: element.name })
        });
        setCities(result)
      })
  }, []);

  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/categories")
      .then((res) => setCategory(res.data))
  }, [])

  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/allteams").then((res) => setallClubs(res.data))
  }, [])

  return (
    <div className="fullContent">
      <div className="content">

        <Header />

        <div className="mainTitleDiv">
          <h1 className="mainTitle">Trouvez un club près </h1>
          <h1 className="mainTitle">
            {" "}
            de chez <b className="strong">vous</b> !
          </h1>
        </div>

        <div className="popupContainer">
          <img className="popUp" alt="Bouton comment ça marche" src={popupBtn}></img>
        </div>

        <div className="mobileContent">
          <div className="mapContent">
            <MapContainer
              className="leafletContainer4"
              center={[48.856614, 2.3522219]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "100vh" }}
              doubleClickZoom={true}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GeoLoc />


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
                {clubFiltered.length !== 0 ?
                  clubFiltered.slice(0, 100).map((res, index) => {
                    return (
                      <Marker key={index} position={[res.Latitude, res.Longitude]} >
                        <Popup>
                          test
                        </Popup>
                      </Marker>)
                  })
                  : null
                }

              </MarkerClusterGroup>






            </MapContainer>
          </div>

          <div className="filters">
            <form className="filtersWrapper" onSubmit={(e) => filteringClub(e)}>
              <div className="agefilterContainer">
                <span className="ageTitle"> VOTRE AGE</span>


                <TextField label="Âge" type="number" margin="normal" name="age" helperText='Renseingez votre aĝe ici' focused inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', placeholder: 'Tapez votre âge ici' }} onChange={(e) => { oneChange(e) }}
                />
              </div>

              <div className="genderContainer">
                {/* <span className="genderTitle">COMPETITION :</span> */}
                <div className="" >
                  <FormControl component="fieldset">
                    <span className="genderTitle">COMPETITION :</span>
                    <RadioGroup
                      row
                      aria-label="gender"
                      defaultValue="female"
                      name="gender"
                      onChange={(e) => oneChange(e)}
                      error="Vous devez renseigner une compétition" required={true}
                    >
                      <FormControlLabel value="Male" control={<Radio />} label="Masculine" />
                      <FormControlLabel value="Female" control={<Radio />} label="Feminine" />

                    </RadioGroup>
                  </FormControl>

                </div>
              </div>



              <div className="searchbarContainer">
                <span className="searchbarTitle"> VOTRE VILLE </span>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  inputValue={propertyFiltered.citySelected}
                  options={cities}
                  onInputChange={(event, newInputValue) => {
                    setPropertyFiltered({ ...propertyFiltered, citySelected: newInputValue });
                  }}
                  sx={{ width: 250 }}
                  renderInput={(params) =>
                    <TextField {...params} label="Rechercher" />
                  }
                />
              </div>

              <div className="buttonContainer">
                <button className="trigger" type="submit">
                  <img className="btnClub" alt="bouton trouve ton club" src={buttonImg} />
                </button>
              </div>

            </form>
            <div className="resultats">

              {clubFiltered.length !== 0 ?
                clubFiltered.map((clubCible, index) => {
                  return (
                    <div className="cardClub" id="scroll" key={index}>
                      <div className="cardInfo">
                        <h2 content="title of club" className="clubTypo"> {clubCible.Club}</h2>
                        <div className="contact">
                          <div className="secondRow">
                            <img src="" alt="" className="cardImages2" />
                            <span className="spane">
                              <a title="envoyerMailClub" content="mail-contact" href={`mailto:${clubCible.Mail}?subject=[CFB] "Entrez l'objet de votre demande "`} className="mail">{clubCible.Mail}</a>
                            </span>

                          </div>
                          <div className="thirdRow">
                            <div className="locLogo" />
                            <span className="locInfo"> {clubCible.Adresse}</span>

                          </div>
                          <div className="moreInfo">
                            <div className="infoLogo">
                            </div>
                            <a href={`https://foot-centre.fff.fr/recherche-clubs/?query=${clubCible.Localite}`}>
                              <span className="moreInfoclub"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>)

                })
                : null
              }
            </div>
          </div>
          {/* // Fin de la div qui englobe tout 'background' */}
        </div>
      </div>

    </div>
  );
}