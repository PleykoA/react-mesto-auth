import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? 'card__delete'
    : 'card__delete_disable';

  function isLiked() {
    return card.likes.some((like) => {
      return currentUser._id === like._id;
    });
  }

  return (
    <div id='card-template'>
      <li className='card'>
        <img
          className='card__image'
          alt={card.name}
          src={card.link}
          onClick={() => onCardClick(card)}
        />

        <button
          className={cardDeleteButtonClassName}
          type='button'
          onClick={() => onCardDelete(card)}>
        </button>

        <div className='card__container'>
          <h2 className='card__title'>{card.name}</h2>
          <div className='card__like_container'>

            <button
              className={`card__like ${isLiked() && 'card__like_active'}`}
              type='button'
              id='like'
              onClick={() => onCardLike(card)}>
            </button>

            <span className='card__like-count'>{card.likes.length}</span>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;