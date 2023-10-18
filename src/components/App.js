import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userMail, setUserMail] = useState({});
  
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);

  const [valueRegister, setValueRegister] = useState({
    email: '',
    password: '',
  })
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfoApi().then(setCurrentUser).catch(console.error);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCardsApi().then(setCards).catch(console.error);
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleDeleteClick() {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoToolTipOpen(false);

  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    api.switchLikeCard(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((item) => (item._id === card._id ? newCard : item)));
  })
    .catch((err) => console.log(err));
  }

  function handleCards(card) {
    handleDeleteClick(card);
    setSelectedCard(card);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api.deleteCard(selectedCard._id).then(() => {
      closeAllPopups();
      setCards(cards.filter((state) => state._id !== selectedCard._id));
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(value) {
    setIsLoading(true);
    api.setAvatar(value)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(item) {
    setIsLoading(true);
    api.createCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function openInfoToolTip() {
    setIsInfoToolTipOpen(true);
  }

  function handleRegister() {
    auth.register(valueRegister.password, valueRegister.email)
    .then((res) => {
      console.log(res);
      if (res) {
        setIsSuccess(true);
        navigate("/sign-in", { replace: true });
        setValueRegister({});
      }
    })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false);
    })
    .finally(() => openInfoToolTip());
  }

  const handleLogin = (bool) => {
    setLoggedIn(bool);
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getUserMe(jwt).then((res) => {
        if (res) {
          const userData = {
            email: res.data.email,
          };

          setLoggedIn(true);
          setUserMail(userData);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.error(err));
    }
  }

  function handleUserData(userEmail) {
    setUserMail({ email: userEmail });
  }

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  function handleSignOut() {
    localStorage.removeItem('jwt');
    navigate("/sign-in", { replace: true });
  }
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          userEmail={userMail}
          signOut={handleSignOut}
          loggedIn={loggedIn}
        />

        <Routes>
          <Route index element={
            <ProtectedRouteElement
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCards}
              cards={cards}
              loggedIn={loggedIn} />
          }
          />

          <Route path="/sign-up" element={
            <Register
              valueRegister={valueRegister}
              setValueRegister={setValueRegister}
              onHandleRegister={handleRegister} />
          }
          />

          <Route path="/sign-in" element={
            <Login
              handleLogin={handleLogin} 
              handleUserData={handleUserData}
              openInfoToolTip={openInfoToolTip}
              setIsSuccses={setIsSuccess}
              />
          }
          />

        </Routes>
        {loggedIn && <Footer />}
        
        
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
           />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading} />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups} />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          isLoading={isLoading}/>

          <InfoTooltip
            name="info-tool-tip"
            isSuccess={isSuccess}
            title={
              isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
              }
              isOpen={isInfoToolTipOpen}
              onClose={closeAllPopups}/>            
       
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
