import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Header from "../header/Header";
import "./Mobile2.css";
import popupBtn from "../../assets/Boutons/howitworks.png";
import webLogo2 from "../../assets/footer/web.png";
import ytLogo from "../../assets/footer/youtube.png";
import fbLogo from "../../assets/footer/fb.png";
// import Searchbar from "../Searchbar/Searchbar.js";
import axios from "axios";
import buttonImg from '../../assets/Boutons/buttontransparent.png'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';



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
    citySelected: "",
    type: 'Libre',
    gender: '',
    category: "",
  })

  console.log(propertyFiltered)

  const filteringClub = (e) => {
    e.preventDefault();
    let categorie = category.filter(
      (cat) =>
      (propertyFiltered.gender === cat.gender
        && propertyFiltered.ageEntered >= cat.minAge
        && propertyFiltered.ageEntered <= cat.maxAge &&
        propertyFiltered.type === cat.type))

        console.log(categorie)

    const clubFiltered = allclubs.filter((item) => item.Category === categorie[0].name &&
      item.Localite === propertyFiltered.citySelected);

      console.log(clubFiltered)

      const mapper = () => {
        clubFiltered.map((x, index) => {
          return (
            <li> {x.name}</li>
            
          )
          console.log(x)
        })
      }
         
  }

  const oneChange = (e) => {
    setPropertyFiltered({ ...propertyFiltered, [e.target.name]: e.target.value })
  }



  useEffect(() => {
    axios.get("https://api-clubs-cvl.herokuapp.com/cities")
      .then((res) => {
        let result = [];
        res.data.forEach(element => {
          result.push({label:element.name})
        });
        setCities(result)
      })
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
            <form className="filtersWrapper" onSubmit={(e) => filteringClub(e)}>
              <div className="agefilterContainer">
                <span className="ageTitle"> VOTRE AGE</span>
                {/* <input
                required
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
                ></input> */}

                
                <TextField label="Âge"  type="number"margin="normal" name="ageEntered" helperText='Renseingez votre aĝe ici' focused inputProps={{inputMode: 'numeric', pattern: '[0-9]*', placeholder: 'Tapez votre âge ici'} } onChange={(e) => {oneChange(e)}} 
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
                    onChange={(e)=>oneChange(e)}
                    error="Vous devez renseigner une compétition"  required={true}
                  >
                    <FormControlLabel  value="Male" control={<Radio />} label="Masculine" />
                    <FormControlLabel value="Female" control={<Radio />} label="Feminine" />
                    {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                  </RadioGroup>
                </FormControl>
                  {/* <label className="genderChoice" htmlFor="man">
                    Masculine
                    <input
                    required
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
                    required
                      name="gender"
                      type="checkbox"
                      value="Female"
                      id="checkboxFemale"
                      onChange={(e) => { oneChange(e) }}
                      className="checkboxes"

                    />
                  </label> */}
                </div>
              </div>

              {/* <div className="categoryContainer">
                <span className="categoryTitle">CATEGORIE :</span>
                <div className="categoryWrapper">
                  <span className="categorySelected"> {categorie} <span/span>
                </div>
              </div> */}

              <div className="searchbarContainer">
                <span className="searchbarTitle"> VOTRE VILLE </span>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  inputValue={propertyFiltered.citySelected}
                  options={cities}
                  onInputChange={(event, newInputValue) => {
                    setPropertyFiltered({...propertyFiltered, citySelected: newInputValue});
                  }}
                  sx={{ width: 250 }}
                  renderInput={(params) => 
                      <TextField {...params} label="Rechercher" />
                }
                />
              </div>

              <div className="buttonContainer">
                <button className="trigger" type="submit">
                  <img className="btnClub" src={buttonImg} />
                </button>
              </div>

            </form>
            <div className="resultats">
              hello je suis les résultats
              <mapper/>
             
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