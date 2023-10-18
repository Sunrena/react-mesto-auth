import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

export default function PopupWithForm({ name, 
  title, 
  children, 
  buttonText, 
  isOpen, 
  onClose,
  onSubmit,
 }) {

    const className = `popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;
    usePopupClose(isOpen, onClose);

    return (
        <div className={className}>
            <div className="popup__container">
                <h3 className="popup__title">{title}</h3>
                <form className={`"popup__form popup__form_type_${name}"`}
                    method="post"
                    name={name}
                    onSubmit={onSubmit}
                    >
                    {children}
                    <button className="popup__save-btn popup__save-btn_state_save"
                    type="submit"
                    aria-label="создать">
                        {buttonText}
                        </button>
                </form>
                <button className="popup__close-btn" 
                    type="button" 
                    aria-label="закрыть форму"
                    onClick={onClose}>
                </button>
            </div>
        </div>
    );
}