import React, { useState } from "react";
import "./FrequentlyAskedQuestions.css";
import AccordionItem from "./AccordionItem.jsx";
import { faqs } from "./faqs.js";
import { faqMap } from "./faqMap.js";
import LogoCFB from "../../assets/CompressedPictures/Logos/logoplateforme.webp";

import Footer from '../../components/Sponso/Sponso.jsx';
import Faq from '../../components/FAQ/FaqSection'


/* images*/
import internet from '../../assets/Juin/internet3.png';
import map from '../../assets/Juin/map3.png'; 


function FrequentlyAskedQuestions() {
  const [clicked, setClicked] = useState("0");

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  const [selected, setSelected] = useState("1");
  const [isClicked, setIsClicked] = useState(false);


  const handleSelect = (e) => {
    setSelected(e.target.value);
    setIsClicked(true);
    console.log(selected, "select", isClicked, "is clicked"); 
  }
  

  return (
    <main className="containerFAQ">
      <div className="headerPreload">
        <img
          src={LogoCFB}
          alt="logo Centre Frappe & But"
          className="FAQheaderLogo"
          
        ></img>
      </div>
      <Faq/>
      <div className="chooseContainer">
        <span className="categorySelector">
          CHOISIR UNE CATÉGORIE :
        </span>
        <div className="categoriesBtn">
          <div className="columnBtn">
            <button
              onClick={handleSelect}
              value="NAVIGUER SUR CFB"
              className="chooseBtn">
              NAVIGUER SUR CFB
            </button>

            <div className="btnImg1">
              <img src={internet} alt="internet" className="internetCategory"
                onClick={() => handleSelect({ target: { value: "NAVIGUER SUR CFB" } })}
              />
            </div>

          </div>
          <div className="columnBtn">
            <button
              onClick={handleSelect}
              value="LA CARTE"
              className="chooseBtn">LA CARTE
            </button>
            <div className="btnImg1">
              <img src={map} alt="internet" className="internetCategory"
               onClick={() => handleSelect({ target: { value: "LA CARTE" } })} />
            </div>
          </div>
        </div>
      </div>



      {isClicked  ? (
      <div className="conditionnalRender">
        <h3 className="categorySelectedTitle"> - LES QUESTIONS FRÉQUENTES - </h3>
          <h1 className="categorySelectedTexte">{selected}</h1>

      </div>
      ) : null } 


      <div className="rowToColumnContainer">

        {selected === "NAVIGUER SUR CFB" && isClicked === true ? (
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
          </ul>)  : null}
          {selected === "LA CARTE" && isClicked === true ? (

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
          </ul> ) : null}

      </div>

      <Footer/>
    </main>
  );
}

export default FrequentlyAskedQuestions;
