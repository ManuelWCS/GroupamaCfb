import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import "./Map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import btnPicture from "../../assets/Boutons/buttontransparent.png";
import axios from "axios";
import Geolocalisation from "../Hook/Geolocalisation";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import clubMarker from "../../assets/Marqueurs/LogoClub.png";
import indreMarker from "../../assets/Marqueurs/MarqueurIndre.png";
import indreEtLoireMarker from "../../assets/Marqueurs/IndreEtLoire.png";
import loirEtcher from "../../assets/Marqueurs/LoireCher2.png";
import cherMarker from "../../assets/Marqueurs/MarqueurCher.png";
import loiretMarker from "../../assets/Marqueurs/Marqueurloiret.png";
import eureEtLoireMarker from "../../assets/Marqueurs/MarqueurEureEtLoire.png";
import ligueMarker from "../../assets/Marqueurs/MarqueurLigue.png";
import "./Responsive.css";
import fb from "../../assets/footer/fb.png";
import yt from "../../assets/footer/youtube.png";
import web from "../../assets/footer/web.png";
import defaultMaker from "../../assets/Marqueurs/defaultMarker.png";
import label from "../../assets/Marqueurs/label.png";
import markerCM2 from "../../assets/Marqueurs/CM2.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import data from "./data/data.json";
import LabelMarker from '../../assets/Marqueurs/label.png';

function Mobile3() {
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
    fontFamily: "Century",
    bgcolor: "background.paper",
    border: "2px solid #3586c2 ",
    boxShadow: 24,
    borderRadius: 12,
    p: 4,
  };
  const [clubs, setClubs] = useState([]);

  // Paramétrage des inputs radio lors de la sélection

  const [inputLoisir, setinputLoisir] = useState(false);
  const [inputFutsal, setinputFutsal] = useState(false);
  // const [inputFutsal18, setinputFutsal18] = useState(false);

  const LigueMarqueur = L.icon({
    iconSize: [40, 50],
    iconAnchor: [13.5, 47],
    iconUrl: ligueMarker,
  });
  const eureEtLoirMarqueur = L.icon({
    iconSize: [50, 50],
    iconAnchor: [13.5, 47],
    iconUrl: eureEtLoireMarker,
  });

  const loiretMarqueur = L.icon({
    iconSize: [70, 50],
    iconAnchor: [13.5, 40],
    iconUrl: loiretMarker,
  });

  const cherMarqueur = L.icon({
    iconSize: [60, 50],
    iconAnchor: [13.5, 47],
    iconUrl: cherMarker,
  });

  const loireEtcherMarqueur = L.icon({
    iconSize: [40, 50],
    iconAnchor: [13.5, 47],
    iconUrl: loirEtcher,
  });
  const indreMarqueur = L.icon({
    iconSize: [40, 50],
    iconAnchor: [13.5, 47],
    iconUrl: indreMarker,
  });

  const indreEtLoirMarqueur = L.icon({
    iconSize: [55, 50],
    iconAnchor: [13.5, 47],
    iconUrl: indreEtLoireMarker,
  });

  const clubMarqueur = L.icon({
    iconSize: [50, 50],
    iconAnchor: [13.5, 47],
    iconUrl: clubMarker,
  });

  const clubMarqueurLabel = L.icon({
    iconSize:[40,50],
    iconAnchor: [13.5, 47],
    iconUrl: LabelMarker
  })

  const marqueurBanque = L.icon({
    iconSize: [45, 58],
    iconAnchor: [13.5, 47],
    iconUrl: markerCM2,
  });

  const searchClub = (e) => {
    e.preventDefault();
    let filtersOptions = [];

    // Si le genre est renseigné, filtre fonctionnel
    if (formData.gender !== null) {
      if (formData.gender.length > 0) {
        // je pousse le filtre dans un tableau
        filtersOptions.push(
          // ici on fais un includes car on la data avec laquelles on compare c'est un array
          // item.gender: ["male","female]
          (item) => item.gender.includes(formData.gender)
        );
      }
    }

    if (formData.city !== null) {
      if (formData.city.length > 0) {
        filtersOptions.push((item) => item.Localite === formData.city);
      }
    }

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

    // Pour les type il faut que tu creer un tableau dans une variable
    let categorieType = [];
    // aprés tu check si type n'est pas null
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
      console.log("There are no available locations");
    } else {
      const arrayOfLatLngs = resultofSearch.map(({ Latitude, Longitude }) => [
        Latitude,
        Longitude,
      ]);
      const bounds = L.latLngBounds(arrayOfLatLngs);
      if (map) map.flyToBounds(bounds);
    }

    if (resultofSearch.Label !== null) {
      console.log('je suis un club labelisé ')
    } else {
      console.log('pas de clubs labéliseys bro')
      
    }

    setclubSearch(resultofSearch);
    console.log(resultofSearch)
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
      if(formData.type === "Futsal"){
        setformData(state =>({...state, type: ""}))
      }
    } else {
      setinputFutsal(false);
    }
  }, [formData]);

  return (
    <div className="fullPage" id="top">
      <Header id="header" />

      <div className="mobiletitleContainer">
        <h1 className="titlePart1">Trouvez un club près</h1>
        <h1 className="titlePart2">
          de chez <strong className="strong"> vous !</strong>{" "}
        </h1>
      </div>

      <div className="titleContainerDesktop">
        <h1 className="titlePart1">
          Trouvez un club près de chez{" "}
          <strong className="strong"> vous !</strong>{" "}
        </h1>
        <section className="legendMap">
          <p className="legend">
            Entrez votre date de naissance et la compétition souhaitée pour
            découvrir les clubs à proximité !{" "}
          </p>
        </section>
      </div>

      <div className="subContainer">
        <main className="mapContainer">
          <div
            className={
              clubSearch.length === 0 ? "mapNoSearch" : "maplegendWrapper"
            }
          >
            <h2 className="titleMapContainer">CARTE </h2>

            <MapContainer
              className="mapLeaflet"
              id="map"
              center={[48.856614, 2.3522219]}
              zoom={13}
              scrollWheelZoom={true}
              minZoo={6}
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
                    console.log(res)
                      return (
                        <Marker
                          icon={res.label.length  >0 ? clubMarqueurLabel : clubMarqueur}
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
                  <a href="https://foot-centre.fff.fr//">
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
              <Marker position={[48.42918, 1.46021]} icon={eureEtLoirMarqueur}>
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
              <Marker position={[47.9168433, 1.9246721]} icon={loiretMarqueur}>
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

              <Marker position={[47.37913, 0.72672]} icon={indreEtLoirMarqueur}>
                <Popup className="InstancePopUp">
                  <a href="https://indre-et-loire.fff.fr/">
                    <h3>District de Football d'Indre-Et-Loire'</h3>
                  </a>
                </Popup>
              </Marker>

              <Marker position={[47.899658, 1.87928]} icon={marqueurBanque}>
                <Popup className="banquePopUp">
                  <a href="https://www.creditmutuel.fr/fr/particuliers.html">
                    <h3>Banque du Crédit Mutuel</h3>
                  </a>
                  
                </Popup>
              </Marker>
            </MapContainer>

            <div className="markerLegend">
              <div className="marker1">
                <img src={defaultMaker} alt="Marqueur par défaut" />
                <p className="markerDescription"> Votre position</p>
              </div>

              <div className="marker2">
                <img
                  className="markerPicture"
                  alt="Marqueur Club"
                  src={clubMarker}
                />
                <p className="markerDescription"> Club de foot</p>
              </div>

              <div className="marker3">
                <img
                  className="markerPicture2"
                  alt="Marqueur Club labélisé"
                  src={label}
                />
                <p className="markerDescription"> Club labelisé</p>
              </div>

              <div className="marker4">
                <img
                  className="markerPicture2"
                  alt="Marqueur Crédit Mutuel"
                  src={markerCM2}
                />
                <p className="markerDescription"> Crédit Mutuel</p>
              </div>
            </div>
          </div>
        </main>
        <div className="legendAndForm">
          <section className="legendMapMobile">
            <p className="legend">
              Entrez votre date de naissance et la compétition souhaitée pour
              découvrir les clubs à proximité !{" "}
            </p>
          </section>

          <div
            className={
              clubSearch.length === 0 ? "filtersNoSearch" : "filtrations"
            }
          >
            <h3 className="formTitle"> À VOUS DE JOUER ! </h3>
            <form
              className="filtrationsWrapper"
              onSubmit={(e) => searchClub(e)}
            >
              <div className="filtre1">
                <span className="filterTitle1">VOTRE ÂGE </span>
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

              <div className="filtre2">
                <FormControl component="fieldset" required={true}>
                  <span className="filterTitle2">GENRE :</span>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender"
                    error="Vous devez renseigner une compétition"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value === "Male") {
                        setformData({ ...formData, gender: e.target.value });
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

              <div className="filtre4">
                <FormControl component="fieldset" required={true}>
                  <span className="filterTitle4">PRATIQUE SOUHAITEE :</span>
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
                      title="Pratique proposée aux seniors exclusivement"
                    />
                    <FormControlLabel
                      disabled={inputFutsal}
                      className="radio1"
                      value="Futsal"
                      control={<Radio />}
                      label="Futsal"
                      title="Pratique proposée aux séniors homme et aux 17-18 masculins"
                      // disable={inputFutsal}
                    />
                  </RadioGroup>

                  <div className="modalDiv">
                    <Button className="modalTitle" onClick={handleOpen}>
                      <div className="btnOpenPopup">
                        <p className="btnTextPopUp">
                          Détails sur les catégories
                        </p>
                      </div>
                    </Button>
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
                            Informations complémentaires sur les catégories :
                          </p>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <p className="boldText">Libre : </p>
                          <p className="popupText">
                            Football en compétiton à 11 joueurs
                          </p>
                          <p className="boldText"> Loisir :</p>
                          <p className="popupText">
                            {" "}
                            Pratique proposée aux seniors exclusivement
                          </p>

                          <p className="boldText">Futsal : </p>
                          <p className="popupText">
                            {" "}
                            Pratique proposée aux seniors Homme et aux 17-18 ans
                            Hommes
                          </p>
                          <div onClick={handleClose} className="btnClosePopUp">
                            <p onClick={handleClose}>FERMER</p>
                          </div>
                        </Typography>
                      </Box>
                    </Modal>
                  </div>
                </FormControl>
              </div>

              <div className="filtre3">
                <span className="filterTitle3"> VOTRE VILLE </span>
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
                  sx={{ width: 245 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Rechercher" />
                  )}
                />
              </div>

              <div className="btnContainer" id="test">
                <button
                  className="btnBackground"
                  id="scrollBtn"
                  type="submit"
                  onClick={scrollTop}
                >
                  <img
                    className="findclubBtn"
                    alt="trouvez votre club"
                    src={btnPicture}
                  />
                </button>
              </div>

              <div className="btnContainer" id="test2">
                <button className="btnBackground" id="scrollBtn" type="submit">
                  <img
                    className="findclubBtn"
                    alt="trouvez votre club"
                    src={btnPicture}
                  />
                </button>
              </div>
            </form>
          </div>

          <div className={clubSearch.length === 0 ? "hide" : "resultats"}>
            <p className="resultText">
              Il y a {clubSearch.length} résultat(s) correspondant à votre
              recherche{" "}
            </p>

            {clubSearch.length !== 0
              ? clubSearch.map((clubSelected, Uniqueindex) => {
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
                              href={`mailto:${clubSelected.Mail}?subject=[CFB] "Entrez l'objet de votre demande "`}
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
                            <img className={clubSelected.label.length >0 ? "labelClub" : "labelHide" }src={clubSelected.label.length >0 ? LabelMarker : null} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className={clubSearch.length === 0 ? "hide" : "resultatsDesktop"}>
          <p className="resultText">
            Il y a {clubSearch.length} résultats correspondant à votre recherche{" "}
          </p>

          {clubSearch.length !== 0
            ? clubSearch.map((clubSelected, Uniqueindex) => {
                return (
                  <div className="cardResult" key={Uniqueindex}>
                    <div className="titleContainer">
                      <span className="titleCard">{clubSelected.NomClub}</span>
                    </div>

                    <div className="columnContainer">
                      <div className="column1">
                        <div className="logo1"></div>
                        <div className="logo2"></div>
                        <div className="logo3"></div>
                      </div>
                      <div className="column2">
                        <div className="info1">
                          <a
                            className="mail"
                            href={`mailto:${clubSelected.Mail}?subject=[CFB] "Entrez l'objet de votre demande "`}
                          >
                            {" "}
                            {clubSelected.Mail}{" "}
                          </a>{" "}
                        </div>
                        <div className="info2">
                          {clubSelected.AdressePostale}
                        </div>
                        <div className="info3">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://foot-centre.fff.fr/recherche-clubs/?query=${clubSelected.Localite} `}
                          >
                            Voir plus d'infos{" "}
                          </a>   <img className={clubSelected.label.length >0 ? "labelClubDesktop" : "labelHide" }src={clubSelected.label.length >0 ? LabelMarker : null} />{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      {/* <div className="creditMutuel" id="logo">
        <a href="https://www.creditmutuel.fr/home/index.html" target="_blank" rel="noreferrer">
          <p className="logoDescription"> Plateforme soutenue par le Crédit Mutuel</p>
          <img className="creditLogo" alt="logo CréditMutuel" src={CM} /></a>
          <div className="linksCM">
            <div className="linklogoCM1">
              <a href="https://www.creditmutuel.fr/home/index.html" target="_blank " rel="noreferrer">
              <img src={webCM} alt="logo site web Crédit Mutuel" className="logowebCM"/>

              </a>
              </div>
            
            <div className="linklogoCM2">
              <a href="https://www.facebook.com/creditmutuel" target="_blank" rel="noreferrer">
              <img src={fbCM} alt="logo Facebook Crédit Mutuel" className="logowebCM"/></a>


            </div>
          </div>
      </div>  */}

      <div className="footHeure">
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
  );
}

export default Mobile3;
