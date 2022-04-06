import React, {useEffect, useState} from 'react'
import {  Marker, Popup  } from "react-leaflet";
import useGeolocation from "../Hook/useGeolocation";
import dataClubs from '../Map/data/data.json';
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import LabelMarker from "../../assets/CA/labelCA.png";
import clubMarker from "../../assets/CompressedPictures/Markers/LogoClub.webp";





function MarkersClose(props) {

    const position = useGeolocation();
    const [markers, setMarkers] = useState([]);
    const [clubProche, setclubProche] = useState([])

    let clubsFiltres = markers.filter(function(clubProximite) {
        return(
        clubProximite.Latitude <= position.coordinates.lat + props.distance && clubProximite.Latitude >= position.coordinates.lat - props.distance  &&
        clubProximite.Longitude <= position.coordinates.lng +  props.distance  && clubProximite.Longitude >= position.coordinates.lng -  props.distance )

    })




    useEffect(() => {
        setMarkers(dataClubs);     
        console.log(position, 'coucou de la position')
        console.log(clubsFiltres, 'coucou des clubs filtres')
        setclubProche(clubsFiltres.length)
        console.log(clubProche, 'coucou du nombre de clubs proches')
    }, [position])

    const clubMarqueurLabel = L.icon({
        iconSize: [57, 58],
        iconAnchor: [13.5, 47],
        iconUrl: LabelMarker,
      });

      const clubMarqueur = L.icon({
        iconSize: [65, 60],
        iconAnchor: [13.5, 47],
        iconUrl: clubMarker,
      });
    

  

  return (
      <>

      {position.loaded === true ? (
        <>

        <MarkerClusterGroup
        animate={true}
        onClusterClick={(cluster) => 
        console.warn("cluster-click", cluster, cluster.layer.getAllChildMarkers()
        )}
        
        >
            
        {clubsFiltres.map((club, index) => (
            <Marker key={index} position={[club.Latitude, club.Longitude]}
            icon={ club.label.length > 0 ? 
                clubMarqueurLabel :
                clubMarqueur 
            }>
                <Popup className="markersPopUp">
                   {club.NomClub}
                </Popup>
            </Marker>
        ))}
                    </MarkerClusterGroup>




        </>
        ) : (
            <p>Chargement...</p>

      )}
  





      </>

    

  )
}
export default MarkersClose
