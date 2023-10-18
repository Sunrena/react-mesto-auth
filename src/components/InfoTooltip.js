import React from "react";
import done from "../images/done.svg"
import failed from "../images/failed.svg"
import { usePopupClose } from "../hooks/usePopupClose";

export default function InfoTooltip({ 
    name,
    title,
    isOpen,
    onClose,
    isSuccess,
}) {

    usePopupClose(isOpen, onClose);
    
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className={`popup__container popup__container_type_${name}`}>
                <button className="popup__close-btn"
                    type="button"
                    onClick={onClose}
                    aria-label="закрыть форму"></button>
                <img className="popup__image_tooltip" 
                    src={isSuccess ? done : failed}
                    alt="оповещение о регистрации" />
                <h2 className="popup__title_tooltip">{title}</h2>

            </div>

        </div>
    )
}