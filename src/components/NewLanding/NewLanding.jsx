import React from 'react';
import Header from '../Header2/Header2.jsx';
import {Link} from 'react-scroll'
import Description from '../Description/Description.jsx';
import BannerContainer from '../BannerContainer/BannerContainer.jsx';
import Instructions from '../Instructions/Instructions.jsx';
import './NewLanding.css'


function NewLanding() {


  return (
      <div className="wrapperBackground">
    <Header />
      
      
        <Description/>

          <Link to="map" spy={true}smooth={true} duration={1000}>
        <BannerContainer />
          </Link>

        <Instructions/>
      </div>
  )
}

export default NewLanding