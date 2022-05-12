import React from 'react'
import ActivateGeoLoc from "../../assets/CompressedPictures/Logos/activateGeoLoc.png"

function ActivateGeoloc() {
  return (
    <div className='ActivateContainer'>
        <img src={ActivateGeoLoc} alt='activateGeoLoc' className='ActivateGeoLoc'/>
        <p className="ActivateDescription">
            Activez la localisation de votre appareil pour utiliser cette fonctionallité !
        </p>
        <span className="navigatorDescription">
            (Autoriser votre naviagateur à accéder à votre localisation)
        </span>
        

    
    
    </div>
  )
}

export default ActivateGeoloc