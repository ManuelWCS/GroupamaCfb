import React from "react";

/*<<<<<<<<<<<<<<<<<<<<<<<< IMPORT IMAGES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
import fb from "../../assets/CompressedPictures/Footer/fb.webp";
import web from "../../assets/CompressedPictures/Footer/web.webp";
import yt from "../../assets/CompressedPictures/Footer/youtube.webp";
import Logo from "../../assets/CompressedPictures/GroupamaLogo.webp";
import twi from "../../assets/CompressedPictures/twitter.webp";

/*<<<<<<<<<<<<<<<<<<<<<<<< IMPORT CSS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
import "./Sponso.css";

function Sponso() {
  return (
    <div className="curved">
      <div className="sponsorContainer">
        <p className="sponsoText">
          {" "}
          Cette plateforme est soutenue par Groupama Paris-Val de Loire<br></br>
        </p>
        <img src={Logo} className="GroupamaLogo" />
        <div className="sponsoLinks">
          <a
            href="https://www.facebook.com/groupama"
            target="_blank"
            rel="noreferrer"
          >
            <img src={fb} alt="" className="LinkGroupama" />
          </a>

          <a
            href="https://www.youtube.com/channel/UCcVU-JnuCbANGOl4vGcGpEg"
            target="_blank"
            rel="noreferrer"
          >
            <img src={yt} alt="" className="LinkGroupama" />
          </a>

          <a href="https://www.groupama.fr/" target="_blank" rel="noreferrer">
            <img src={web} alt="" className="LinkGroupama" />
          </a>

          <a
            href="https://twitter.com/GroupeGroupama"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twi} alt="" className="LinkGroupama" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sponso;
