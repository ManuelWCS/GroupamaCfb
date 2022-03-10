import React from "react";

/*<<<<<<<<<<<<<<<<<<<<<<<< IMPORT IMAGES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
import fb from "../../assets/CompressedPictures/Footer/fb.webp";
import web from "../../assets/CompressedPictures/Footer/web.webp";
import yt from "../../assets/CompressedPictures/Footer/youtube.webp";
import Logo from "../../assets/CompressedPictures/Logos/LogoLigue.webp";
import twi from "../../assets/CompressedPictures/twitter.webp";

/*<<<<<<<<<<<<<<<<<<<<<<<< IMPORT CSS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
import "./Sponso.css";

function Sponso() {
  return (
    <div className="curved">
      <div className="sponsorContainer">
        <img src={Logo} className="sponsoLogo" alt="Groupama Logo" />
        <p className="sponsoText">
          {" "}
          Cette plateforme a été développée par la Ligue Centre-Val de Loire de Football<br></br>
        </p>
        <div className="sponsoLinks">
        <a
                href="https://www.facebook.com/LCFofficiel/?ref=bookmarks"
                target="_blank"
                rel="noreferrer"
              >
            <img src={fb} alt="" className="LinkGroupama" />
          </a>

          <a
                href="https://www.youtube.com/channel/UCs6RtJ9tefoU0iRnTkNzD6Q"
                target="_blank"
                rel="noreferrer"
              >
            <img src={yt} alt="" className="LinkGroupama" />
          </a>

          <a
                href="https://foot-centre.fff.fr/wp-content/uploads/sites/9/prehome/prehome/index.html"
                target="_blank"
                rel="noreferrer"
              >            
              <img src={web} alt="" className="LinkGroupama" />
          </a>

        </div>
      </div>
    </div>
  );
}

export default Sponso;
