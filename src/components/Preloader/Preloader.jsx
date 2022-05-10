import React, {useEffect, useState} from "react";
import "./Preloader.css";
import LogoCFB from "../../assets/CompressedPictures/Logos/logo.png";

function Preloader() {
    let limit = 541;


    const [counter, setCounter] = useState(0);
  
    function increment(){
      for(let i = 0; i < limit; i++){
        if (counter < limit){
        setTimeout(() => {
          setCounter(counter + 10);
  
        }, 1)}
        else {
          setCounter(limit)
        }
      }
    }
  // function thaht make the counter stops at the limit
    function stop(){
      setCounter(limit);
    }
  
  
    useEffect(() => {
      increment();
    }, [counter])
  return (
    <div className="FullLanding">

      <div className="LandingTitlesContainer">
        <div className="BiggestTitle">
          <div className="firstLine">
            <h1 className="counterNumber">{counter}</h1>
            <h2 className="LandingTitle">CLUBS</h2>
          </div>
          <div className="secondLine">
            <h2 className="LandingTitle2">DE FOOTBALL</h2>
          </div>
          <div className="thirdLine">
            <h4> EN RÉGION CENTRE VAL DE LOIRE </h4>
          </div>
        </div>
        <div className="SmallestTitle"></div>
        <div className="NavigationTitle"></div>
      </div>
    </div>
  );
}

export default Preloader;
