import React from 'react'
import {  Marker, Popup  } from "react-leaflet";
import useGeolocation from "../Hook/useGeolocation";
import UserMarker from '../../assets/CompressedPictures/UserMarker/UserMarker.webp';
import L from "leaflet";

import "../Clean/css/Popup.css"



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
        <Popup width={500} className="popLoc">
            <span className="LocalisationTexte">Vous êtes ici </span>
       <span className="LocalisationTexte2">Il y a <em className='nbrClub'>{props.clubsProches}
               </em>  clubs près de chez vous !</span>
        </Popup>
    </Marker>



  )
}

export default MarkersUser