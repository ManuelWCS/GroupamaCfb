import React from 'react'
import './Header.css'
import HeaderLogo from '../../assets/logoCFB.png'
import SVG from '../../assets/Bandeau habillage 1 SVG.svg'

function Header() {
    return (
        <div className="fullHeader">   
        <img className="logo" src={HeaderLogo}/>
        <h1 className="title"> Clubs Région</h1>

            
        </div>
    )
}

export default Header
