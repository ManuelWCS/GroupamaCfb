import React from 'react'

function Footer() {
  return (
    <div className="foooooter">
            <div className="logos">
              <a
                href="https://www.facebook.com/LCFofficiel/?ref=bookmarks"
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
  )
}

export default Footer