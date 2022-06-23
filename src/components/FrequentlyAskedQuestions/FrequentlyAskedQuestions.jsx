import React, { useState } from "react";
import "./FrequentlyAskedQuestions.css";
import AccordionItem from "./AccordionItem.jsx";
import { faqs } from "./faqs.js";
import { faqMap } from "./faqMap.js";
import LogoCFB from "../../assets/CompressedPictures/Logos/logoplateforme.webp";

import Footer from '../../components/Sponso/Sponso.jsx'


/* images*/
import internet from '../../assets/Juin/internet2.png';
import map from '../../assets/Juin/map2.png';
function FrequentlyAskedQuestions() {
  const [clicked, setClicked] = useState("0");

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  const [selected, setSelected] = useState("1");


  const handleSelect = (e) => {
    setSelected(e.target.value);
    console.log(selected, "select");
  }

  return (
    <main className="containerFAQ">
      <div className="headerPreload">
        <img
          src={LogoCFB}
          alt="logo Centre Frappe & But"
          className="LogoPlateforme"
        ></img>
      </div>

      <div className="chooseContainer">
        <span className="categorySelector">
          CHOISIR UNE CATÉGORIE :
        </span>
        <div className="categoriesBtn">
          <div className="columnBtn">
            <button
              onClick={handleSelect}
              value="1"
              className="chooseBtn">
              NAVIGUER SUR CFB
            </button>

            <div className="btnImg1">
              <img src={internet} alt="internet" className="internetCategory" />
            </div>

          </div>
          <div className="columnBtn">
            <button
              onClick={handleSelect}
              value="2"
              className="chooseBtn">LA CARTE
            </button>
            <div className="btnImg1">
              <img src={map} alt="internet" className="internetCategory" />
            </div>
          </div>
        </div>
      </div>


      <h3 className="categorySelectedTitle"> - LES QUESTIONS FRÉQUENTES - </h3>
      {selected ? (
        <span className="categorySelectedTexte">{selected === "1" ? "Naviguer sur CFB " : "carte"}</span>) : null}


      <div className="rowToColumnContainer">

        {selected === "1" ? (
          <ul className="accordion">
            {faqs.map((faq, index) => {
              return (
                <AccordionItem
                  key={index}
                  faq={faq}
                  onToggle={() => handleToggle(index)}
                  active={clicked === index}
                />
              );
            })}
          </ul>) : (
          <ul className="accordion">
            {faqMap.map((faq, index) => {
              return (
                <AccordionItem
                  key={index}
                  faq={faq}
                  onToggle={() => handleToggle(index)}
                  active={clicked === index}
                />
              );
            })}
          </ul>)}

      </div>

      <Footer/>
    </main>
  );
}

export default FrequentlyAskedQuestions;
