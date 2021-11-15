import { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';

function Clubsfiltres() {

    const [ville, setVille] = useState([])

    useEffect(() => {
        axios
          .get("http://localhost:8000/api/equipes")
          .then((res) => setVille(res.data));
      }, []);
      console.log(ville);
    return (
        <div>
          {ville.map((villes, index) => {
              return (
                  <div> <p>début </p>
                      <p> "name" : "{villes.NomChampionnat}",</p>
                      <p> "Adresse" : "{villes.AdressePostale}",</p>
                      <p>"Mail": "{villes.MailClub}",</p>
                      <p>"Localite" : "{villes.Localite}",</p>
                      <p>"Equipe": "{villes.NomEquipe}",</p>
                      <p>"Club": "{villes.NomClub}",</p>        
                      <p>"Latitude": {villes.Lat}, </p>
                      <p>"Longitude": {villes.Longitude} ,</p>   
                      <p>"Category" : "{villes.Category}"</p>           

                    <p>fin </p>
                    
                  </div>
              )
          })}
            
        </div>
    )
}

export default Clubsfiltres
