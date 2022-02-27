import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';









function App() {
  const[isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const[selectedCard,setSelectedCard] = React.useState('');

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard('');
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }


  return (
    <div className="page">
      
    <Header />
    <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
    <Footer />
    {/* форма редактирования профиля */}
    <PopupWithForm
     onClose = {closeAllPopups}
     isOpen = {isEditProfilePopupOpen}
     title = 'Редактировать профиль'
     buttonName = 'Сохранить'
     name = 'profile'
     children={
       <>
          <label className="form__field">
            <input className="form__input form__input_profile_name" id="form__input-error_name" minlength="2" maxlength="40" type="text"  name="name" value="Жак-Ив Кусто" placeholder="Введите имя" required/>
            <span className="form__input-error form__input-error_name form__input-error_name-err" ></span>
          </label>
          <label className="form__field">
            <input className="form__input form__input_profile_subname" id="form__input-error_subname" minlength="2" maxlength="200" type="text" name="subname" value="Исследователь океана" placeholder="Введите описание" required/>
            <span className="form__input-error form__input-error_subname form__input-error_subname-err"></span>
          </label>
       </>
     } />
     {/* форма создания карточки */}
     <PopupWithForm
     onClose = {closeAllPopups}
     isOpen = {isAddPlacePopupOpen}
     title = 'Новое место'
     buttonName = 'Сохранить'
     name = 'add'
     children={
       <>
          <label className="form__field">
            <input className="form__input form__input_add_name" id="form__input-error_add" minlength="2" maxlength="30" type="text"  name="title" placeholder="Название" required/>
            <span className="form__input-error form__input-error_add form__input-error_add-err" ></span>
          </label>
          <label className="form__field">
            <input className="form__input form__input_add_url" id="form__input-error_url" type="URL" name="link" placeholder="Ссылка на картинку" required/>
            <span className="form__input-error form__input-error_url form__input-error_url-err" ></span>
          </label>
       </>
     } />
     {/* форма редактирования аватара */}
     <PopupWithForm
     onClose = {closeAllPopups}
     isOpen = {isEditAvatarPopupOpen}
     title = 'Обновить аватар'
     buttonName = 'Сохранить'
     name = 'avatar'
     children={
       <>
          <label className="form__field">
            <input className="form__input form__input_add_url" id="form__input-error_delete" type="URL" name="link" placeholder="Ссылка на картинку" required/>
            <span className="form__input-error form__input-error_url form__input-error_url-err" ></span>
          </label>
       </>
     } />
     {/* форма удаления карточки*/}
     <PopupWithForm
     title = 'Вы уверены?'
     buttonName = 'Да'
     name = 'delete'
     children={
       <>
          
       </>
     } />
    <ImagePopup 
    onClose = {closeAllPopups}
    card={selectedCard}/>
    
    
    </div>
  );
}

export default App;
