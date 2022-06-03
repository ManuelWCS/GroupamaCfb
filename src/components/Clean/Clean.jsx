import React from "react";
/* import du CSS*/
import "./css/Clean.css";
import "./css/SmallPhone2.css";
import "./css/Tablet.css";
import "./css/LargeScreen.css";
import "./css/Popup.css"
import "./css/Expandables.css";
/* Fin de l'import des différentes versions*/

/* import styles des cartes*/
import "../Clean/Cards/Cards.css";

import "../../components/Map/fonts.css";
/* import de la librairie Leaflet*/
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";

/* import du nécessaire React */
import { useState, useEffect } from "react";

/* import des marqueurs promotionnels*/
import LabelMarker from "../../assets/CA/labelCA.png";

/* import des marqueurs utilisateurs*/
import clubMarker from "../../assets/CompressedPictures/Markers/LogoClub.webp";

/* import des données des clubs */
import data from "../../components/Map/data/data.json";
import categoriesData from "../Map/data/categories.json";
import citiesData from "../Map/data/cities.json";

/* import des élements nécessaires au formulaire */
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import btnPicture from "../../assets/CompressedPictures/buttontransparent.webp";
import Button2 from "@mui/material/Button";

/*<------------------------IMPORT COMPOSANTS ---------------------------------> */
import Faq from "../FAQ/Faq";
import Sponso from "../Sponso/Sponso.jsx";
import Instances from "../Instances/Instances.jsx";
import Legend from "../Legend/Legend.jsx";

/*<------------------------IMPORT IMAGES ---------------------------------> */

import useGeolocation from "../Hook/useGeolocation";

/* import SLIDER  */
import Slider from "@mui/material/Slider";

/* Marqueur utilisateur*/
import UsrMkr from "../../components/MarkersUtilisateur/MarkersUser.jsx";

import CloseMkr from "../../components/MarkersUtilisateur/MarkersClose.jsx";
import Submit from "../Submit/Submit";
/* import popover */
import SearchIcon from "../../assets/CompressedPictures/Popover/trouverClub.webp";
import LocClub from "../../assets/CompressedPictures/Popover/LocClub.webp";
import "../Popover/Popover.css";

/* import bouton localisez moi*/
import ActivateGeoloc from "../ActivateGeoloc/ActivateGeoloc";

/* Import styles par rapport à la cart0*/



/* REACT SCROLL */
import { Link } from "react-scroll";

/* APP COMPONENTS*/

import Preload from "../Preloader/Preloader.jsx";
import UpArrow from "../upArrow/UpArrow.jsx";

function Clean(props) {
  const [allcities, setallcities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clubSearch, setclubSearch] = useState([]);
  const [map, setMap] = useState(null);

  const [formData, setformData] = useState({
    age: null,
    city: "",
    type: "",
    gender: "",
    category: "",
  });


  /* POP UP DETAILS DES CATEGORIES  ET STYLE DU MODAL */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    fontFamily: "Century Gothic",
    bgcolor: "background.paper",
    border: "2px solid #3586c2 ",
    boxShadow: 24,
    borderRadius: 12,
    p: 4,
  };
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    fontFamily: "Century Gothic",
    bgcolor: "background.paper",
    border: "2px solid #3586c2 ",
    boxShadow: 24,
    borderRadius: 12,
    p: 4,
  };

  // PopUp en cas d'erreur

  const [openPop, setopenPop] = useState(false);

  const [Declenche, setDeclenche] = useState(false);

  const [clubs, setClubs] = useState([]);
  // Paramétrage des inputs radio lors de la sélection

  const [inputLoisir, setinputLoisir] = useState(false);
  const [inputFutsal, setinputFutsal] = useState(false);
  // Hook qui permets de charger le loader :

  const clubMarqueur = L.icon({
    iconSize: [65, 60],
    iconAnchor: [13.5, 47],
    iconUrl: clubMarker,
  });

  const clubMarqueurLabel = L.icon({
    iconSize: [57, 58],
    iconAnchor: [13.5, 47],
    iconUrl: LabelMarker,
  });

  /*<<<<<<<<<<<<<<<<< Fonction pour chercher un club  >>>>>>>>>>>>>>>>>*/

  const searchClub = (e) => {
    e.preventDefault();
    let filtersOptions = [];

    // Si le genre est renseigné, filtre fonctionnel
    if (formData.gender !== null) {
      // console.log("sexe renseigné");
      if (formData.gender.length > 0) {
        // je pousse le filtre dans un tableau
        filtersOptions.push(
          // ici on fais un includes car on la data avec laquelles on compare c'est un array
          // item.gender: ["male","female]
          (item) => item.gender.includes(formData.gender)
        );
      }
    }

    // Si la ville est renseignée
    if (formData.city !== null) {
      // console.log("ville renseignée");
      if (formData.city.length > 0) {
        filtersOptions.push((item) => item.Localite === formData.city);
      }
    }

    // Si l'âge de la personne est renseignée
    if (formData.age !== null) {

      if (formData.age.length > 0) {
        if (parseInt(formData.age) !== 0) {
          const age = parseInt(formData.age);
          filtersOptions.push(
            (item) => age >= item.minAgeInClub && age <= item.maxAgeInClub
          );
        }
      }
    }

    // Initiliasation d'une variable pour la pratique souhaitée
    let categorieType = [];
    // Vérifier si c'est rempli
    if (formData.type !== null) {
      // qu'il a une longueur supérieure a 0
      if (formData.type.length > 0) {
        categories.forEach((element) => {
          // pour chaque catégories tu vérifie si sont element.type  === formData.type
          // si oui tu pousse element.name dans ton tableau
          if (element.type === formData.type) {
            categorieType.push(element.name);
          }
        });

        filtersOptions.push((item) =>
          categorieType.some((e) => item.categories.includes(e))
        );
      }
    }

    const resultofSearch = clubs.filter((clubWanted) =>
      // j'execute les filtezs de mon tableau
      filtersOptions.every((f) => f(clubWanted))
    );
    // Gestion d'erreurs, s'il n'y a pas de résultats un message est affiché dans la console
    // S'il y a des résultats, ils seront stockées dans une variable qui permettra de recentrer la vue de la carte
    if (resultofSearch.length === 0) {
      console.warn("Aucun résultat ne correspond à votre recherche");
    } else {
      const arrayOfLatLngs = resultofSearch.map(({ Latitude, Longitude }) => [
        Latitude,
        Longitude,
      ]);
      const bounds = L.latLngBounds(arrayOfLatLngs);
      if (map) map.flyToBounds(bounds);
    }

    if (resultofSearch.label !== null) {
      // console.log("il y a un club labelLisé ");
    } else {
      // console.log("pas de clubs labéllisés");
    }

    setclubSearch(resultofSearch);
    console.log(resultofSearch);
    setDeclenche(true);
    setRecherche(true);
  };

  /* <<<<<<<<<<<<<<<<<<<<FONCTION DE NAVIGATION>>>>>>>>>>>>>>>>>>>*/

  function scrollTop() {
    window.location.href = "#redirect";
  }

  // Fonction handle qui va gérer les changements des inputs
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  //Fonction qui gère la nouvelle recherche de clubs

  /* CHARGEMENT DES DONNEES  */

  useEffect(() => {
    let result = [];
    let data = citiesData;
    data.forEach((element) => {
      result.push({ label: element.name });
    });
    setallcities(result);
  }, []);

  useEffect(() => {
    setCategories(categoriesData);
    setClubs(data);
  }, []);

  // UseEffect qui gere le changement d'etat en fonction de l'age
  //Règle numéro 1: Si ageUtilisateur inférieur a 18, il faut désactiver la catégorie Loisir
  useEffect(() => {
    if (
      parseInt(formData.age) < 18 &&
      (formData.gender !== null || formData.gender.length !== 0)
    ) {
      setinputLoisir(true);
    } else {
      setinputLoisir(false);
    }
  }, [formData]);
  // Règle numéro 2 : Si je suis un homme avec moins de 17 ans je n'ai pas accès au Futsal
  useEffect(() => {
    if (parseInt(formData.age) < 17 && formData.gender === "Male") {
      setinputFutsal(true);
    } else {
      setinputFutsal(false);
    }
  }, [formData]);
  // Règle 3 : Si je suis une femme le futsal est désactivé, si je suis un homme de moins de 17 ans
  // Si j'ai moins de 17 ans et je suis un homme le futsal est désactivé
  useEffect(() => {
    if (formData.gender === "Female") {
      setinputFutsal(true);
    } else if (
      (parseInt(formData.age) < 17 && formData.gender === "Male") ||
      formData.gender === "Female"
    ) {
      setinputFutsal(true);
      if (formData.type === "Futsal") {
        setformData((state) => ({ ...state, type: "" }));
      }
    } else {
      setinputFutsal(false);
    }
  }, [formData]);

  console.log("Recherche", clubSearch);

  /* FONCTION DE GEOLOCALISATION AVEC LES CLUBS AUX ALENTOUR */

  const location = useGeolocation();
  // const mapRef = useRef();

  const showMyLocation = (e) => {
    if (location.loaded && !location.error) {
      setProximity(true);
      map.flyTo([location.coordinates.lat, location.coordinates.lng], 15, {
        animate: true,
      });
    } else {
      alert(location.error.message);
    }
  };

  const [clubsClose, setclubsClose] = useState([]);
  const [latMin, setLatMin] = useState(0);
  const [latMax, setLatMax] = useState(0);
  const [lngMin, setLngMin] = useState(0);
  const [lngMax, setLngMax] = useState(0);

  // Hook qui permets de cacher et d'afficher les clubs
  const [visibilityMarker, setVisibilityMarker] = useState(true);

  useEffect(() => {
    if (location.loaded === true) {
      setProximity(true);
      setLatMin(location.coordinates.lat - convertedDistance);
      setLatMax(location.coordinates.lat + convertedDistance);
      setLngMin(location.coordinates.lng - convertedDistance);
      setLngMax(location.coordinates.lng + convertedDistance);
    } else {
      setProximity(false);
      setLatMin(47.902964);
      setLatMax(0);
      setLngMin(1.909251);
      setLngMax(0);
    }
  }, [location]);

  let clubsProches = clubs.filter(function (clubsAlentour) {
    // console.log(clubsAlentour)
    return (
      clubsAlentour.Latitude <= latMax &&
      clubsAlentour.Latitude >= latMin &&
      clubsAlentour.Longitude <= lngMax &&
      clubsAlentour.Longitude >= lngMin
    );
  });

  useEffect(() => {
    setclubsClose(clubsProches.length);
    console.log(clubsProches);
  }, [clubsProches]);

  const [proximity, setProximity] = useState(false);
  const [convertedDistance, setConvertedDistance] = useState(0);
  const [valeurSlider, setValeurSlider] = useState(0);
  const [rayon, setRayon] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setProximity(proximity);
  }, [proximity]);

  function valuetext(value) {
    setValeurSlider(value);
    changeRadius();
  }

  function changeRadius() {
    setDistance(valeurSlider);
    let RayonCercle = distance + "000";
    setConvertedDistance(distance / 115);
    setRayon(RayonCercle);
  }

  const hideMarkers = () => {
    if (visibilityMarker === true) {
      setVisibilityMarker(false);
    } else {
      setVisibilityMarker(true);
    }
  };

  const [visibilityInstanceMarkers, setVisibilityInstanceMarkers] =
    useState(true);

  // Function that know distance between two points
  function distanceBetweenPoints(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    var e = d.toFixed(2);
    return e;
  }

  //deg2rad function
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Function to make appear the clubs in order of distance from the user
  function sortByDistance(clubsProches) {
    let clubsSorted = clubsProches.sort(function (a, b) {
      return (
        distanceBetweenPoints(
          location.coordinates.lat,
          location.coordinates.lng,
          a.Latitude,
          a.Longitude
        ) -
        distanceBetweenPoints(
          location.coordinates.lat,
          location.coordinates.lng,
          b.Latitude,
          b.Longitude
        )
      );
    });
    return clubsSorted;
  }

  /*HOOKS CONDITIONNELS POUR GERER LES EVENEMENTS */

  const [recherche, setRecherche] = useState(false);



  var Largeur = document.documentElement.clientWidth;


  const marks = [
    {
      value: 10,
      label: "10km",
    },
    {
      value: 15,
      label: "15km",
    },
    {
      value: 20,
      label: "20km",
    },
  ];

  //function that update the component when the user change the radius
  const updateRadius = () => {
    setProximity(true);
    setLatMin(location.coordinates.lat - convertedDistance);
    setLatMax(location.coordinates.lat + convertedDistance);
    setLngMin(location.coordinates.lng - convertedDistance);
    setLngMax(location.coordinates.lng + convertedDistance);
  };


  //Set the map to the center of the user
  useEffect(() => {
    setTimeout(() => {
      if (map)
        map.flyTo([location.coordinates.lat, location.coordinates.lng], 11);
    }, 2000);
  }, [location]);

  useEffect(() => {
  }, [convertedDistance]);

  /* PARTIE ANIMATION SCROLL DES BOUTONS */

  const [btn1, setBtn1] = useState(null);

  const passData = data => { setTimeout(() => {
    setBtn1(data);
  }, 1000)
}

const [btn2, setBtn2]= useState(null);

const passData2 = data2 => {setTimeout(() => {
  setBtn2(data2);
}, 1000)}

const isClicked = () => {
  setBtn2(!btn2);
};

const isClicked2 = () => {    
  setBtn1(!btn1)
};

/* FIN ANIMATION SCROLL*/

  return (
    <>
      <Preload passData={passData} passData2={passData2} />

      <div className="mainContainer"id="middle">
        <div className="mapContainer">
          <div className="BlocCarte">
            <MapContainer
              className="mapLeaflet"
              id="map"
              center={[47.90289, 1.90389]}
              zoom={11}
              scrollWheelZoom={true}
              minZoom={6}
              doubleClickZoom={true}
              zoomControl={true}
              whenCreated={setMap}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {location.loaded && !location.error ? (
                <UsrMkr clubsProches={clubsClose} />
              ) : (
                <Marker position={[latMin, lngMin]}>
                  <Popup>
                    Vous n'avez pas activé la localisation, votre position à été
                    déinie par défault à Orléans !
                  </Popup>
                </Marker>
              )}

              {proximity === true ? (
                <Circle
                  center={[location.coordinates.lat, location.coordinates.lng]}
                  radius={rayon}
                  pathOptions={{ color: "#3586c2" }}
                />
              ) : null}
              {visibilityMarker === true ? (
                <CloseMkr distance={convertedDistance} />
              ) : null}

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
                {clubSearch.length !== 0
                  ? clubSearch.slice(0, 500).map((res, index2) => {
                      // console.log(res);
                      return (
                        <Marker
                          icon={
                            res.label.length > 0
                              ? clubMarqueurLabel
                              : clubMarqueur
                          }
                          key={index2}
                          position={[res.Latitude, res.Longitude]}
                        >
                          <Popup key={index2} width={500} className="markersPopUp">
                            <h4 className="TitlePopUp"> {res.NomClub}</h4>


                            {!location.error ? (
                              <h3 className="TitlePopUp">
                                Se trouve à{" "}
                                {distanceBetweenPoints(
                                  location.coordinates.lat,
                                  location.coordinates.lng,
                                  res.Latitude,
                                  res.Longitude
                                )}{" "}
                                km de vous !
                              </h3>
                            ) : null}

                            <p>
                              {!location.error ? (
                                <a
                                  href={`https://www.google.fr/maps/dir/${location.coordinates.lat},${location.coordinates.lng}+/${res.Latitude},+${res.Longitude}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Itinéraire vers ce club
                                </a>
                              ) : (
                                <p>
                                  {" "}
                                  Activez la localisation pour voir un
                                  itinéraire vers ce club !{" "}
                                </p>
                              )}
                            </p>
                          </Popup>
                        </Marker>
                      );
                    })
                  : null}
              </MarkerClusterGroup>

              {visibilityInstanceMarkers === true ? <Instances /> : null}
            </MapContainer>
          </div>

          {Largeur < 1024 ? (
            <div className="commandContainer">
              <Legend />
            </div>
          ) : null}
        </div>

        <div className="popover" id="popover">
          <button
            onClick={(isClicked)}
            className={btn2 === true ? "styleLoc" : "styleLocExpanded"}
          >
            <div className="btnContent1">
              <img src={SearchIcon} className="searchIcon" alt="searchIcon" />
              <p className="TitleButton">
                CLUBS SELON CRITÈRES &nbsp;{" "}
              </p>
            </div>
          </button>

          <div className={btn2 === true  ? "styleDiv2" : "styleOff"}>
            {recherche === false ? (
              <div className="filtersNoSearch">
                <form
                  className="filtrationsWrapper"
                  onSubmit={(e) => searchClub(e)}
                >
                  <span className="formTitle">VOS INFOS</span>
                  <div className="filter">
                    <div className="inputBox">
                      <span className="inputTitle">VOTRE ÂGE </span>
                    </div>

                    <TextField
                      variant="outlined"
                      label="Âge"
                      type="number"
                      margin="normal"
                      name="age"
                      onChange={(e) => {
                        if (e.target.value < 18) {
                          if (formData.type === "Loisir") {
                            setformData({
                              ...formData,
                              type: "",
                              age: e.target.value,
                            });
                          } else {
                            setformData({ ...formData, age: e.target.value });
                          }
                        } else {
                          setformData({ ...formData, age: e.target.value });
                        }
                      }}
                      focused
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        placeholder: "10, 15, 30...",
                      }}
                    />
                  </div>

                  <div className="filter">
                    <FormControl component="fieldset" required={true}>
                      <div className="inputBox">
                        <span className="inputTitle">VOTRE GENRE </span>
                      </div>
                      <RadioGroup
                        row
                        aria-label="gender"
                        name="gender"
                        error="Vous devez renseigner une compétition"
                        onChange={(e) => {
                          handleChange(e);
                          if (e.target.value === "Male") {
                            setformData({
                              ...formData,
                              gender: e.target.value,
                            });
                          } else {
                            formData.type === "Futsal"
                              ? setformData({
                                  ...formData,
                                  gender: e.target.value,
                                  type: "",
                                })
                              : setformData({
                                  ...formData,
                                  gender: e.target.value,
                                });
                          }
                        }}
                      >
                        <FormControlLabel
                          value="Male"
                          className="radio1"
                          control={<Radio />}
                          label="Masculin"
                        />
                        <FormControlLabel
                          className="radio1"
                          value="Female"
                          control={<Radio />}
                          label="Féminin"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className="filter">
                    <FormControl component="fieldset" required={true}>
                      <div className="inputBox">
                        <span className="inputTitle">PRATIQUE SOUHAITÉE </span>
                      </div>
                      <RadioGroup
                        value={formData.type}
                        row
                        aria-label="type"
                        name="type"
                        error="Vous devez renseigner une compétition"
                        onChange={(e) => handleChange(e)}
                        required={true}
                      >
                        <FormControlLabel
                          value="Libre"
                          className="radio1"
                          control={<Radio />}
                          label="Libre"
                          title="Football en compétition à 11 joueurs"
                        />
                        <FormControlLabel
                          disabled={inputLoisir}
                          className="radio1"
                          value="Loisir"
                          control={<Radio />}
                          label="Loisir"
                          title="Pratique proposée aux seniors Hommes exclusivement"
                        />
                        <FormControlLabel
                          disabled={inputFutsal}
                          className="radio1"
                          value="Futsal"
                          control={<Radio />}
                          label="Futsal"
                          title="Pratique proposée aux séniors Hommes et aux 17-18 masculins"
                          // disable={inputFutsal}
                        />
                      </RadioGroup>

                      <div className="modalDiv">
                        <Button2 className="modalTitle" onClick={handleOpen}>
                          <div className="btnOpenPopup">
                            <p className="btnTextPopUp">
                              Détails sur les catégories
                            </p>
                          </div>
                        </Button2>

                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box id="box" sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              <p className="modalTitle">
                                {" "}
                                Informations complémentaires sur les catégories
                                :
                              </p>
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              <p className="boldText">Libre : </p>
                              <p className="popupText">
                                Football en compétiton
                              </p>
                              <p className="boldText"> Loisir :</p>
                              <p className="popupText">
                                {" "}
                                Pratique proposée aux seniors Hommes
                                exclusivement
                              </p>

                              <p className="boldText">Futsal : </p>
                              <p className="popupText">
                                {" "}
                                Pratique proposée aux seniors Hommes et aux
                                17-18 ans Hommes
                              </p>
                              <div
                                onClick={handleClose}
                                className="btnClosePopUp"
                              >
                                <p onClick={handleClose}>FERMER</p>
                              </div>
                            </Typography>
                          </Box>
                        </Modal>
                      </div>
                    </FormControl>
                  </div>

                  <div className="filter">
                    <div className="inputBox2">
                      <span className="inputTitle">VOTRE VILLE </span>
                    </div>

                    <Autocomplete
                      disablePortal
                      className="inputCity"
                      id="combo-box-demo"
                      inputValue={formData.city}
                      options={allcities}
                      noOptionsText="Pas de club disponible dans cette commune"
                      onInputChange={(event, newInputValue) => {
                        setformData({ ...formData, city: newInputValue });
                      }}
                      sx={{ width: 230 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Rechercher" />
                      )}
                    />
                  </div>

                  <div className="btnContainer" id="test2">
                    <button
                      className="btnBackground"
                      id="scrollBtn"
                      type="submit"
                    >
                      <Submit
                        className="findclubBtn"
                        alt="trouvez votre club"
                        imageBtn={btnPicture}
                      />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="containerResult">
                <h3 className="Result">RÉSULTATS</h3>

                <p className="NumberClose"> Il y a <u> {clubSearch.length} </u> club(s) correspondant à votre recherche  
                </p>
                <button
                  className="clearSearch"
                  onClick={() => {
                    setclubSearch([]);
                    setRecherche(false);
                  }}
                >
                  Réinitialiser recherche{" "}
                </button>
                {clubSearch.map((club) => (
                  <div
                    className={
                      club.label.length > 0 ? "cardResultLabel" : "cardResult"
                    }
                    id="cardClub"
                  >
                    <div className="titleCardContainer">
                      <span className="titleCard" onClick={scrollTop}>
                        {club.NomClub}
                      </span>
                      {!location.error ? (
                        <p className="distanceSpan">
                          {distanceBetweenPoints(
                            location.coordinates.lat,
                            location.coordinates.lng,
                            club.Latitude,
                            club.Longitude
                          )}
                          km
                        </p>
                      ) : null}
                    </div>

                    <div className="columnContainer">
                      <div className="column1">
                        <div className="logo1"></div>
                        <div className="logo2"></div>
                        <div className="logo3"></div>
                      </div>
                      <div className="column2">
                        <div className="info1">
                          {" "}
                          <a
                            className="mail"
                            href={`mailto:${club.Mail}?subject=[CFB] "Entrez l'objet de votre
                            demande "`}
                          >
                            {club.Mail}{" "}
                          </a>
                        </div>
                        <div className="info2" onClick={scrollTop}>
                          {club.AdressePostale}
                        </div>
                        <div className="info3">
                          <a
                            href={`https://foot-centre.fff.fr/recherche-clubs/?query-affil=${club.NumClub}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Voir plus d'infos
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {recherche === true ? (
              <button
                onClick={() => {
                  setRecherche(false);
                }}
              >
                {" "}
                NOUVELLE RECHERCHE{" "}
              </button>
            ) : null}
          </div>
        </div>

        <div className="popover2" id="popover2">
          <button
            onClick={isClicked2}
            className={btn1 === true ? "styleGeo" : "styleGeoExpanded"}
          >
            <div className="btnContent">
              <img src={LocClub} className="searchIcon" alt="searchIcon" />
              <p className="TitleButton">
                CLUBS À PROXIMITÉ ! &nbsp; &nbsp;{" "}
              </p>
            </div>
          </button>
          <div className={btn1 === true ? "styleDiv3" : "styleOff"}>
            <span className="sliderText"> CHOISIS TON ÉCHELLE !</span>
            <Box sx={{ width: 190, margin: 1 }}>
              {!location.error ? (
                <Slider
                  aria-label="Distance"
                  defaultValue={10}
                  getAriaValueText={valuetext}
                  // getAriaLabel={true}
                  valueLabelDisplay="auto"

                  step={1}
                  marks={marks}
                  min={10}
                  max={20}
                  onChange={updateRadius}
                />
              ) : null}
            </Box>
            <div className="resultContainer">
              {clubsProches.length !== 0 ? (
                <p className="NumberClose">
                  Il y a {clubsProches.length} clubs autour de vous :{" "}
                </p>
              ) : (
                <p className="NumberClose">
                  Il n'y a pas de club autour de vous !
                </p>
              )}

              {proximity === true ? (
                sortByDistance(clubsProches).map((club, Uniqueindex) => {
                  return (
                    <div
                      className={
                        club.label.length > 0 ? "cardResultLabel" : "cardResult"
                      }
                      id="cardClub"
                    >
                      <div className="titleCardContainer">
                        <span className="titleCard" onClick={scrollTop}>
                          {club.NomClub}
                        </span>
                        <p className="distanceSpan">
                          {distanceBetweenPoints(
                            location.coordinates.lat,
                            location.coordinates.lng,
                            club.Latitude,
                            club.Longitude
                          )}{" "}
                          km
                        </p>
                      </div>

                      <div className="columnContainer">
                        <div className="column1">
                          <div className="logo1"></div>
                          <div className="logo2"></div>
                          <div className="logo3"></div>
                        </div>
                        <div className="column2">
                          <div className="info1">
                            {" "}
                            <a
                              className="mail"
                              href={`mailto:${club.Mail}?subject=[CFB] "Entrez l'objet de votre
                                demande "`}
                            >
                              {club.Mail}{" "}
                            </a>
                          </div>
                          <div className="info2" onClick={scrollTop}>
                            {club.AdressePostale}
                          </div>
                          <div className="info3">
                            <a
                              href={`https://foot-centre.fff.fr/recherche-clubs/?query-affil=${club.NumClub}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Voir plus d'infos
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <ActivateGeoloc />
              )}
            </div>
          </div>
        </div>
      </div>
      <Faq />
      <Sponso />
    </>
  );
}

export default Clean;
