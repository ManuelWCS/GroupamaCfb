import React, {useEffect, useState} from 'react';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import '../Hook/useGeolocation';
import useGeolocation from '../Hook/useGeolocation';
import L from "leaflet";


/* Jeu de données */
import data from '../Map/data/data.json'
/* Marqueurs images */
import clubMarker from '../../assets/CompressedPictures/Markers/LogoClub.webp';
import LabelMarker from '../../assets/CA/labelCA.png';
/* import components */
import UserMarker from '../MarkersUtilisateur/MarkersUser.jsx';
import Instances from '../Instances/Instances.jsx';
import PositionMarker from '../MarkersUtilisateur/MarkersClose.jsx'

function MainContainer(props) {

/*Initialisation de la carte */

  const [map, setMap] = useState(null);

  const location = useGeolocation();

  const [proximityClubs, setProximityClubs] = useState([]);
  const [allClubs, setAllClubs]= useState([]);

  /* Charger les clubs dans l'état*/

  useEffect(() => {
    setAllClubs(data);
  }, [allClubs]);

  /* Initialiser la position de l'utilisateur*/
  const [latMin, setLatMin] = useState(0);
  const [latMax, setLatMax] = useState(0);
  const [lngMin, setLngMin] = useState(0);
  const [lngMax, setLngMax] = useState(0);
  const [isLocated, setIsLocated]=useState(false);
  const [convertedDistance, setConvertedDistance] = useState(0);

  // Hook qui permets de cacher et d'afficher les clubs
  const [isClubVisible, setIsClubVisible] = useState(true);
  const [isInstanceVisible, setIsInstanceVisible] = useState(true);

  useEffect(() => {
    if (location.loaded === true) {
      setIsLocated(true);
      setLatMin(location.coordinates.lat - props.convertedDistance);
      setLatMax(location.coordinates.lat + props.convertedDistance);
      setLngMin(location.coordinates.lng - props.convertedDistance);
      setLngMax(location.coordinates.lng + props.convertedDistance);
    } else {
      setIsLocated(false);
      setLatMin(47.902964);
      setLatMax(0);
      setLngMin(1.909251);
      setLngMax(0);
    }
  }, [location]);


  setProximityClubs(allClubs.filter(function (clubsNearUser) {
    return(
      clubsNearUser.Latitude <= latMax &&
      clubsNearUser.Latitude >= latMin &&
      clubsNearUser.Longitude <= lngMax &&
      clubsNearUser.Longitude >= lngMin
    )
  }));

  /* CALCULS DE POSITION */
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
 
  /* Marqueurs */
  const clubMarqueur = L.icon({
    iconSize: [65, 60],
    iconAnchor: [13.5, 47],
    iconUrl: clubMarker,
  });

  const clubMarqueurLabel = L.icon({
    iconSize: [57, 58],
    iconAnchor: [13.5, 47],
    iconUrl: LabelMarker,
  })
console.log(convertedDistance)

  return (
    <div className="mainContainer">
    <div className="mapContainer">
      <div className="BlocCarte">
        <MapContainer
          className="mapLeaflet"
          id="map"
          center={[47.90289, 1.90389]}
          zoom={11}
          scrollWheelZoom={true}
          minZoom={6}
          doubleClickZoom={true}
          zoomControl={true}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {location.loaded && !location.error ? (
            <UserMarker clubsProches={proximityClubs} />
          ) : (
            <Marker position={[latMin, lngMin]}>
              <Popup>
                Vous n'avez pas activé la localisation, votre position à
                été déinie par défault à Orléans !
              </Popup>
            </Marker>
          )}

          {isLocated === true ? (
            <Circle
              center={[
                location.coordinates.lat,
                location.coordinates.lng,
              ]}
              radius={props.rayon}
              pathOptions={{ color: "#748B9F" }}
            />
          ) : null}
          {isClubVisible === true ? (
            <PositionMarker distance={props.convertedDistance} />
          ) : null}

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
            {props.clubSearch.length !== 0
              ? props.clubSearch.slice(0, 500).map((res, index2) => {
                // console.log(res);
                return (
                  <Marker
                    icon={
                      res.label.length > 0
                        ? clubMarqueurLabel
                        : clubMarqueur
                    }
                    key={index2}
                    position={[res.Latitude, res.Longitude]}
                  >
                    <Popup key={index2} className="markersPopUp">
                      <p> {res.NomClub}</p>

                      <br></br>

                    {!location.error ? (
                      <h3>
                        Se trouve à{" "}
                        {distanceBetweenPoints(
                          location.coordinates.lat,
                          location.coordinates.lng,
                          res.Latitude,
                          res.Longitude
                        )}{" "}
                        km de vous !
                      </h3>
                    ) : null }
                    
                      <p>
                      {!location.error ? (

                        <a
                          href={`https://www.google.fr/maps/dir/${location.coordinates.lat},${location.coordinates.lng}+/${res.Latitude},+${res.Longitude}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Itinéraire vers ce club
                        </a>
                      ) : <p> Activez la localisation pour voir un itinéraire vers ce club ! </p> }

                      </p>
                    </Popup>
                  </Marker>
                );
              })
              : null}
          </MarkerClusterGroup>

          {isInstanceVisible === true ? <Instances /> : null}
        </MapContainer>
      </div>
      </div>
</div>

  )
}

export default MainContainer