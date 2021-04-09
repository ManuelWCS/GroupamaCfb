import React from 'react'
import './Header.css'
import HeaderLogo from '../../assets/logoCFB.png'

function Header() {
    return (
        <div className="fullHeader">   
        <img className="logo" src={HeaderLogo}/>
        <h1 className="title"> Clubs Région</h1>

            
        </div>
    )
}

export default Header
