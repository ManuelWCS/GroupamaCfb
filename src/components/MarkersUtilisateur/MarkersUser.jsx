import React from 'react'
import {  Marker, Popup  } from "react-leaflet";
import useGeolocation from "../Hook/useGeolocation";
import UserMarker from '../../assets/CompressedPictures/UserMarker/UserMarker.webp';
import L from "leaflet";



function MarkersUser(props) {

    const position = useGeolocation();

    const MarqueurUtilisateur = L.icon({
      iconSize: [55, 55],
      iconAnchor: [13.5, 47],
      iconUrl: UserMarker,
    });
  

  return (
    <Marker position={[position.coordinates.lat, position.coordinates.lng]}
    icon={MarqueurUtilisateur}>
        <Popup>
            <span>Vous êtes ici <br>
            </br> Il y a {props.clubsProches} clubs près de chez vous !</span>
        </Popup>
    </Marker>



  )
}

export default MarkersUser