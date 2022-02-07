import React from 'react';
import '../../components/Home/Homepage.css';
import fb from "../../assets/CompressedPictures/fb.webp";
import web from "../../assets/CompressedPictures/web.webp"
import yt from "../../assets/CompressedPictures/yt.wep"
import Logo from "../../assets/CompressedPictures/GroupamaLogo.webp"
import twi from '../../assets/CompressedPictures/twitter.webp'




function Footer() {
  return <div>
       <div className="sponso">
        <p className="sponsoText">
          Cette plateforme est soutenue par Groupama
        </p>
        <img className="logoGroupama" src={Logo} alt="" />
        <div className="sponsoLinks">
          <a
            href="https://www.facebook.com/groupama"
            target="_blank"
            rel="noreferrer"
          >
            <img src={fb} alt="" className="LinkCA" />
          </a>

          <a
            href="https://www.youtube.com/channel/UCcVU-JnuCbANGOl4vGcGpEg"
            target="_blank"
            rel="noreferrer"
          >
            <img src={yt} alt="" className="LinkCA" />
          </a>

          <a
            href="https://www.groupama.fr/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={web} alt="" className="LinkCA" />
          </a>

          <a
            href="https://twitter.com/GroupeGroupama"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twi} alt="" className="LinkCA" />
          </a>
        </div>
      </div>
      <div className="footer"></div>
      
      <div className="footHeure">
        <div className="logos">
          <a
            href="https://www.facebook.com/groupama"
            target="_blank"
            rel="noreferrer"
          >
            <img className="logos" alt="logo Facebook" src={fb} />
          </a>
        </div>

        <div className="logos">
          <a
            href="https://foot-centre.fff.fr/wp-content/uploads/sites/9/prehome/prehome/index.html"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="logos"
              alt="logo site Ligue Centre Val de Loire"
              src={web}
            />
          </a>
        </div>

        <div className="logos">
          <a
            href="https://www.youtube.com/channel/UCs6RtJ9tefoU0iRnTkNzD6Q"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="logos"
              alt="logo Youtube Ligue Centre-Val de Loire"
              src={yt}
            />
          </a>
        </div>
      </div>
  </div>;
}

export default Footer;
