import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  
  const isLiked = card.likes.some((card) => card._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like-btn ${isLiked && 'element__like-btn_active'}` 
  );
  
  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }


  return (
      <div className="element">
        <button className={`element__trash ${isOwn ? 'element__trash_active' : ''}`}          
          type="button"
          onClick={handleDeleteClick}></button>
        <img className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick} />
        <div className="element__info">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-container">
            <button className={cardLikeButtonClassName} 
              type="button"
              onClick={handleLikeClick} />
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </div>
  )
}