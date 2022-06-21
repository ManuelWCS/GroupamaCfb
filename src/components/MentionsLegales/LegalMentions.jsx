import React from "react";
import LogoCFB from "../../assets/CompressedPictures/Logos/logoplateforme.webp";
import "./css/LegalMentions.css";
import { Link } from "react-router-dom";
import Footer from '../Sponso/Sponso.jsx';

function LegalMentions() {
  return (
    <div className="LegalMentions">
      <div className="headerML">
      
        <h1 className="MLtitle1">CENTRE <span className="MLtitle2"> FRAPPE</span> <span className="MLtitle3"> & BUT</span></h1>
        <Link to="/" style={{ textDecoration: "none" }}>
          
       <img
          src={LogoCFB}
          alt="logo Centre Frappe & But"
          className="LogoPlateformeML"
        ></img> </Link>
      </div>
      <span className="backBtn">
        <Link to="/" style={{ textDecoration: "none" }}>
          Retour
        </Link>
      </span>

      <div className="Section1Container">
        <h1 className="Section1title">MENTIONS LÉGALES </h1>
        <section className="Section1">
          Le présent site https://cfb.foot-centre.fr  est la propriété exclusive
          de l'association loi 1901 reconnue d'utilité publique Ligue Centre-Val
          de Loire de Football affiliée à la Fédération Française de Football
          (FFF), dont le siège social est situé 13, Rue Paul Langevin (n° de TVA
          : 297 7551 1546 et n° de SIRET : 775 511 546 000 35).{" "}
          <div>
            Tel : 02 38 69 73 18. Le directeur de la publication du Site est M.
            TEIXEIRA Antonio, en qualité de Président de la Ligue Centre-Val de
            Loire de Football. a société IONOS SARL, 7, place de la Gare - BP
            70109 57201 SARREGUEMINES assure l'hébergement du Site.
          </div>
        </section>
      </div>

      <div className="Section2Container">
        <h1 className="Section2title">COOKIES </h1>
        <section className="Section2">
          Nous utilisons des cookies pour concevoir nos sites Web de manière
          optimale pour vous, afin d’améliorer notre produit. Comment vos
          témoins de connexion ("cookies") sont-ils collectés ? Lors de la
          consultation de nos sites, des informations relatives à votre
          navigation sont susceptibles d'être enregistrées au sein de fichiers
          appelés "cookies" qui sont stockés sur le terminal utilisé pour
          accéder au site.
        </section>
      </div>

      <div className="Section3Container">
        <h1 className="Section3title">GÉOLOCALISATION </h1>
        <section className="Section3">
          Nous utilisons la géolocalisation afin de vous proposer un résultat
          plus précis lors de la recherche sur notre site.Conformément au
          respect du principe du consentement, celui-ci vous est demandé dès
          l’accès au site via notre navigateur internet.
        </section>
      </div>

      <div className="footerContainer">

      <span className="backBtn2">
        <Link to="/" style={{ textDecoration: "none", marginBottom:24}}>
          Retour
        </Link>
      </span>
      </div>
      <Footer className="MLFooter" />
    </div>
  );
}

export default LegalMentions;
