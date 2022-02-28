import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const[isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const[isdeletePlacePopupOpen, setDeletePlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const[selectedCard,setSelectedCard] = React.useState({});

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick() {
    setDeletePlacePopupOpen(true);
  }

  return (
    <div className="page">
      <Header />
      <Main onDeleteCard={handleDeletePlaceClick} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
      <Footer />
      {/* форма редактирования профиля */}
      <PopupWithForm
      onClose = {closeAllPopups}
      isOpen = {isEditProfilePopupOpen}
      title = 'Редактировать профиль'
      buttonName = 'Сохранить'
      name = 'profile'
      >
        <label className="form__field">
          <input className="form__input form__input_profile_name" id="form__input-error_name" minLength="2" maxLength="40" type="text"  name="name" placeholder="Введите имя" required/>
          <span className="form__input-error form__input-error_name form__input-error_name-err" ></span>
        </label>
        <label className="form__field">
          <input className="form__input form__input_profile_subname" id="form__input-error_subname" minLength="2" maxLength="200" type="text" name="subname" placeholder="Введите описание" required/>
          <span className="form__input-error form__input-error_subname form__input-error_subname-err"></span>
        </label>   
      </PopupWithForm>
      {/* форма создания карточки */}
      <PopupWithForm
      onClose = {closeAllPopups}
      isOpen = {isAddPlacePopupOpen}
      title = 'Новое место'
      buttonName = 'Сохранить'
      name = 'add'
      >
        <label className="form__field">
          <input className="form__input form__input_add_name" id="form__input-error_add" minLength="2" maxLength="30" type="text"  name="title" placeholder="Название" required/>
          <span className="form__input-error form__input-error_add form__input-error_add-err" ></span>
        </label>
        <label className="form__field">
          <input className="form__input form__input_add_url" id="form__input-error_url" type="URL" name="link" placeholder="Ссылка на картинку" required/>
          <span className="form__input-error form__input-error_url form__input-error_url-err" ></span>
        </label> 
      </PopupWithForm>
      {/* форма редактирования аватара */}
      <PopupWithForm
      onClose = {closeAllPopups}
      isOpen = {isEditAvatarPopupOpen}
      title = 'Обновить аватар'
      buttonName = 'Сохранить'
      name = 'avatar'
      >
        <label className="form__field">
          <input className="form__input form__input_add_url" id="form__input-error_delete" type="URL" name="link" placeholder="Ссылка на картинку" required/>
          <span className="form__input-error form__input-error_url form__input-error_url-err" ></span>
        </label>
      </PopupWithForm>
      {/* форма удаления карточки*/}
      <PopupWithForm
      onClose = {closeAllPopups}
      isOpen = {isdeletePlacePopupOpen}
      title = 'Вы уверены?'
      buttonName = 'Да'
      name = 'delete'
      />
      <ImagePopup 
      card={selectedCard}
      onClose = {closeAllPopups}
      />
    </div>
  );
}
export default App;
