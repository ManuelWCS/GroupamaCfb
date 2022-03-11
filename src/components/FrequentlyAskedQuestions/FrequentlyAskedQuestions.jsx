import React, { useState, useEffect } from "react";
import "./FrequentlyAskedQuestions.css";

import { Container, Row, Accordion, Button } from "react-bootstrap";
import Header from "../Header2/Header2.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import Question from "../../components/Questions/Questions.jsx";

function FrequentlyAskedQuestions() {
  const [options, setOptions] = useState([]);
  const [selection, setSelection] = useState([])

  function remplirOptions() {
    console.log("init");

    let Selector = [
      {
        id: 1,
        name: "Naviguer sur cfb",
        src: "https://via.placeholder.com/50",
      },
      {
        id: 2,
        name: "La carte",
        src: "https://via.placeholder.com/50",
      },
    ];

    setOptions(Selector);
  }

  const tick = () => {
    setInterval(() => {
      console.log(selection)
    }, 5000);

  }

  const majSelection = (value, index) => () => {
    let majCopy = [...selection]
    majCopy[index] = value;
    setSelection(majCopy)
  }

  const addItem = () => {
    setSelection([...selection])
  }


  

  useEffect(() => {
    remplirOptions();
    console.log(selection)
    tick()
  }, []);

  function Accordion() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }
  return (
    <>
      <Header />
      <Container fluid className="FullContent">
        <Container fluid className="FAQTitleContainer">
          <div className="hero">
            <div className="content">
              <h1>Example Hero!</h1>
              <p>Example Hero!</p>
            </div>
          </div>

          <div className="SearchBarContainer">
            <h5 className="titleSearchBar">BESOIN D'AIDE ? </h5>
            <span className="searchBar"> BARRE DE RECHERCHE</span>
            <Button className="danger" onClick={alert}>
              Rechercher
            </Button>
          </div>

          <div className="CategoryContainer">
            <button className="accordion" onClick={Accordion}>
              Choisir une catégorie ↓
            </button>
            <div className="panel">
              <div className="SelectorBox">
                {options.map((el, idx) => {
                  return (
                    <div classsName="optionBox">
                      <p className="TitleFAQ">{el.name}</p>
                      <img src={el.src} alt="" onClick={addItem}/>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
              <div className="TitleSelectorContainer">

              <p className="SecondaryTitle"> - Les questions fréquentes - </p>
              <p className="TitleFAQ">  {selection.length < 1 ? "Veuillez choisir une catégorie de question" : selection } </p>


                </div>
        </Container>
      </Container>
    </>
  );
}

export default FrequentlyAskedQuestions;