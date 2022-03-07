import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./Header2.css";
import SmallGroupama from "../../assets/CompressedPictures/mobileGroupama.webp";
/* import du nouveau header Février 2022 -22 */
import LargeGroupama2 from "../../assets/TEST/header22.png"

function Header2() {
  return (
    <div className="header">
      <Navbar bg="" variant="" fixed="top">
        <Navbar.Brand href="./">
          <img
            alt=""
            src={LargeGroupama2}
            width="100%"
            height="50%"
            className="bigHeader"
          />

          <img
            alt=""
            src={SmallGroupama}
            width="100%"
            height="5%"
            className="smallHeader"
          />
        </Navbar.Brand>{" "}
      </Navbar>
    </div>
  );
}

export default Header2;
