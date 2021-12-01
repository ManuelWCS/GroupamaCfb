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
            <div style={phantomStyle}> <p>whes pelo</p></div>


            <div style={footerStyle}>     
             <div> <a href="https://www.facebook.com/LCFofficiel/?ref=bookmarks"><img src={footerLogo} alt="facebook logo"style={logoStyle}/> </a> </div>
             <div>  <a href="https://foot-centre.fff.fr/wp-content/uploads/sites/9/prehome/prehome/index.html"><img src={footerLogo2} alt="site web ligue" style={logoStyle}/> </a> </div>
             <div><a href="https://www.youtube.com/channel/UCs6RtJ9tefoU0iRnTkNzD6Q"><img src={footerLogo3} alt="youtube logo"style={logoStyle}/> </a></div>
         
</div>
        </div>
    )
}