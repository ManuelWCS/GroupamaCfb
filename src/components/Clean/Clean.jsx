import React from "react";
/* import du CSS*/
import "./Clean.css";
import "./SmallPhone2.css";
import "./Tablet.css";
import "./LargeScreen.css";
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

/* import de la librairie axios qui nous permettra de récupérer des données */

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
import Instances from "../Instances/Instaces.jsx";
import Legend from "../Legend/Legend.jsx";
import Header from "../Header2/Header2.jsx";

/*<------------------------IMPORT IMAGES ---------------------------------> */
import btnNewSearch from "../../assets/CompressedPictures/Buttons/nouvelleRecherche.png";

import useGeolocation from "../Hook/useGeolocation";

/* import SLIDER  */
import Slider from "@mui/material/Slider";

function Clean() {
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

  console.log(formData);

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
  const handleClosePop = () => {
    setopenPop(false);
    setDeclenche(false);
  };
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
      console.log("âge renseigné");

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
  };

  /* <<<<<<<<<<<<<<<<<<<<FONCTION DE NAVIGATION>>>>>>>>>>>>>>>>>>>*/

  function scrollTop() {
    window.location.href = "#redirect";
  }
  // Fonction permettant de scroller vers la carte en question
  function scrollCard() {
    window.location.href = "#cardClub";
  }

  // Fonction handle qui va gérer les changements des inputs
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const newSearch = () => {
    setDeclenche(false);
    setclubSearch([]);
  };

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
  }, []);

  useEffect(() => {
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
      })
    } else {
      alert(location.error.message);
    }
  };

  const [clubsClose, setclubsClose] = useState([]);
  const [latMin, setLatMin] = useState(0);
  const [latMax, setLatMax] = useState(0);
  const [lngMin, setLngMin] = useState(0);
  const [lngMax, setLngMax] = useState(0);

  useEffect(() => {
    if (location.loaded === true) {
      setProximity(true);
      setLatMin(location.coordinates.lat - convertedDistance);
      setLatMax(location.coordinates.lat + convertedDistance);
      setLngMin(location.coordinates.lng - convertedDistance);
      setLngMax(location.coordinates.lng + convertedDistance);
    } else {
      setProximity(false);
      setLatMin(0);
      setLatMax(0);
      setLngMin(0);
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
    console.log(proximity, "<- statut de la loc");
  }, [clubsProches]);
  
  const [proximity, setProximity] = useState(false); 
  const [convertedDistance, setConvertedDistance] = useState(0)
  const [valeurSlider, setValeurSlider] = useState(0);
  const [rayon, setRayon] = useState(0);
  const [distance, setDistance] = useState(0);
  




  function valuetext(value) {
    setValeurSlider(value);
    changeRadius();
  }



  function changeRadius() {
    setDistance(valeurSlider);
    let RayonCercle = distance + "000";
    setConvertedDistance(distance / 100)
    setRayon(RayonCercle);
  }
  return (
    <>
      <Header />
      <div className="fullApp" id="background_wrap">
        <div className="mainContent">
          <div className="titlesContainer">
            <h1 className="mainTitle"> BIENVENUE ! </h1>
            <h3 className="secondaryTitle">
              TROUVEZ UN CLUB PRÈS DE CHEZ VOUS{" "}
            </h3>
          </div>
        </div>
        <div className="descriptionContainer">
          <h2 className="mainDescription">
            541 CLUBS DE FOOTBALL EN RÉGION CENTRE-VAL DE LOIRE
          </h2>
          <h4 className="secondaryDescription">
            La Ligue Centre-Val de Loire de Football vous propose cette
            plateforme afin de découvrir l'ensemble des clubs de notre Région !
          </h4>
        </div>

        <div className="bannerContainer">
          <h5 className="bannerTitle">À VOUS DE JOUER</h5>
        </div>

        <div className="desktopInstructions">
          <h6 className="instructionsTitle">
            Entrez votre âge et la compétition souhaitée pour découvrir les
            clubs à proximité :
          </h6>
        </div>

          <div className="mapContainer">
            <div className="firstContainer">
              <p className="mapTitle" id="redirect">
                CARTE INTERACTIVE
              </p>
            </div>

            <div className="BlocCarte">
              <MapContainer
                className="mapLeaflet"
                id="map"
                center={[47.90289, 1.90389]}
                zoom={1}
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


                {location.loaded && !location.error && (
                  <Marker
                    position={[
                      location.coordinates.lat,
                      location.coordinates.lng,
                    ]}
                  >
                    <Popup>
                      Il y a {clubsProches.length} clubs près de chez vous :
                    </Popup>
                  </Marker>
                )}

                {proximity === true ? (
                  <Circle
                    center={[
                      location.coordinates.lat,
                      location.coordinates.lng,
                    ]}
                    radius={rayon}
                    pathOptions={{ color: "blue" }}
                  />
                ) : null}

                {clubsProches.map((cloub, idxClub) => {
                  return (
                    <Marker
                      position={[cloub.Latitude, cloub.Longitude]}
                      icon={clubMarqueur}
                      key={idxClub}
                    >
                      <Popup className="markersPopUp">{cloub.NomClub}</Popup>
                    </Marker>
                  );
                })}


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
                        console.log(res);
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
                            <Popup key={index2} className="markersPopUp">
                              <p onClick={scrollCard}> {res.NomClub}</p>
                            </Popup>
                          </Marker>
                        );
                      })
                    : null}
                </MarkerClusterGroup>

                <Instances />
              </MapContainer>
            </div>
            {proximity === true ? (
              <button onClick={showMyLocation}>ME LOCALISER</button>
            ) : (
              <button>Activer ma geoloc </button>
            )}
          <Box sx={{ width: 300 }}>
            <span>Distance : 1 à 25km</span>
            <Slider
              aria-label="Distance"
              defaultValue={10}
              getAriaValueText={valuetext}
              // getAriaLabel={true}
              valueLabelDisplay="on"
              step={1}
              marks={true}
              min={1}
              max={25}
            />
          </Box>
          <Legend/>
          </div>


          <div
            className={clubSearch.length !== 0 ? "formContainer" : "dataResult"}
          >
            <span className="cardLegendText">COMPLÉTEZ VOS INFOS </span>

            <div
              className={
                clubSearch.length !== 0 ? "BlocFiltresEX" : "BlocFiltres"
              }
            >
              {clubSearch.length > 0 ? (
                clubSearch.map((clubSelected, Uniqueindex) => {
                  return (
                    <div
                      className={
                        clubSelected.label.length > 0
                          ? "cardResultLabel"
                          : "cardResult"
                      }
                      id="cardClub"
                    >
                      <div className="titleCardContainer">
                        <span className="titleCard" onClick={scrollTop}>
                          {clubSelected.NomClub}
                        </span>
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
                              href={`mailto:${clubSelected.Mail}?subject=[CFB] "Entrez l'objet de votre
                                demande "`}
                            >
                              {clubSelected.Mail}{" "}
                            </a>
                          </div>
                          <div className="info2" onClick={scrollTop}>
                            {clubSelected.AdressePostale}
                          </div>
                          <div className="info3">
                            <a
                              href={`https://foot-centre.fff.fr/recherche-clubs/?query-affil=${clubSelected.NumClub}`}
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
                <div className="filtersNoSearch">
                  <form
                    className="filtrationsWrapper"
                    onSubmit={(e) => searchClub(e)}
                  >
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
                          <span className="inputTitle">
                            PRATIQUE SOUHAITÉE{" "}
                          </span>
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
                                  Informations complémentaires sur les
                                  catégories :
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
                        <img
                          className="findclubBtn"
                          alt="trouvez votre club"
                          src={btnPicture}
                        />
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <Modal
                open={clubSearch.length === 0 && Declenche ? true : false}
                onClose={handleClosePop}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box id="box" sx={style2}>
                  {!formData.age || !formData.type || !formData.city ? (
                    <div>
                      <p className="textNoResults">
                        {" "}
                        Aucun résultat pour votre recherche !
                      </p>
                      <p className="btnNoResults" onClick={handleClosePop}>
                        FERMER
                      </p>{" "}
                      {/* GESTION DES ERREURS DANS LA RECHERCHE */}
                    </div>
                  ) : (
                    <div>
                      <p>
                        Pas de résultats trouvés pour la catégorie :{" "}
                        {formData.type} à {formData.city}
                      </p>

                      <p className="btnNoResults" onClick={handleClosePop}>
                        FERMER
                      </p>
                    </div>
                  )}
                </Box>
              </Modal>
            </div>

            <div className={clubSearch.length !== 0 ? "toggleSearch" : "hide "}>
              <img
                src={btnNewSearch}
                className="newSearchBtn"
                onClick={newSearch}
                alt="nouvelle recherche"
              ></img>
            </div>

            {/* FIN DE LA  GESTION DES ERREURS DANS LA RECHERCHE */}
          </div>
        </div>
        <Faq />

        {/* Fin de desktopContainer*/}

        <Sponso />
    </>
  );
}

export default Clean;
