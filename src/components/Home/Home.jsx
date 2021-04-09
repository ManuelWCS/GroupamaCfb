import React from "react";
import "./Home.css";
import { MapContainer, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useEffect, useState } from "react";
import LogoClub from "../../assets/LogoClub.png";
import LogoLigue from "../../assets/logoLigue.png";
import useGeolocation from '../Hook/useGeolocation';

function Home() {
  const [instance, setInstance] = useState([]);
  const [club, setClub] = useState([]);
  const location = useGeolocation();
  const [countClose, setCountClose] = useState(0);
  const [latMin, setLatMin] = useState(0)
  const [latMax, setLatMax] = useState(0)
  const [lngMin, setLngMin] = useState(0)
  const [lngMax, setLngMax] = useState(0)

  const markerInstance = L.icon({
    iconSize: [60, 60],
    iconAnchor: [40, 60],
    iconUrl: Marker,
  });

  const markerClub = L.icon({
    iconSize: [50, 50],
    iconAnchor: [40, 60],
    iconUrl: LogoClub,
  });

  const markerLigue = L.icon({
    iconSize: [70, 70],
    iconAnchor: [40, 60],
    iconUrl: LogoLigue,
  });


  useEffect(() => {
    if (location.loaded === true) {
      setLatMin(location.coordinates.lat - 0.180227)
      setLatMax(location.coordinates.lat + 0.180227)
      setLngMin(location.coordinates.lng - 0.246349)
      setLngMax(location.coordinates.lng + 0.246349)
    } else {
      setLatMin(0)
      setLatMin(0)
      setLngMin(0)
      setLngMax(0)
    }
  }, [location])

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/instances")
      .then((res) => setInstance(res.data));
  }, []);
  console.log(instance);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/test")
      .then((res) => setClub(res.data));
  }, []);
  console.log(club);

  let setMap = [47.830261, 1.93609];

  return (
    
    <MapContainer center={setMap} zoom={8} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={[47.830261, 1.93609]}>
        <Popup className="LiguePopUp">
          <a href="https://stage.foot-centre.fr">
            <img className="logoLigue" src={LogoLigue} />
            <h1>Ligue Centre Val de Loire </h1>
            <h2> {instance.info} </h2>
          </a>
        </Popup>
      </Marker>

      {location.loaded === true ?
          <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
            <Popup>
              <h2>{countClose} Vous êtes ici !</h2>
            </Popup>
            <Circle center={[location.coordinates.lat, location.coordinates.lng]} radius={10000} />
          </Marker>
          : null}
      {instance.map((instances) => {
        return (
          <Marker position={[instances.lat, instances.long]}>
            <Popup>
              <h1>{instances.name}</h1>
              <h1>{instances.info}</h1>
            </Popup>
          </Marker>
        );
      })}
       
      {club.slice(0, 1000).map((clubs) => {
        return (
          <Marker position={[clubs.Lat, clubs.Long]} icon={markerClub}>
            <Popup>
              <h1>{clubs.NomClub}</h1>
              <h2>{clubs.AdressePostale}</h2>
              <h3>{clubs.MailClub}</h3>
            </Popup>
          </Marker>
        );
      })}
     
    </MapContainer>
  );
}

export default Home;
