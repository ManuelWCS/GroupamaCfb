import React from 'react';
import './Faq.css';
import mailPicture from '../../assets/CompressedPictures/FAQ/contact.webp'

/*<------------------------IMPORT ROUTER ---------------------------------> */
import {Link} from 'react-router-dom'

function Faq() {
  return (
    <div className="faqContainer">
    <h6 className="faqTitle">FAQ ! BESOIN D'AIDE ? </h6>
    <p className="faqText2">Vous avez une question ? Nous avons probablement la réponse !</p>
    <Link to="/faq">

    <img src={mailPicture} className="contactImg" alt="courrier électronique" />
    </Link>
  </div>
  )
}

export default Faq;