import React, { useEffect, useState } from "react";
import LogoCFB from "../../assets/CompressedPictures/Logos/logoplateforme.webp";
import ecussonLigue from "../../assets/Juin/EcussonLigue.png";
import { Link } from 'react-scroll'

/* VERSIONS CSS */
//  import "./css/Preloader.NewResponsive.Landscape.css";
// import "./css/Preloader.NewResponsive.css"
import "./css/Preloader.New.css"
/* IMPORT DES IMAGES DANS LES BOUTONS */
import Loc from "../../assets/Juin/Loc.png";
import Loupe from "../../assets/Juin/Loupe.png";

import Landing from '../../components/Preloader/css/landing.png'



function Preloader(props) {
  let limit = 541;

  const [counter, setCounter] = useState(0);

  function increment() {
    for (let i = 0; i < limit; i++) {
      if (counter < limit) {
        setTimeout(() => {
          setCounter(counter + 5);
        }, 1);
      } 
        
      else {
        stop();
      }
    }
  }
  // function thaht make the counter stops at the limit
  function stop() {
    setCounter(limit);
  }

  useEffect(() => {
    increment();
  }, [counter]);

  const [scrollLeft, setScrollLeft ] = useState(false);

  const buttonClick = () => {
    props.passData(!scrollLeft);
  };

  const [scrollRight, setScrollRight] = useState(false);
  
  const buttonClick2 = () => {
    props.passData2(!scrollRight);
  }

  useEffect(() => {
    setScrollLeft(props.scrollLeft);
    setScrollRight(props.scrollRight);
  }, [props.scrollLeft, props.scrollRight]);

  return (
    <>    
      <div className="generalWrapper">
        <div className="imgContainer">
          <img className="landingPic" alt="" src={Landing} />


        </div>
        
        {/* <div className="headerPreload">
        
            <img
              src={LogoCFB}
              alt="logo Centre Frappe & But"
              className="LogoPlateforme"
            ></img>
            

        </div>
        <div className="FullLanding"> */}
          {/* <div className="LandingTitlesContainer">
            <div className="BiggestTitle">
              <div className="firstLine">
                <h1 className="counterNumber">{counter}</h1>
                <h2 className="LandingTitle">CLUBS</h2>
              </div>
              <div className="secondLine">
                <h2 className="LandingTitle2">DE FOOTBALL</h2>
              </div>
              <div className="thirdLine">
                <h4 className="LandingTitle3">
                  {" "}
                  EN RÉGION CENTRE VAL DE LOIRE{" "}
                </h4>
              </div>
              <h4 className="LandingTitle4">
                La Ligue Centre-Val de Loire de Football vous propose cette
                plateforme afin de découvrir l'ensemble des clubs de notre
                Région !
              </h4>
            </div>
          </div> */}

          <div className="LinkContainer">
            <h6 className="LandingTitle6">
              Accèdez à la carte avec deux options :
            </h6>
            <div className="rowBtn">
              <Link to="popover" spy={true}
                smooth={true}
                hashSpy={true}
                offset={50}
                duration={1000}
                delay={0}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}>
                <button className="myButton2" onClick={buttonClick}>
                  <div className="BtnContainer">
                    <img src={Loc} alt="Loupe" className="Loc"></img>
                    <p className="btnText">CLUBS Á PROXIMITÉ </p>
                  </div>
                </button>
              </Link>
              <Link to="popover2" spy={true}
                smooth={true}
                hashSpy={true}
                offset={50}
                duration={1000}
                delay={100}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}>
                <button className="myButton" onClick={buttonClick2}>
                  <div className="BtnContainer2">
                    <img src={Loupe} alt="Loupe" className="Loupe"></img>
                    <p className="btnText">CLUBS SELON MES CRITÈRES</p>
                  </div>
                </button>
              </Link>
            </div>


         
          </div>
          <div className="footerLanding">

        <Link to="/">
            <img src={ecussonLigue} className="headerLogo" alt="logo" />
          </Link>
          </div>
       
        </div>
      {/* </div> */}
    </>
  );
}

export default Preloader;
