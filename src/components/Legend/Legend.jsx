import React from 'react'
import './Legend.css';
/* <<<<<<<<<<<<<<<<<<<<<<<<<IMPORT MARQUEURS LEGENDE  >>>>>>>>>>>>>>>>>>>>*/

import userMarker from '../../assets/CompressedPictures/Markers/userMarker.png';
import clubMarker from '../../assets/CompressedPictures/Markers/clubMarker.png';
import markerAgence from '../../assets/CompressedPictures/Markers/markerAgence.png';
import labelMarker from '../../assets/CompressedPictures/Markers/labelMarker.png'
import LigueMarker from '../../assets/CompressedPictures/Markers/MarqueurLigue.webp'



function Legend() {
  return (
    <div className="legendContainer">
    <div className="markerContainer">
      <div className="markerWrapper">
        <img src={userMarker} className="legendMarker1" alt="Marqueur Utilisateur / User Marker"/>
        <span className="markerDescription">Votre position</span>
      </div>
      <div className="markerWrapper">
        <img src={clubMarker} className="legendMarker2" alt="Marqueur club de Football" />
        <span className="markerDescription">Club de football</span>
      </div>

      <div className="markerWrapper">
        <img src={LigueMarker} className="legendMarker" alt="Marqueur Groupama" />
        <span className="markerDescription">Insitutions Fédérales</span>
      </div>

      <div className="markerWrapper">
        <img src={labelMarker} className="legendMarker3" alt="Marqueur Club Labellisé "/>
        <span className="markerDescription">Club labéllisé</span>
      </div>
    </div>
  </div>
  )
}

export default Legend