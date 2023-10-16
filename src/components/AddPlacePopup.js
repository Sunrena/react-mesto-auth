import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
    isOpen,
    onClose,
    isLoading,
    onAddPlace,
    handleCloseOverlay,
}) {
    const [card, setCard] = useState({});

    function handleChange(evt) {
        setCard({ ...card, [evt.target.name]: evt.target.value });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace(card);

    }

    useEffect(()=>{
      setCard({});
    },[isOpen])


    return (
        <PopupWithForm
          name="place"
          title="Новое место"
          buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          handleCloseOverlay={handleCloseOverlay}>
          <fieldset className="popup__form-fieldset">
            <input className="popup__item popup__item_value_place"
              type="text"
              placeholder="Название"
              name="name"
              minLength="2"
              maxLength="30"
              value={card.name || ''}
              onChange={handleChange}
              required
               />
            <span className="popup__error name-error"></span>
            <input className="popup__item popup__item_value_url"
              type="url"
              placeholder="Ссылка на картинку"
              name="link"
              value={card.link || ''}
              onChange={handleChange}
              required
               />
            <span className="popup__error link-error"></span>
          </fieldset>
        </PopupWithForm>
    )
}