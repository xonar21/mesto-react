import React from 'react';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import {CurrentUserContext} from '../context/CurrentUserContext';

function App() {
  const[currentUser, setCurrentUser] = React.useState("");
  const[isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const[isDeletePlacePopupOpen, setDeletePlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const[selectedCard,setSelectedCard] = React.useState({});
  const[cards,setCards] = React.useState([ ]);
  const[cardDelete,setCardDelete] = React.useState({});
  const[saveValue,setSaveValue] = React.useState(false)

  React.useEffect(() => {
    api.getUserInformation()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      }); 
  }, []);


  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePlacePopupOpen(false);
    document.removeEventListener('keydown',handleEscPopup);
    setSelectedCard({});
  }

  function handleEscPopup(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    document.addEventListener('keydown',handleEscPopup);
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    document.addEventListener('keydown',handleEscPopup);
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    document.addEventListener('keydown',handleEscPopup);
    setAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick(card) {
    document.addEventListener('keydown',handleEscPopup);
    setCardDelete(card);
    setDeletePlacePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(evt) {
    setSaveValue(true);
    evt.preventDefault();
    api.delCardFromServer(cardDelete._id)
      .then(() => {
        const newCards = cards.filter((elem) => elem !== cardDelete);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSaveValue(false);
      })
  }

  React.useEffect(() => {
    api.getCardsFromServer()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  function handleUpdateUser(res) {
    setSaveValue(true);
    api.pathEditProfile(res)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSaveValue(false);
      })
  }

  function handleUpdateAvatar(res) {
    setSaveValue(true);
    api.patchAvatar(res)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSaveValue(false);
      })
  }

  function handleUpdateCards(res) {
    setSaveValue(true);
    api.postCard(res)
      .then((res) => {
        setCards([res, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSaveValue(false);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main popupDelete={handleDeletePlaceClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onDeleteCard={handleDeletePlaceClick} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
          <Footer />
          {/* форма редактирования профиля */}
          <EditProfilePopup overlayClick={handleOverlayClose} saveValue={saveValue} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} /> 
          {/* форма создания карточки */}
          <AddPlacePopup overlayClick={handleOverlayClose} saveValue={saveValue} onUpdateCards={handleUpdateCards} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          {/* форма редактирования аватара */}
          <EditAvatarPopup overlayClick={handleOverlayClose} saveValue={saveValue}  onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          {/* форма удаления карточки*/}
          <DeleteCardPopup overlayClick={handleOverlayClose} saveValue={saveValue} onSubmit={handleCardDelete} isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} />
          <ImagePopup 
          card={selectedCard}
          onClose = {closeAllPopups}
          />
        </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
