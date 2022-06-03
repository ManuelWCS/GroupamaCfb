import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import useGeolocation from "../Hook/useGeolocation";
import dataClubs from "../Map/data/data.json";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import LabelMarker from "../../assets/CA/labelCA.png";
import clubMarker from "../../assets/CompressedPictures/Markers/LogoClub.webp";

function MarkersClose(props) {
  const position = useGeolocation();
  const [markers, setMarkers] = useState([]);
  const [clubProche, setclubProche] = useState([]);

  let clubsFiltres = markers.filter(function (clubProximite) {

    if(position.coordinates ) {
      return (
        clubProximite.Latitude <= position.coordinates.lat + props.distance &&
        clubProximite.Latitude >= position.coordinates.lat - props.distance &&
        clubProximite.Longitude <= position.coordinates.lng + props.distance &&
        clubProximite.Longitude >= position.coordinates.lng - props.distance
      );
    }
    else {
      return null ;
    }

  });

  useEffect(() => {
    setMarkers(dataClubs);
    setclubProche(clubsFiltres);
    console.log(clubProche)
  }, [position]);


  
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

  function distanceBetweenPoints(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    var e = d.toFixed(2);
    return e;
  }

  //deg2rad function
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <>
      {position.loaded === true ? (
        <>
          <MarkerClusterGroup
            animate={true}
            onClusterClick={(cluster) =>
              console.warn(
                "cluster-click",
                cluster,
                cluster.layer.getAllChildMarkers()
              )
            }
          >
            {clubsFiltres.map((club, index) => (
              <Marker
                key={index}
                position={[club.Latitude, club.Longitude]}
                icon={club.label.length > 0 ? clubMarqueurLabel : clubMarqueur}
              >
                <Popup className="markersPopUp" width={300} >
                <h3 className="TitlePopUp">  {club.NomClub}</h3>
                  <h3 className="DistancePopUp">
                    Se trouve à{" "}<em className="distanceNumber">
                    {distanceBetweenPoints(
                      position.coordinates.lat,
                      position.coordinates.lng,
                      club.Latitude,
                      club.Longitude
                    )}{" "}
                    km de vous{" "}</em>
                  </h3>
                  <p>
                   
                    <a
                      href={`https://www.google.fr/maps/dir/${position.coordinates.lat},${position.coordinates.lng}+/${club.Latitude},+${club.Longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      className="DirectionsPopUp2"
                    >{" "}&#8627;	
                    Itinéraire vers ce club{" "}</a>
                  </p>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          )
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </>
  );
}
export default MarkersClose;
