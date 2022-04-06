import { width } from "@mui/system";
import React from "react";

function Submit(props) {

  // const styleImg = {
  //   backgroundColor: "transparent",
  //   width: 170,

  // }
  return (
     
      <img
        src={props.imageBtn}
        alt="SubmitButton"
        className="SubmitButton"
        // style={styleImg}
      >
      </img>
  );
}

export default Submit;
