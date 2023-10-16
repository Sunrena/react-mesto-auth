import React from "react";
import done from "../images/done.svg"
import failed from "../images/failed.svg"

export default function InfoTooltip({ 
    name,
    title,
    isOpen,
    onClose,
    isSuccess,
    handleCloseOverlay,

}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
            onClick={handleCloseOverlay}>
            <div className={`popup__container popup__container_type_${name}`}>
                <button className="popup__close-btn"
                    type="button"
                    onClick={onClose}
                    aria-label="закрыть форму"></button>
                <img className="popup__image_tooltip" src={isSuccess ? done : failed}/>
                <h2 className="popup__title_tooltip">{title}</h2>

            </div>

        </div>
    )
}