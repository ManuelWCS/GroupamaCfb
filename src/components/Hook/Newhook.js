import { useState, useEffect } from "react";

const useGeolocation = () => {

    /*J'initialise un objet qui contiendra la position de l'utilisateur dans le navigateur */
    const [location, setLocation] = useState({
        loaded: false,
        coords : {
            lat:"",
            lng:""
        },
    });

    const PositionSucces = (location) => {
        setLocation({
            loaded: true,
            coordinates : {
                lat:location.coords.latitude,
                lng: location.coords.longitude
            },
        });
    }

    const PositionError = (errorMessage) => {
        let message = `S'il vous plaît veuillez activer la localisation de votre appareil pour voir les clubs de football près de chez vous
        
        Sans localisation votre position est automatiquement assignée à ORLEANS`

        setLocation({
            loaded: false,
            coords :{
                lat: "47.902964",
                lng: "1.909251"
            },

            error: {
                message:message
            }
        })
    };

    useEffect(() => {
        let message = `S'il vous plaît veuillez activer la localisation de votre appareil pour voir les clubs de football près de chez vous
        
        Sans localisation votre position est automatiquement assignée à ORLEANS`
        if (!("geolocation" in navigator)) {
        PositionError({
            message: console.warn(message)

        });
        } 
        navigator.geolocation.getCurrentPosition(PositionSucces, PositionError)
    }, [])


    return location





}

export default useGeolocation