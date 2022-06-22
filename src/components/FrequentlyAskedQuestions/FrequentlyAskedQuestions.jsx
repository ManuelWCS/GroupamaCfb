import React from 'react'
import "./FrequentlyAskedQuestions.css";
import Rubrique from './Rubriques.jsx';
import {faqs} from './faqs.js';

function FrequentlyAskedQuestions() {
    return (
        <main className='containerFAQ'>

            {faqs.map((faq, index) => {
                return <Rubrique key={index} faq={faq} />
                }
                )}
                
        </main>

  )
}

export default FrequentlyAskedQuestions