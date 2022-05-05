import React from 'react';
import './BannerContainer.css';
import BannerImg from '../../assets/CompressedPictures/Buttons/Avousdejouer.webp'

function BannerContainer() {
  return (
    <div className="bannerContainer" >
    {/* <h5 className="bannerTitle">À VOUS DE JOUER</h5> */}
     <img src={BannerImg} alt="banner" className="bannerTitle" 
     />
  </div>
  )
}

export default BannerContainer