import React from "react";
import "./Mobile.css";
import Header from "../header/Header.jsx";
import Button from '../../assets/Boutons/buttontransparent.png'
import { useState, render, useEffect } from "react";
import axios from "axios";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Circle,
  useMapEvents,
} from "react-leaflet";
import Modal from './Modal';

const position = [47.830261, 1.93609];

function Mobile() {

    const [openModal, setOpenModal] = useState(false);
    const [allCities, setallCities] = useState([]);
    const [cityInput , setcityInput] = useState([]);

    useEffect(() => {
      axios.get("https://api-clubs-cvl.herokuapp.com/cities")
      .then((res) => setallCities(res.data))
    }, []);
    console.log(allCities)




        
  return (
    <div className="pageMobile">
        <Header/>
        <div className="toolBar">
            <button  className="openModalBtn" onClick={()=> {
                setOpenModal(true)
            }}>
                Comment ça marche
            </button>   
            { openModal && <Modal closeModal={setOpenModal}/>}
            
        </div>
        <div className="map">
      <MapContainer className="leaflet-container3"center={position} zoom={9} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

        </div> 
         {/* Fin div map  */}

         <div className="filtres">
             <div className="cityFilter">
             <span>VOTRE VILLE/CODE POSTAL </span>
             <select className="citySelector" type="text" name="city" id="" 
             
             />
             </div>
             <div className="categoriesFilter">
              
             <div className="categoryFilter">
             <span className="inputTitle">VOTRE CATEGORIE: </span>
             <input type="text" name="category" id="" />
             
             </div>
             </div>
             
             <img className="button" src={Button}></img> 
         </div>
    </div>
    // Fin de PageMobile
  );
}
export default Mobile;
