import React from "react";
import footerLogo from '../../assets/footer/fb.png';
import footerLogo2 from '../../assets/footer/web.png';
import footerLogo3 from '../../assets/footer/youtube.png';


const footerStyle = {
    backgroundColor: "#293D6B",
    textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "28px",
    display: "flex",
    width: "100%",
    justifyContent:"space-around",
    alignItems: "center"
    

}

const phantomStyle = {
    display: "flex",
    padding: "10px",
    height: "2px",
    width: "100%"
}

const logoStyle = {
    height: '18px',
    width:'18px'
}

export default function Footer({children}) {
    return (
        <div>
            <div style={phantomStyle}></div>
      

            <div style={footerStyle}>     
             <div><img src={footerLogo} alt="facebook logo"style={logoStyle}/> </div>
             <div><img src={footerLogo2} alt="site web ligue" style={logoStyle}/> </div>
             <div><img src={footerLogo3} alt="youtube logo"style={logoStyle}/> </div>
         
</div>
        </div>
    )
}