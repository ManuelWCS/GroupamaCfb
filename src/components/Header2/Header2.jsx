import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import './Header2.css';
import LargeGroupama from '../../assets/Header/HeaderGroupama.png';
import SmallGroupama from '../../assets/Header/mobileGroupama.png';


function Header2() {
    return (
        <div className='header'>
                <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="./">
          <img
            alt=""
            src={LargeGroupama}
            width="100%"
            height="100%"
            className="d-inline-block align-top"
            className="bigHeader"
          />

        <img
            alt=""
            src={SmallGroupama}
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
