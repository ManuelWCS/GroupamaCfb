import React, {useState, useEffect } from 'react';
import {Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import '../Map/Map.css'
import marqueurUtilisateur from '../../assets/CompressedPictures/MarqueurG.webp'



function Geolocalisation() {
    const [positionFound, setPositionFound] = useState(null)
    
    L.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
      });

      const userMarker = L.icon({
        iconSize: [58, 53],
        iconAnchor: [13.5, 47],
        iconUrl: marqueurUtilisateur,
      });

      const map = useMap();

      useEffect(() => {
          map.locate().on("locationfound", function(e) {
              setPositionFound(e.latlng);
              map.flyTo(e.latlng, map.getZoom());
              const radius = e.accuracy;
              const circle = L.circle(e.latlng, radius + 1000);
              circle.addTo(map); 
   })
      }, [map]);

    return positionFound === null ? "Geolocalisation not supported" : (
        <Marker className="MyPosition"position={positionFound} icon={userMarker} >
        <Popup className="userPopUp">
            <h3> Vous êtes ici</h3>
        </Popup>
        </Marker>
    )




}

export default Geolocalisation
