import React, {useRef, useState} from 'react'
import './FrequentlyAskedQuestions.css'

const AccordionItem = ({ faq }) => {
    const { question, answer } = faq;
    const [clicked, setClicked] = useState(false);

    const contentEl = useRef();
    const handleToggle = () => {
        setClicked((prev)=> !prev);
    }
    return (
     <li className={`accordion_item ${clicked ? "active" : ""}`}>
      <button className="button" onClick={handleToggle}>
       <span className="control">{clicked ? "  —  " : "  +  "} </span>
       {question}
      </button>
      <div 
      ref={contentEl} 
      className="answer_wrapper"
      style={
        clicked
        ? {height : contentEl.current.scrollHeight}
        : {height : "0px"}
      }
      >
       <div className="answer">{answer}</div>
      </div>
     </li>
    );
   };
   
   export default AccordionItem;