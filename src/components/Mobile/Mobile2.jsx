import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Select from 'react-select';
import L from "leaflet";
import Header from "../header/Header";
import "./Mobile2.css";
import popupBtn from '../../assets/Boutons/howitworks.png'
import webLogo2 from '../../assets/footer/web.png';
import ytLogo from '../../assets/footer/youtube.png';
import fbLogo from '../../assets/footer/fb.png';




export default function Leaflet() {

    const [gender, setGender] = useState("")
    console.log(gender)
 
     


     function LocationMarker() {
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);
        L.icon({
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
            iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
        });

        const map = useMap();
        
         useEffect(() => {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
                const radius = e.accuracy;
                const circle = L.circle(e.latlng, radius + 1000);
                circle.addTo(map);
                setBbox(e.bounds.toBBoxString().split(","));
            });
        }, [map]);

        return position === null ? null : (
            <Marker position={position} >
                <Popup>
                    You are here. <br />
                </Popup>
            </Marker>
        );
    }

    return (
        <div className="fullContent">

            <Header />
            <div className="content">
                <div className="mainTitleDiv">
                    <h1 className="mainTitle">Trouvez un club près </h1>
                    <h1 className="mainTitle"> de chez <b className="strong">vous</b> !</h1></div>

                <div className="popupContainer">
                    <img className="popUp" src={popupBtn}></img></div>

                <div className="mobileContent">

                    <div className="mapContent">

                        <MapContainer
                            className="leafletContainer4"
                            center={[48.856614, 2.3522219
                            ]}
                            zoom={13}
                            scrollWheelZoom
                            style={{ height: "100vh" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker />
                        </MapContainer>
                    </div>

                    <div className="filters">
                        <div className="filtersWrapper">

                        <div className="agefilterContainer">
                            <span className="ageTitle"> VOTRE AGE</span>
                            <input className="ageInput" type='text' placeholder=""></input>

                        </div>

                        <div className="genderContainer">  
                        <span className="genderTitle">COMPETITION :</span> 
                        <div className="genderWrapper">

                      <label className="genderChoice" htmlFor="man">
                      Masculine<input 
                      type="radio" 
                      value="Male"
                      checked={gender === 'Male'}
                      onClick={() => setGender('Male')}
                      
                      /></label>

                            
                      <label className="genderChoice"  htmlFor="woman">
                      Féminine<input type="radio" 
                      value="Female"
                      checked={gender === 'Female'}
                      onClick={() => setGender('Female')}
                      /></label></div></div>

                      <div className="categoryContainer">
                          <span className="categoryTitle">CATEGORIE :</span>
                          <div className="categoryWrapper">
                          <span className="categorySelected"> Libre foot anim</span>

                          </div>

                      </div>





                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
