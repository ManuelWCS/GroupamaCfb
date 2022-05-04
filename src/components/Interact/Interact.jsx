import React, { useState } from 'react'
;

import LocalisationImg from '../../assets/CompressedPictures/Buttons/LocalisezMoi.png';
import StopLoc from '../../assets/CompressedPictures/Buttons/StopLoc.png';

function Interact() {

    const [clicked, setClicked] = useState(false);
    function handleClick() {
        setClicked(!clicked);
    }

    function handleAll() {
        handleClick();
        showMyLocation();
    }
  return (
    <div className="interactContainer">
    <div className="locImgContainer">

<img src={clicked === true ? StopLoc : LocalisationImg } alt="Localisez-moi !" title="Localisez ma position" className="locImage" onClick={handleAll}/>
<img src={clicked === true ? StopLoc : LocalisationImg } alt="Afficher ou cacher tous les marqueurs" title="Afficher ou cacher tous les marqueurs" className="locImage" onClick={handleAll} />
<img src={clicked === true ? StopLoc : LocalisationImg } alt="Afficher ou cacher les instances" title="Afficher ou cacher les instances" className="locImage" onClick={handleAll} />
    </div>
</div>
  )
}
 
export default Interact