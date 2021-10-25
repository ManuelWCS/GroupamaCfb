import React from 'react'

function Modal({closeModal}) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
            <div className="titleCloseBtn">

                <button className="close" onClick={() => closeModal(false)}> X </button>
                </div>
                <div className="title">
                    <h1>Bienvenue sur CFB</h1>
                </div>
                <div className="body"> <p>
                    Tapez votre code postal et sélectionnez une catégorie pour voir les clubs près de chez vous!</p>
                    <p className="italic">Pensez à autoriser la géolocalisation</p>
                    <div className="illustration">
                        <div></div>
                        <div></div>
                        <div></div>


                    </div>
                    </div>
                <div className="footer">
                    <button onClick={() => closeModal(false)}>OK</button>
                </div>


            </div>
            
        </div>
    )
}

export default Modal
