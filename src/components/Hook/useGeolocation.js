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
      setLocation({
          loaded: false,
          error: {
              code: error.code,
              message : error.message,
          },
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
