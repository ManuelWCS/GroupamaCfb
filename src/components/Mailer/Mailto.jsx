import React from "react";
import { Link } from "react-router-dom";
import logomail from "../../assets/Boutons/contact.png";

const ButtonMailto = ({ mailto, label }) => {
  return (
    <Link
      to="#"
      onClick={(e) => {
        window.location = mailto;
        e.preventDefault();
      }}
    ></Link>
  );
};

export default ButtonMailto;
