import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {
      lat: "",
      lng: "",
    },
  });


  const onSucces = (location) => {
      setLocation({
          loaded: true,
          coordinates : {
              lat: location.coords.latitude,
              lng: location.coords.longitude
          },
      });
  }



  const onError = (error) => {
    let message = 'Veuillez activer la localisation pour voir les clubs près de chez vous'

      setLocation({
          loaded: true,
        //   error: {
        //       code: error.code,
        //       message : error.message,
        //   },
        coordinates: {
            lat : "47.902964",
            lng: "1.909251"
        },

        error : {
            code: error.code,
            message: message
        }
      })
  };

  useEffect(() => {
      if(!("geolocation" in navigator)) {
          onError({
              code:0,
              message:"Geolocation not supported",
          });

      }

      navigator.geolocation.getCurrentPosition(onSucces, onError)
  }, [])

  return location; 




};

export default useGeolocation
