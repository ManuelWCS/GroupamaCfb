import React from "react";
/* import du CSS*/
import "./Clean.css";
import './SmallPhone.css';
import './Tablet.css';
import './LargeScreen.css';
/* Fin de l'import des différentes versions*/

import "../../components/Map/fonts.css";
/* import de la librairie Leaflet*/
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";

/* import du nécessaire React */
import { useState, useEffect } from "react";
/* import du Hook nécessaire à la Geoloc */
import Geolocalisation from "../Hook/Geolocalisation";
/* import de la librairie axios qui nous permettra de récupérer des données */
import axios from "axios";
/* import des différents marqueurs de district*/

import ligueMarker from "../../assets/CompressedPictures/MarqueurLigue.webp";
import eureEtLoireMarker from "../../assets/CompressedPictures/Marqueur-Eure-et-Loir.webp";
import indreMarker from "../../assets/CompressedPictures/Marqueur-Indre.webp";
import indreEtLoireMarker from "../../assets/CompressedPictures/Marqueur-Indre-et-Loire.webp";
import loirEtcher from "../../assets/CompressedPictures/Marqueur-Loir-et-Cher.webp";
import cherMarker from "../../assets/CompressedPictures/Marqueur-Cher.webp";
import loiretMarker from "../../assets/CompressedPictures/Marqueur-Loiret.webp";

/* import des marqueurs promotionnels*/
import LabelMarker from "../../assets/CA/labelCA.png";
import agenceGroupama from "../../assets/CompressedPictures/MarqueurGroupama.webp";
import marqueurG from "../../assets/CompressedPictures/MarqueurG.webp";
import labelCA from "../../assets/CompressedPictures/labelCA.webp";

/* import des marqueurs utilisateurs*/
import clubMarker from "../../assets/CompressedPictures/LogoClub.webp";

/* import des données des clubs */
import data from "../../components/Map/data/data.json";

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

/* import du Footer */
import fb from "../../assets/CompressedPictures/fb.webp";
import web from "../../assets/CompressedPictures/web.webp";
import yt from "../../assets/CompressedPictures/youtube.webp";
import Logo from "../../assets/CompressedPictures/GroupamaLogo.webp";
import twi from "../../assets/CompressedPictures/twitter.webp";

/*<------------------------PARTIE DESKTOP---------------------------------> */

import contactImage from "../../assets/CompressedPictures/contact.webp";

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

  // POP UP DETAILS DES CATEGORIES
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
  const [clubs, setClubs] = useState([]);

  // PopUp en cas d'erreur

  const [openPop, setopenPop] = useState(false);
  const handleClosePop = () => {
    setopenPop(false);
    setDeclenche(false);
  };
  const [Declenche, setDeclenche] = useState(false);

  // Paramétrage des inputs radio lors de la sélection

  const [inputLoisir, setinputLoisir] = useState(false);
  const [inputFutsal, setinputFutsal] = useState(false);
  // Hook qui permets de charger le loader :

  const LigueMarqueur = L.icon({
    iconSize: [50, 60],
    iconAnchor: [13.5, 47],
    iconUrl: ligueMarker,
  });
  const eureEtLoirMarqueur = L.icon({
    iconSize: [50, 60],
    iconAnchor: [13.5, 47],
    iconUrl: eureEtLoireMarker,
  });

  const loiretMarqueur = L.icon({
    iconSize: [50, 60],
    iconAnchor: [13.5, 40],
    iconUrl: loiretMarker,
  });

  const cherMarqueur = L.icon({
    iconSize: [50, 60],
    iconAnchor: [13.5, 47],
    iconUrl: cherMarker,
  });

  const loireEtcherMarqueur = L.icon({
    iconSize: [50, 60],
    iconAnchor: [13.5, 47],
    iconUrl: loirEtcher,
  });
  const indreMarqueur = L.icon({
    iconSize: [50, 60],
    iconAnchor: [13.5, 47],
    iconUrl: indreMarker,
  });

  const indreEtLoirMarqueur = L.icon({
    iconSize: [50, 60],
    iconAnchor: [13.5, 47],
    iconUrl: indreEtLoireMarker,
  });

  const clubMarqueur = L.icon({
    iconSize: [50, 60],
    iconAnchor: [13.5, 47],
    iconUrl: clubMarker,
  });

  const clubMarqueurLabel = L.icon({
    iconSize: [57, 58],
    iconAnchor: [13.5, 47],
    iconUrl: LabelMarker,
  });

  const marqueurBanque = L.icon({
    iconSize: [38, 53],
    iconAnchor: [13.5, 47],
    iconUrl: agenceGroupama,
  });

  /* Fonction pour chercher un club */ 

  const searchClub = (e) => {
    e.preventDefault();
    let filtersOptions = [];

    // Si le genre est renseigné, filtre fonctionnel
    if (formData.gender !== null) {
      console.log('sexe renseigné')
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

    // PInitiliasation d'une variable pour la pratique souhaitée
    let categorieType = [];
    // Vérifier si c'est rempli
    if (formData.type !== null) {
      // qu'il a une lingueur supérieur a 0
      if (formData.type.length > 0) {
        categories.forEach((element) => {
          // pour chaque catégories tu vérifie si sont element.type  === formData.type
          // si oui tu pousse element.name dans ton tableau
          if (element.type === formData.type && formData.gender === "Male") {
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
      console.log("il y a un club labelLisé ");
    } else {
      console.log("pas de clubs labéllisés");
    }

    setclubSearch(resultofSearch);
    console.log(resultofSearch);
    setDeclenche(true);
  };

  function scrollTop() {
    window.location.href = "#top";
  }
  // Fonction permettant de scroller vers la carte en question
  function scrollCard() {
    window.location.href = "#cardresult";
  }
  // Fonction handle qui va gérer les changements des inputs
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const newSearch = () => {
    setDeclenche(false);
    setclubSearch([]);
  };

  // Fonction qui changera le marqueur en fonction de s'il est labélisé ou pas

  useEffect(() => {
    //à mettre en dur aussi
    axios.get("https://api-clubs-cvl.herokuapp.com/cities").then((res) => {
      let result = [];
      res.data.forEach((element) => {
        result.push({ label: element.name });
      });
      setallcities(result);
    });
  }, []);

  useEffect(() => {
    //à mettre en dur aussi
    axios
      .get("https://api-clubs-cvl.herokuapp.com/categories")
      .then((res) => setCategories(res.data));
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
    } else if (parseInt(formData.age) < 17 && formData.gender === "Male") {
      setinputFutsal(true);
      if (formData.type === "Futsal") {
        setformData((state) => ({ ...state, type: "" }));
      }
    } else {
      setinputFutsal(false);
    }
  }, [formData]);

  console.log(clubSearch);

  return (
    <div className="fullApp">
      {/* Fin de BlocTel <<<<<<<<<<<<<VERSION DESKTOP>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
      <div className="wrapper">
        <div className="mainContent">
          <div className="titlesContainer">
            <h1 className="mainTitle"> BIENVENUE !</h1>
            <h3 className="secondaryTitle">
              TROUVEZ UN CLUB PRÈS DE CHEZ VOUS !
            </h3>
          </div>
        </div>
        <div className="descriptionContainer">
          <h2 className="mainDescription">
            541 CLUBS DE FOOTBALL EN RÉGION CENTRE-VAL DE LOIRE
          </h2>
          <h4 className="secondaryDescription">
            La Ligue Centre-Val de Loire de Football et son partenaire Groupama Paris-Val de Loire vous proposent cette plateforme afin de découvrir
            l'ensemble des clubs de notre Région !
          </h4>
        </div>

        <div className="bannerContainer">
          <h5 className="bannerTitle">À VOUS DE JOUER</h5>
        </div>

        <div className="desktopInstructions">
          <h6 className="instructionsTitle">
            Entrez votre âge et la compétition souhaitée pour découvrir les
            clubs à proximité
          </h6>
        </div>

        <div className="mainContainer">
          <div className="mapContainer">
            <div className="legendContainer">
              <p className="mapTitle">CARTE INTERACTIVE</p>
            </div>

            <div className="BlocCarte">
              <MapContainer
                className="mapLeaflet"
                id="map"
                center={[48.856614, 2.3522219]}
                zoom={13}
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

                <Geolocalisation />

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
                    ? clubSearch.slice(0, 150).map((res, index2) => {
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
                <Marker position={[47.830261, 1.93609]} icon={LigueMarqueur}>
                  <Popup className="InstanceLigue">
                    <a href="https://foot-centre.fff.fr/">
                      <h3>Ligue Centre-Val de Loire </h3>
                    </a>
                  </Popup>
                </Marker>
                <Marker position={[47.11563, 2.35849]} icon={cherMarqueur}>
                  <Popup className="InstancePopUp">
                    <a href="https://cher.fff.fr/">
                      <h3>District de Football du Cher </h3>
                    </a>
                  </Popup>
                </Marker>
                <Marker
                  position={[48.42918, 1.46021]}
                  icon={eureEtLoirMarqueur}
                >
                  <Popup className="InstancePopUp">
                    <a href="https://eure-et-loir.fff.fr/">
                      <h3>District de Football d'Eure Et Loire </h3>
                    </a>
                  </Popup>
                </Marker>
                <Marker position={[46.79267, 1.69726]} icon={indreMarqueur}>
                  <Popup className="InstancePopUp">
                    <a href="https://indre.fff.fr/">
                      <h3>District de Football de l'Indre </h3>
                    </a>
                  </Popup>
                </Marker>
                <Marker
                  position={[47.9168433, 1.9246721]}
                  icon={loiretMarqueur}
                >
                  <Popup className="InstancePopUp">
                    <a href="https://foot-loiret.fff.fr/">
                      <h3>District de Football du Loiret </h3>
                    </a>
                  </Popup>
                </Marker>
                <Marker
                  position={[47.5766331, 1.3026806]}
                  icon={loireEtcherMarqueur}
                >
                  <Popup className="InstancePopUp">
                    <a href="https://loir-et-cher.fff.fr/">
                      <h3>District de Football du Loir-et-Cher</h3>
                    </a>
                  </Popup>
                </Marker>

                <Marker
                  position={[47.37913, 0.72672]}
                  icon={indreEtLoirMarqueur}
                >
                  <Popup className="InstancePopUp">
                    <a href="https://indre-et-loire.fff.fr/">
                      <h3>District de Football d'Indre-Et-Loire'</h3>
                    </a>
                  </Popup>
                </Marker>

                <Marker position={[47.84524, 1.9247]} icon={marqueurBanque}>
                  <Popup className="banquePopUp">
                    <a href="https://groupama.fr/">
                      <h3>Groupama</h3>
                    </a>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className="legendContainer">
              <div className="markerContainer">
                <div className="markerWrapper">
                  <img src={marqueurG} className="legendMarker1" />
                  <span className="markerDescription">Votre position</span>
                </div>
                <div className="markerWrapper">
                  <img src={clubMarker} className="legendMarker2" />
                  <span className="markerDescription">Club de football</span>
                </div>

                <div className="markerWrapper">
                  <img src={agenceGroupama} className="legendMarker" />
                  <span className="markerDescription">Groupama</span>
                </div>

                <div className="markerWrapper">
                  <img src={labelCA} className="legendMarker3" />
                  <span className="markerDescription">Club labéllisé</span>
                </div>
              </div>
            </div>
          </div>
          <div className="formContainer">
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
                      className="cardResult"
                      key={Uniqueindex}
                      id="cardresult"
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
                          <div className="info2">
                            {clubSelected.AdressePostale}
                          </div>
                          <div className="info3">
                            <a
                              href={`https://foot-centre.fff.fr/recherche-clubs/?query=${clubSelected.Localite}`}
                            >
                              Voir plus d'infos
                            </a>
                            <img
                              className={
                                clubSelected.label.length > 0
                                  ? "labelClub"
                                  : "labelHide"
                              }
                              src={
                                clubSelected.label.length > 0
                                  ? LabelMarker
                                  : null
                              }
                              alt="Marqueur Club labellisé"
                            />
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
              <div className="newSearchContainer">
                <button
                  className={
                    clubSearch.length !== 0 ? "btnAfterSearch" : "hide"
                  }
                  onClick={newSearch}
                >
                  NOUVELLE RECHERCHE
                </button>
              </div>
            </div>

            {/* FIN DE LA  GESTION DES ERREURS DANS LA RECHERCHE */}
          </div>
        </div>

        <div className="faqContainer">
          <h6 className="faqTitle">FAQ ! BESOIN D'AIDE ? </h6>

          <p className="faqText">
            Vous avez une question ? Nous avons probablement la réponse !
          </p>
          <p className="faqText2">Cliquez ici pour poser votre question</p>
          <img src={contactImage} className="contactImg" />
        </div>
        {/* Fin de desktopContainer*/}
        <div className="curved">
          <div className="sponsorContainer">
            <p className="sponsoText">
              {" "}
              Cette plateforme est soutenue par le Groupama
            </p>
            <img src={Logo} className="GroupamaLogo" />
            <div className="sponsoLinks">
              <a
                href="https://www.facebook.com/groupama"
                target="_blank"
                rel="noreferrer"
              >
                <img src={fb} alt="" className="LinkGroupama" />
              </a>

              <a
                href="https://www.youtube.com/channel/UCcVU-JnuCbANGOl4vGcGpEg"
                target="_blank"
                rel="noreferrer"
              >
                <img src={yt} alt="" className="LinkGroupama" />
              </a>

              <a
                href="https://www.groupama.fr/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={web} alt="" className="LinkGroupama" />
              </a>

              <a
                href="https://twitter.com/GroupeGroupama"
                target="_blank"
                rel="noreferrer"
              >
                <img src={twi} alt="" className="LinkGroupama" />
              </a>
            </div>
          </div>
          <div className="foooooter">
            <div className="logos">
              <a
                href="https://www.facebook.com/LCFofficiel/?ref=bookmarks"
                target="_blank"
                rel="noreferrer"
              >
                <img className="logos" alt="logo Facebook" src={fb} />
              </a>
            </div>

            <div className="logos">
              <a
                href="https://foot-centre.fff.fr/wp-content/uploads/sites/9/prehome/prehome/index.html"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="logos"
                  alt="logo site Ligue Centre Val de Loire"
                  src={web}
                />
              </a>
            </div>

            <div className="logos">
              <a
                href="https://www.youtube.com/channel/UCs6RtJ9tefoU0iRnTkNzD6Q"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="logos"
                  alt="logo Youtube Ligue Centre-Val de Loire"
                  src={yt}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clean;
