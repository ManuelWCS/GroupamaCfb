import React from 'react'
import ArrowImg from '../../assets/CompressedPictures/Buttons/upArrow.webp';
import './UpArrow.css';

function UpArrow() {
  return (<>
  <img className="topBtn" src={ArrowImg}  alt="Flèche pour remonter" title="scroll to top"></img>
  
  </>
  )
}

export default UpArrow