import React from 'react';
import './Faq.css';
import mailPicture from "../../assets/Juin/BoutonFAQ.png"

/*<------------------------IMPORT ROUTER ---------------------------------> */
import {Link} from 'react-router-dom'

function Faq() {
  return (
    <div className="faqContainer">
    <h6 className="faqTitle">FAQ ! BESOIN D'AIDE ? </h6>
    <p className="faqText2">Vous avez une question ? Nous avons probablement la réponse !</p>
    <a href="mailto:mrobinard@centre.fff.fr?subject=Ecrivez-nous votre question, ou faites-nous remarquer un bug!">
    <img src={mailPicture} className="contactImg" alt="courrier électronique" />
    </a>
 


  </div>
  )
}

export default Faq;