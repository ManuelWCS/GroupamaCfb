import React from "react";
import "./FrequentlyAskedQuestions.css";

import { Container, Row, Accordion } from "react-bootstrap";
import Header from "../Header2/Header2.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import Question from "../../components/Questions/Questions.jsx";

function FrequentlyAskedQuestions() {
  return (
    <>
      <Container fluid className="headerContainer">
        <Row>
          <Header />
        </Row>
      </Container>
      <Container fluid className="maxContainer">
        <div className="faqWrapper">
          <div className="itemContainer">
            <div className="itemTitleContainer">
              <h3 className="itemTitle">NAVIGUER SUR CFB</h3>
            </div>
            <div className="listContainer">
              <Row>

              <Question
                question="A quoi sert la plateforme Centre, Frappe et But ?"
                reponse="ntm"
                />
                </Row>
              <Question
                
                question="Comment trouver un club près de chez moi ?"
                reponse="ntm"
              />
              <Question
                question="La plateforme est-elle disponible sur plusieurs supports ? "
                reponse="ntm"
              />
              <Question
                question="Comment contacter la LCVLF ou son partenaire ? "
                reponse="ntm"
              />
           </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default FrequentlyAskedQuestions;
