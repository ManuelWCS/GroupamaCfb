import "./App.css";
import Clean from "./components/Clean/Clean.jsx";
import { Routes, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";



function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Clean />} />
        </Routes>
        <CookieConsent debug={true}
        location="bottom"
        style={{background: "#3586c2",}}
        buttonStyle={{color: "#293d6b", backgroundColor: "white", borderRadius:"17px", width:'200px'}}  
        buttonText="J'accepte"
        CookieConsent="cookie"
        declineButton="En savoir plus"
        ><p className="cookieTitle">La Ligue Centre-Val de Loire respecte votre vie privée !</p>
        <p className="cookieDescription"> 
        Avec votre accord, nos partenaires et nous utilisons des cookies ou technologies similaires pour stocker et accéder à des informations personnelles comme votre visite sur ce site. Vous pouvez retirer votre consentement ou vous opposer aux traitements basés sur l'intérêt légitime à tout moment en cliquant  <a href="https://www.fff.fr/456-protection-des-donnees.html">ici </a> ou dans notre politique de confidentialité sur le site de la Ligue du Centre-Val de Loire de Football</p>
        </CookieConsent>
      </div>
    </>
  );
}

export default App;
