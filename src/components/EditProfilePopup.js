import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser,
    isLoading,
    handleCloseOverlay,
}) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          handleCloseOverlay={handleCloseOverlay}        
          >
          <fieldset className="popup__form-fieldset">
            <input className="popup__item popup__item_type_name"
              type="text"
              placeholder="Введите имя"
              name="name"
              minLength="2"
              maxLength="40"
              required
              value={name || ''}
              onChange={handleChangeName} />
            <span className="popup__error name-error"></span>
            <input className="popup__item popup__item_type_subname"
              type="text"
              placeholder="Введите описание"
              name="about"
              minLength="2"
              maxLength="200"
              required
              value={description || ''}
              onChange={handleChangeDescription} />
            <span className="popup__error about-error"></span>
          </fieldset>
        </PopupWithForm>
    );
}