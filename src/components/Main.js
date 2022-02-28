import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {

  const[userName,setUserName] = React.useState('');
  const[userDescription,setUserDescription] = React.useState('');
  const[userAvatar,setUserAvatar] = React.useState('');
  const[cards,setCards] = React.useState([ ]);
  
  React.useEffect(() => {
    api.getUserInformation()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
    api.getCardsFromServer()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    return (
      <main className="main">
        <section className="profile">
          <div  className="profile__avatarShadow">
            <img onMouseUp={props.onEditAvatar}  className="profile__avatar" src={userAvatar} alt="аватар"/>
          </div>
          <div className="profile__info">
            <div className="profile__info-text">
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__subname">{userDescription}</p>
            </div>
            <button onMouseUp={props.onEditProfile}  className="profile__edit-button" type="button" aria-label="Изменить"></button>
          </div>
          <button onMouseUp={props.onAddPlace} className="profile__add-button" type="button" aria-label="Создать"></button>
        </section>
        <section className="elements">
        {cards.map(card =>
          <Card
            key={card._id}
            card={card}
            onDeleteCard={props.onDeleteCard}
            onCardClick={props.onCardClick}
          />
        )}
        </section>
      </main>
    )
}

export default Main