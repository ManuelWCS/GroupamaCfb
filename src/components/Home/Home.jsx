import React from "react";
import "./Home.css";
import { MapContainer, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useEffect, useState } from "react";
import useGeolocation from "../Hook/useGeolocation";
import MarkerClusterGroup from "react-leaflet-markercluster";
import LogoClub from "../../assets/LogoClub.png";
import LogoLigue from "../../assets/MarqueurLigue.png";
import LogoLoiret from "../../assets/DistrictLoiret.png";
import LogoEure from "../../assets/EureEtLoire.png";
import LogoIndreLoire from "../../assets/IndreEtLoire.png";
import LogoLoireCher from "../../assets/LoireEtCher.png";
import LogoIndre from "../../assets/Marqueur-district-indre.png";
import LogoCher from "../../assets/Marqueur cher (1).png";
import Header from "../header/Header";
import Filters from "../filters/Filter";
import Loader from "../loader/Loader";

function Home() {
  const [instance, setInstance] = useState([]);
  const [club, setClub] = useState([]);
  const [equipe, setEquipe] = useState([]);
  const location = useGeolocation();
  const [countClose, setCountClose] = useState(0);
  const [latMin, setLatMin] = useState(0);
  const [latMax, setLatMax] = useState(0);
  const [lngMin, setLngMin] = useState(0);
  const [lngMax, setLngMax] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const MarkerLigue = L.icon({
    iconSize: [50, 50],
    iconAnchor: [23.5, 47],
    iconUrl: LogoLigue,
  });

  const MarkerLoiret = L.icon({
    iconSize: [50, 50],
    iconAnchor: [23.5, 47],
    iconUrl: LogoLoiret,
  });

  const MarkerEureEtLoire = L.icon({
    iconSize: [50, 50],
    iconAnchor: [23.5, 47],
    iconUrl: LogoEure,
  });

  const MarkerIndreEtLoire = L.icon({
    iconSize: [50, 50],
    iconAnchor: [23.5, 47],
    iconUrl: LogoIndreLoire,
  });

  const MarkerLoireEtCher = L.icon({
    iconSize: [50, 50],
    iconAnchor: [23.5, 47],
    iconUrl: LogoLoireCher,
  });

  const MarkerIndre = L.icon({
    iconSize: [50, 50],
    iconAnchor: [23.5, 47],
    iconUrl: LogoIndre,
  });

  const MarkerCher = L.icon({
    iconSize: [50, 50],
    iconAnchor: [23.5, 47],
    iconUrl: LogoCher,
  });

  const markerClub = L.icon({
    iconSize: [50, 50],
    iconAnchor: [23.5, 47],
    iconUrl: LogoClub,
  });

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
  }, [location]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/test")
      .then((res) => setClub(res.data));
  }, []);
  console.log(club);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/equipes")
      .then((res) => setEquipe(res.data));
  }, []);
  console.log(equipe);

  let setMap = [47.830261, 1.93609];

  return (
    <div className="FullHome">
      <Header />
      <Filters />
      <Loader />

      <MapContainer center={setMap} zoom={8} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[47.830261, 1.93609]} icon={MarkerLigue}>
          <Popup className="LiguePopUp">
            <a href="https://service-clubs.foot-centre.fr/">
              <img className="logoLigue" src={LogoLigue} />
              <h1>Ligue Centre Val de Loire </h1>
              <h2> {instance.info} </h2>
            </a>
          </Popup>
        </Marker>

        {location.loaded === true ? (
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>
              <h2>{countClose} Vous êtes ici !</h2>
            </Popup>
            <Circle
              center={[location.coordinates.lat, location.coordinates.lng]}
              radius={30000}
            />
          </Marker>
        ) : null}
       
        <Marker position={[47.11563, 2.35849]} icon={MarkerCher}>
          <Popup className="InstancePopUp">
            <a href="https://stage.foot-centre.fr">
              <img className="logoInstance" src={LogoCher} />
              <h1>District de Football du Cher </h1>
              <h2> {instance.info} </h2>
            </a>
          </Popup>
        </Marker>
        <Marker position={[48.42918, 1.46021]} icon={MarkerEureEtLoire}>
          <Popup className="InstancePopUp">
            <a href="https://stage.foot-centre.fr">
              <img className="logoInstance" src={LogoEure} />
              <h1>District de Football d'Eure Et Loire </h1>
              <h2> {instance.info} </h2>
            </a>
          </Popup>
        </Marker>
        <Marker position={[46.79267, 1.69726]} icon={MarkerIndre}>
          <Popup className="InstancePopUp">
            <a href="https://stage.foot-centre.fr">
              <img className="logoInstance" src={LogoIndre} />
              <h1>District de Football de l'Indre </h1>
              <h2> {instance.info} </h2>
            </a>
          </Popup>
        </Marker>
        <Marker position={[47.37913, 0.72672]} icon={MarkerIndreEtLoire}>
          <Popup className="InstancePopUp">
            <a href="https://stage.foot-centre.fr">
              <img className="logoInstance" src={LogoIndreLoire} />
              <h1>District de Football de l'Indre </h1>
              <h2> {instance.info} </h2>
            </a>
          </Popup>
        </Marker>
        <Marker position={[47.9168433, 1.9246721]} icon={MarkerLoiret} src="instance">
          <Popup className="InstancePopUp">
            <a href="">
              <img className="logoInstance" src={LogoLoiret} />
              <h1>District de Football du Loiret </h1>
              <h2> {instance.info} </h2>
            </a>
          </Popup>
        </Marker>

        <MarkerClusterGroup
          onClusterClick={(cluster) =>
            console.warn(
              "cluster-click",
              cluster,
              cluster.layer.getAllChildMarkers()
            )
          }
        >
          {club.map((clubs, index) => {
            return (
              <Marker position={[clubs.Lat, clubs.Longitude]} icon={markerClub}>
                <Popup className="clubPopUp">
                  <h1>{clubs.NomClub}</h1> <br></br>
                  <h2>{clubs.AdressePostale}</h2>
                  <br></br>
                  <h3>{clubs.MailClub}</h3>
                  <br></br>
                  <p>
                    {" "}
                    Le championnat : {clubs.NomChampionnat}
                    <br></br>
                    L'équipe : {clubs.NomEquipe}
                    <br></br>
                    ID : {clubs.NumClub}
                    <br></br>
                    Nom : {clubs.NomClub}
                    <br></br>
                  </p>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default Home;
