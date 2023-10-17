import React from 'react';

export default function PopupWithForm({ name, 
  title, 
  children, 
  buttonText, 
  isOpen, 
  onClose,
  onSubmit,
  handleCloseOverlay,
 }) {

    const className = `popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;

    return (
        <div className={className} onClick={handleCloseOverlay}>
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