import React from "react";
import "./Home.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { icon, popup } from "leaflet";
import L from "leaflet";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [instance, setInstance] = useState([]);

  const markerInstance = L.icon({
    iconSize: [60, 60],
    iconAnchor: [40, 60],
    iconUrl: Marker,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/instances")
      .then((res) => setInstance(res.data));
  }, []);
  console.log(instance);

  let setMap = [47.830261, 1.93609];

  return (
    <MapContainer center={setMap} zoom={8} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[47.830261, 1.93609]}>
        <Popup>
          <a href="https://stage.foot-centre.fr">
            <h1>Ligue Centre Val de Loire </h1>
            <h2> {instance.info} </h2>
          </a>
        </Popup>
      </Marker>

      {instance.map((instances) => {

        return (
        <Marker position={[instances.lat, instances.long]}>
          <Popup>
            <h1>{instances.name}</h1>
            <h1>{instances.info}</h1>
          </Popup>
        </Marker>)
      })}
    </MapContainer>
  );
}

export default Home;
