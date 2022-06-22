import "./App.css";
import Clean from "./components/Clean/Clean.jsx";
import { Routes, Route, Link } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import MentionsLegales from "./components/MentionsLegales/LegalMentions.jsx";
import FAQ from "./components/FrequentlyAskedQuestions/FrequentlyAskedQuestions.jsx"
function App() {


  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Clean />} />
          <Route path="/mentionslegales" element={<MentionsLegales />} />
          <Route path="/faq" element={<FAQ />} />


        </Routes>
        <CookieConsent
        className="cookie-consent"
          debug={false}
          location="bottom"
          style={{ background: "#293d6b", position: "fixed", bottom: "0", width: "100%", color: "#fff", zIndex: "999" }}
          buttonStyle={{
            color: "#293d6b",
            backgroundColor: "white",
            borderRadius: "17px",
            width: "200px",
            height: "40px",
          }}
          buttonText="J'accepte"
          CookieConsent="cookie"
          enableDeclineButton={true}
          declineButtonText="Refuser"
          declineButtonStyle={{
            backgroundColor: "#c1272d",
            color: "#fff",
            borderRadius: "17px",
            width: "200px",
            height: "40px",           
          }}>

          <p className="cookieTitle">
            La Ligue Centre-Val de Loire respecte votre vie privée !
          </p>
          <p className="cookieDescription">
            {" "}
            Cookies : Nous utilisons des cookies pour concevoir nos sites Web de
            manière optimale pour vous, afin d’améliorer notre produit. Comment
            vos témoins de connexion ("cookies") sont-ils collectés ? Lors de la
            consultation de nos sites, des informations relatives à votre
            navigation sont susceptibles d'être enregistrées au sein de fichiers
            appelés "cookies" qui sont stockés sur le terminal utilisé pour
            accéder au site. Géolocalisation : Nous utilisons la géolocalisation
            afin de vous proposer un résultat plus précis lors de la recherche
            sur notre site. Conformément au respect du principe du consentement,
            celui-ci vous est demandé dès l’accès au site via notre navigateur
            internet.{" "}

          </p>
        </CookieConsent>
      </div>
    </>
  );
}

export default App;
