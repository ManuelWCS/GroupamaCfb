import React from "react";
/* import du CSS*/
import "./Clean.css";
import "../../components/Map/fonts.css";
/* import de la librairie Leaflet*/
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";


/* import du nécessaire React */
import  { useState, useEffect } from "react"
/* import du Hook nécessaire à la Geoloc */
import Geolocalisation from "../Hook/Geolocalisation";
/* import de la librairie axios qui nous permettra de récupérer des données */
import axios from "axios";
/* import des différents marqueurs*/
import ligueMarker from "../../assets/Marqueurs/MarqueurLigue.png";
import eureEtLoireMarker from "../../assets/Marqueurs/MarqueurEureEtLoire.png";
import clubMarker from "../../assets/Marqueurs/LogoClub.png";
import indreMarker from "../../assets/Marqueurs/MarqueurIndre.png";
import indreEtLoireMarker from "../../assets/Marqueurs/IndreEtLoire.png";
import loirEtcher from "../../assets/Marqueurs/LoireCher2.png";
import cherMarker from "../../assets/Marqueurs/MarqueurCher.png";
import loiretMarker from "../../assets/Marqueurs/Marqueurloiret.png";
import LabelMarker from "../../assets/CA/labelCA.png";
import agenceGroupama from '../../assets/img/agenceGroupama.png'
import marqueurG from '../../assets/Marqueurs/MarqueurG.png';
import labelCA from '../../assets/CA/labelCA.png';


/* import des données des clubs */
import data from "../../components/Map/data/data.json"








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
  console.log(formData)

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

  }
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
    iconSize: [57, 58],
    iconAnchor: [13.5, 47],
    iconUrl: LabelMarker,
  });

  const marqueurBanque = L.icon({
    iconSize: [38, 53],
    iconAnchor: [13.5, 47],
    iconUrl: agenceGroupama,
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
      console.log("pas de clubs labéliseys bro");
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







  return (
    <div className="BlocTel">
      <div className="BlocPresentation">
        <div className="mainPicture"></div>
        <h1 className="mainTitle">BIENVENUE</h1>
        <h3 className="mainDescription">TROUVEZ UN CLUB PRÈS DE CHEZ VOUS !</h3>
      </div>{" "}
      {/* Fin BlocPresentation*/}
      <div className="BlocTexte">
        <div className="textContainer">
          <h2 className="secondTitle">
            {" "}
            541 CLUBS DE FOOTBALL EN RÉGION CENTRE-VAL DE LOIRE
          </h2>
          <h4 className="descriptionText">
            La Ligue Centre-Val de Loire de Football et son partenaire Groupama
            vous proposent cette plateforme afin de découvrir l'ensemble des
            clubs de notre Région !
          </h4>
        </div>{" "}
        {/* Fin textContainer*/}
      </div>
      {/* Fin BlocPresentation*/}
      <div className="BlocBanniere">
        <h4 className="titleBanner"> À VOUS DE JOUER </h4>
      </div>{" "}
      {/* Fin BlocBanniere*/}

      <div className="BlocCarte">
      <p className= "instructions">
              Entrez votre âge et la compétition souhaitée pour découvrir les clubs à proximité
            </p>

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

              <Marker position={[47.845240, 1.924700]} icon={marqueurBanque}>
                <Popup className="banquePopUp">
                  <a href="https://groupama.fr/">
                    <h3>Groupama</h3>
                  </a>
                </Popup>
              </Marker>

            </MapContainer>

            <div className="markerLegend2">
              <div className="markerContainer">
                <img className="legendMarker1" alt="marqueur Groupama" src={marqueurG}></img>
                <span className="markerDescription">Votre position</span>
              </div>
              <div className="markerContainer">
                <img className="legendMarker2" alt="marqueur club" src={clubMarker}></img>
                <span className="markerDescription">Club de football</span>

              </div>

              <div className="markerContainer">
                <img className="legendMarker3" alt="club labéllisé Grouapama"src={labelCA}></img>
                <span className="markerDescription">Club labélllisé</span>

              </div>
              <div className="markerContainer">
                <img className="legendMarkerG" alt="Logo Groupama" src={agenceGroupama}></img>
                <span className="markerDescription"> Groupama</span>

              </div>


            </div>

          
      </div> {/* Fin de BlocCarte*/}


    </div>
  );
}

export default Clean;
