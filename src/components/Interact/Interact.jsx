import React, { useState } from 'react'
;

import LocalisationImg from '../../assets/CompressedPictures/Buttons/LocalisezMoi.png';
import StopLoc from '../../assets/CompressedPictures/Buttons/StopLoc.png';

/* REDUX */

function Interact(props) {


   

  return (
    <div className="interactContainer">
    <div className="locImgContainer">

<img src={props.clicked === true ? StopLoc : LocalisationImg } alt="Localisez-moi !" title="Localisez ma position" className="locImage" onClick={handleAll}/>
<img src={props.clicked2 === true ? StopLoc : LocalisationImg } alt="Afficher ou cacher tous les marqueurs" title="Afficher ou cacher tous les marqueurs" className="locImage"  />
<img src={props.clicked3 === true ? StopLoc : LocalisationImg } alt="Afficher ou cacher les instances" title="Afficher ou cacher les instances" className="locImage"  />
    </div>
</div>
  )
}
 
export default Interact