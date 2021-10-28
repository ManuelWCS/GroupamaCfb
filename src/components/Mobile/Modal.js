import React from 'react'

function Modal({closeModal}) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
            <div className="titleCloseBtn">

                {/* <button className="close" onClick={() => closeModal(false)}> X </button> */}
                </div>
                <div className="title">
                </div>
                <div className="body">
                    <p className="italic"></p>
                    <div className=""></div>
                    </div>
                <div className="footer">
                    <button onClick={() => closeModal(false)}>OK</button>
                </div>


            </div>
            
        </div>
    )
}

export default Modal
