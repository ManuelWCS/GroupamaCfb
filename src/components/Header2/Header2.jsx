import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import headerImg from "../../assets/Header/bandeBlanche.png";
import miniHeader from '../../assets/Header/headerCM2.png'
import './Header2.css'
// import marine from '../../assets/TEST/lui.png'
import CA from '../../assets/TEST/CA.png'

function Header2() {
    return (
        <div className='header'>
                <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="./">
          <img
            alt=""
            src={CA}
            width="100%"
            height="100%"
            className="d-inline-block align-top"
            className="bigHeader"
          />

        <img
            alt=""
            src={miniHeader}
            width="100%"
            height="5%"
            className="d-inline-block align-top"
            className="smallHeader"
          />


        </Navbar.Brand>{" "}
      </Navbar>
            
        </div>
    )
}

export default Header2
