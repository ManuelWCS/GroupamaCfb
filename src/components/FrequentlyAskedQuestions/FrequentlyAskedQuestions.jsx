import React, { useState, useEffect } from "react";
import "./FrequentlyAskedQuestions.css";

import { Container, Button } from "react-bootstrap";
import Header from "../Header2/Header2.jsx";

/* import données partie Questions*/
import FaqData from "./faqData.json";

function FrequentlyAskedQuestions() {
  const [options, setOptions] = useState([]);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    setOptions(FaqData);
    console.log(options, " <--- LES OPTIONS.... LA SELECTION ---->", selection);
    tick();
  }, []);

  const tick = () => {
    setInterval(() => {
      console.log(selection);
    }, 5000);
  };

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

  function selectCategory(e) {

    if (!selection ) {
      setSelection(e.target.value);
      console.log(selection);
    } else {
      setSelection([]);
      console.log(selection);
    }
  }

  const onChange = (e) => {
    setSelection({ selection : e.target.value})
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
                      <p className="TitleFAQ" onClick={selectCategory}>
                        {el.theme}
                      </p>
                      <img src={el.src} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* <div className="TitleSelectorContainer">

              <p className="SecondaryTitle"> - Les questions fréquentes - </p>
              <p className="TitleFAQ">  {selection.length < 1 ? "Veuillez choisir une catégorie de question" : selection } </p>
                </div> */}
        </Container>
      </Container>
    </>
  );
}

export default FrequentlyAskedQuestions;