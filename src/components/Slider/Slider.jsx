import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

function Slider() {
  return (
    <>
      <Box sx={{ width: 300 }}>
        <span>Distance : 1 à 25km</span>
        <Slider
          aria-label="Distance"
          defaultValue={10}
          getAriaValueText={valuetext}
          // getAriaLabel={true}
          valueLabelDisplay="on"
          step={1}
          marks={true}
          min={1}
          max={25}
        />
      </Box>
    </>
  );
}

export default Slider;
