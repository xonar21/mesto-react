import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

return (
<>
<PopupWithForm
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