import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

export default function ImagePopup({ card, isOpen, onClose }) {
    const className = `popup popup_type_image ${isOpen ? 'popup_opened' : ''}`;
    
    usePopupClose(isOpen, onClose);

    return (
        <div className={className}>
          <div className="popup__container popup__container_type_image">
            <button className="popup__close-btn" 
                type="button"  
                aria-label="закрыть картинку"
                onClick={onClose}>
            </button>
            <img className="popup__image" 
                src={card.link} 
                alt={card.name} />
            <p className="popup__image-title">{card.name}</p>
          </div>
        </div>
    )
}