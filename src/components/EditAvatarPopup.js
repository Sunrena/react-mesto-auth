import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar,
    isLoading,
    handleCloseOverlay,
}) {

    const inputAvatarRef = useRef(0);

    useEffect(() => {
        isOpen && (inputAvatarRef.current.value = '');
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: inputAvatarRef.current.value,
        });
      
      
    }

    return (
        <PopupWithForm
          name="avatar"
          title="Редактировать аватар"
          buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          isOpen={isOpen}
          onClose={onClose}
          handleCloseOverlay={handleCloseOverlay}
          onSubmit={handleSubmit}>
          <fieldset className="popup__form-fieldset">
            <input className="popup__item popup__item_type_avatar"
              type="url"
              placeholder="Ссылка на аватар"
              name="avatar"
              ref={inputAvatarRef}              
              required
               />
            <span className="popup__error avatar-error"></span>
          </fieldset>
        </PopupWithForm>
    )
}