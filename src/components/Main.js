import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) { 

    const currentUser = useContext(CurrentUserContext);


    const elements = cards.map(card =>(<Card 
      key={card._id} 
      card={card} 
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
      />));

    return (
        <main className="main">
          <section className="profile">
            <button className="profile__avatar-btn" 
              type="button"
              onClick={onEditAvatar}>
              <img className="profile__avatar-image" 
                alt={currentUser.name} 
                src={currentUser.avatar} />
              <div className="profile__avatar"></div>
            </button>            
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit-btn" 
                type="button" 
                aria-label="редактировать профиль"
                onClick={onEditProfile}></button>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button className="profile__add-btn" 
              type="button" 
              aria-label="добавить карточку"
              onClick={onAddPlace}></button>
          </section>
          <section className="elements">
            <div className="elements__list">{elements}</div>
          </section>
        </main>
    );
}