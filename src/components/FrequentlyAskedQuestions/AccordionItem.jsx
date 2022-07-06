import React, {useRef, useState} from 'react'
import './FrequentlyAskedQuestions.css'

const AccordionItem = ({ faq }) => {
    const { question, answer, img, styleName, styleNameDesktop  } = faq;
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
        {img ? <img className="FAQmarkerSmall" src={img} alt=""/> : null}
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
        <div className="answerPic">
        {img && styleName  ? <img className={styleName} src={img} alt=""/> : null} 

        </div>
       <div className="answer">
        {img && styleNameDesktop ? <> <img  className={styleNameDesktop} src={img} alt=""/> <p>  </p> </> : null}  {answer} </div>
      </div>
     </li>
    );
   };
   
   export default AccordionItem;