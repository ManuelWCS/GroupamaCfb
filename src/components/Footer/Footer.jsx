import React from "react";

const footerStyle = {
    backgroundColor: "#293D6B",
    textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "32px",
    width: "100%"

}

const phantomStyle = {
    display: "block",
    padding: "20px",
    height: "2px",
    width: "100%"
}

export default function Footer({children}) {
    return (
        <div>
            <div style={phantomStyle}></div>
            <div style={footerStyle}>{children}</div>
        </div>
    )
}