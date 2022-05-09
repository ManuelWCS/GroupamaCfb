import React, {useEffect, useState} from "react";
import "./Description.css";

function Description() {
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
    <div className="descriptionContainer">
      <h2 className="mainDescription">
        {counter} CLUBS DE FOOTBALL EN RÉGION CENTRE-VAL DE LOIRE
      </h2>
      <h4 className="secondaryDescription">
        La Ligue Centre-Val de Loire de Football vous propose cette plateforme
        afin de découvrir l'ensemble des clubs de notre Région !
        
      </h4>
    </div>
  );
}

export default Description;
