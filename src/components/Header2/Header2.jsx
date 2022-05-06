import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./Header2.css";
import SmallGroupama from '../../assets/CompressedPictures/Header/headerMobile.png'
/* import du nouveau header Février 2022 -22 */
import LargeGroupama from '../../assets/CompressedPictures/Header/headerDesktop.png'

function Header2() {
  return (
    <div className="header" id="top">
      <Navbar bg="" variant="" fixed="top">
        <Navbar.Brand href="./">
          <img
            alt=""
            src={LargeGroupama}
            width="100%"
            height="100%"
            className="bigHeader"
          />

          <img
            alt=""
            src={SmallGroupama}
            width="100%"
            height="100%"
            className="smallHeader"
          />
        </Navbar.Brand>{" "}
      </Navbar>
    </div>
  );
}

export default Header2;
