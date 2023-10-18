import React from "react";
import PopupWithForm from "./PopupWithForm";
import { usePopupClose } from "../hooks/usePopupClose";

export default function ConfirmPopup({
    isOpen,
    onClose,
    onConfirm,
    isLoading,    
}) {

    usePopupClose(isOpen, onClose);

    function handleSubmit(evt) {
        evt.preventDefault();    
        onConfirm();
}

    return (
        <PopupWithForm
          title="Вы уверены?"
          buttonText={isLoading ? "Удаление..." : "Удалить"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
           />
    )
}