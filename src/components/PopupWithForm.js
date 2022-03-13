import React from 'react';

function PopupWithForm(props) {

    return (
    <div onMouseUp={props.overlayClick} className={`pop-up pop-up_${props.name} ${props.isOpen ? 'pop-up_opened' : ""}`}>
      <div className="pop-up__container"> 
        <form onSubmit={props.onSubmit} className={`form form_${props.name}`} name={props.name}>
          <h2 className="form__title">{props.title}</h2>
              {props.children}
          <button disabled={props.isDisabled} onClick={props.onClose} className="form__button form__button-edit" type="submit">{props.saveValue ? props.buttonName+'...' : props.buttonName}</button>
        </form>
        <button onMouseUp={props.onClose} className="pop-up__exit pop-up__exit_profile" type="button" aria-label="Закрыть"></button>
      </div>
    </div>
    ) 
}
export default PopupWithForm