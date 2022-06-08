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
        enableDeclineButton={true}
        declineButtonText="Refuser"
        declineButtonStyle={{"backgroundColor": "#ff0000", "color": "#fff", "borderRadius": "17px", "width": "200px"}}
        ><p className="cookieTitle">La Ligue Centre-Val de Loire respecte votre vie privée !</p>
        <p className="cookieDescription"> 
        Avec votre accord, nos partenaires et nous utilisons des cookies ou technologies similaires pour stocker et accéder aux informations suivantes : données de géolocalisation précises, contenu personnalisé, informations stockées sur votre terminal </p>
        </CookieConsent>
      </div>
    </>
  );
}

export default App;
