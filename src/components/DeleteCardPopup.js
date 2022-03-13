import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

return (
<>
<PopupWithForm
    overlayClick = {props.overlayClick}
    saveValue = {props.saveValue}
    onSubmit = {props.onSubmit}
    onClose = {props.onClose}
    isOpen = {props.isOpen}
    title = 'Вы уверены?'
    buttonName = 'Да'
    name = 'delete'
    />
</>
)
}

export default DeleteCardPopup;