import React from 'react'
import './Header.css'
import HeaderLogo from '../../assets/logoCFB.png'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="fullHeader">   
         <Link to="/">
        <img className="logo" src={HeaderLogo}/></Link>
        <h1 className="title"> Clubs Région</h1>
        
        

            
        </div>
    )
}

export default Header
