import React from 'react'
import {  Accordion } from "react-bootstrap";
import './Question.css'

function Questions(props) {
  
  return (
    <Accordion defaultActiveKey="1">
    <Accordion.Item eventKey="0">
      <Accordion.Header > <p className='Question'>{props.question}</p></Accordion.Header>
      <Accordion.Body className='Answer'>{props.reponse}
      </Accordion.Body>
    </Accordion.Item>
    </Accordion>

  )
}

export default Questions