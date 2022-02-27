import React from 'react';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
        console.log(props.card.name)
    } 

    return (
        
        
            <div className="element">
            <button className="element__delete-card"></button>
            <img  onMouseUp={handleClick} alt={props.card.name} src={props.card.link} className="element__image"/>
            <div className="element__group">
              <h2 className="element__title">{props.card.name}</h2>
              <div className="element__group-counts">
                <button className="element__like" type="button" aria-label="Нравится"></button>
                <p className="element__like-count">{props.card.likes.length}</p>
              </div>
            </div>
          </div>
          
        
    )


}

export default Card