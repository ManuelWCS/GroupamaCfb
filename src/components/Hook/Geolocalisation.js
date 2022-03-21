import React, { useEffect } from 'react';
import {Marker, Popup, map } from "react-leaflet";
import L from "leaflet";
import '../Map/Map.css'
import { useState } from 'react';

import marqueurUtilisateur from '../../assets/CompressedPictures/Markers/userMarker.png'



function Geolocalisation() {
    
    const [map, SetMap] = useState(null)
    const [positionFound, setPositionFound] = useState(null)

    
    
    L.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
      });

      const utilisateurMarqueur = L.icon({
          iconSize:[45,60],
          iconAnchor: [22, 55],
          iconUrl:  marqueurUtilisateur,
      })


      useEffect(() => {
        map.locate().on("locationfound", function(e) {
            setPositionFound(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            
 })
    }, [map]);

    return positionFound === null ? "Geolocalisation not supported" : (
        <Marker className="MyPosition"position={positionFound} icon={utilisateurMarqueur} >
        <Popup className="userPopUp">
            <h3> Vous êtes ici</h3>
        </Popup>
        </Marker>
    )




}

export default Geolocalisation
