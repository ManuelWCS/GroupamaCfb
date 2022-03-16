import React from 'react';
import L from "leaflet";
import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";


/*<------------------------IMPORT IMAGES MARKERS ---------------------------------> */

import ligueMarker from "../../assets/CompressedPictures/Markers/MarqueurLigue.webp";
import eureEtLoireMarker from "../../assets/CompressedPictures/Markers/Marqueur-Eure-et-Loir.webp";
import indreMarker from "../../assets/CompressedPictures/Markers/Marqueur-Indre.webp";
import indreEtLoireMarker from "../../assets/CompressedPictures/Markers/Marqueur-Indre-et-Loire.webp";
import loirEtcher from "../../assets/CompressedPictures/Markers/Marqueur-Loir-et-Cher.webp";
import cherMarker from "../../assets/CompressedPictures/Markers/Marqueur-Cher.webp";
import loiretMarker from "../../assets/CompressedPictures/Markers/Marqueur-Loiret.webp";
import agenceGroupama from "../../assets/CompressedPictures/Markers/MarqueurGroupama.webp";

/* CSS STYLES DES TITRES */
import './Instances.css'


function Instaces() {
   

    const LigueMarqueur = L.icon({
        iconSize: [50, 60],
        iconAnchor: [13.5, 47],
        iconUrl: ligueMarker,
      });
      const eureEtLoirMarqueur = L.icon({
        iconSize: [50, 60],
        iconAnchor: [13.5, 47],
        iconUrl: eureEtLoireMarker,
      });
    
      const LoiretMarqueur = L.icon({
        iconSize: [50, 60],
        iconAnchor: [13.5, 40],
        iconUrl: loiretMarker,
      });
    
      const cherMarqueur = L.icon({
        iconSize: [50, 60],
        iconAnchor: [13.5, 47],
        iconUrl: cherMarker,
      });
    
      const LoirEtcherMarqueur = L.icon({
        iconSize: [50, 60],
        iconAnchor: [13.5, 47],
        iconUrl: loirEtcher,
      });
      const indreMarqueur = L.icon({
        iconSize: [50, 60],
        iconAnchor: [13.5, 47],
        iconUrl: indreMarker,
      });
    
      const indreEtLoirMarqueur = L.icon({
        iconSize: [50, 60],
        iconAnchor: [13.5, 47],
        iconUrl: indreEtLoireMarker,
      });
      const marqueurBanque = L.icon({
        iconSize: [38, 53],
        iconAnchor: [13.5, 47],
        iconUrl: agenceGroupama,
      });


      let dataMarkers = [
        {
            name : "Ligue Centre-Val de Loire",
            position: [47.830261, 1.93609],
            link: "https://foot-centre.fff.fr/",
            icon: LigueMarqueur,
            id: 1,
          
    
        },
        {
            name : "District de Football du Cher",
            position: [47.11563, 2.35849],
            link: "https://cher.fff.fr/",
            icon: cherMarqueur,
            id: 2     
    
        },
        {
            name : "District de Football d'Eure Et Loir",
            position: [48.42918, 1.46021],
            link: "https://eure-et-loir.fff.fr/",
            icon: eureEtLoirMarqueur,
            id: 3
    
        },
        {
            name : "District de Football de l'Indre ",
            position: [46.79267, 1.69726],
            link: "https://indre.fff.fr/",
            icon: indreMarqueur,
            id: 4
    
        },
        {
            name : "District de Football du Loiret",
            position: [47.9168433, 1.9246721],
            link: "https://foot-loiret.fff.fr/",
            icon: LoiretMarqueur,
            id: 5      
    
        },
        {
            name : "District de Football du Loir-et-Cher",
            position: [47.5766331, 1.3026806],
            link: "https://loir-et-cher.fff.fr/",
            icon: LoirEtcherMarqueur,
            id: 6      
    
        },
        {
            name : "District de Football d'Indre-Et-Loire",
            position: [47.37913, 0.72672],
            link: "https://indre-et-loire.fff.fr/",
            icon: indreEtLoirMarqueur,
            id: 7
        },
    
        // {
        //     name : "Agence Groupama",
        //     position: [47.84524, 1.9247],
        //     link: "https://groupama.fr/",
        //     icon: marqueurBanque,
        //     id: 8
        // },
    
    
    ]


const [markers, setMarkers] = useState([]);

useEffect(() => {
    setMarkers(dataMarkers);
  }, []);

  



  return (
    <>
   

    {markers.map((marker, index) => {
        return (
            <Marker 
            icon={marker.icon}
            key={index}
            position={marker.position}>
                <Popup key={index}>
                  <a href={marker.link}>
                    <p className='mapMarkers'>{marker.name}</p>
                    </a>
                </Popup>
            </Marker>
        )
    })}
    
    </>
  )
}

export default Instaces