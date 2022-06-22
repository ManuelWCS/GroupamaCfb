import React from 'react'

function Rubriques({ faq }) {
    const {question, answer} =faq;
  return (
    <>    
    <button>
        {question}
        <span> -</span>
    </button>

    <div> 
        <div>{answer}</div>
    </div>
    </>
    )
}

export default Rubriques