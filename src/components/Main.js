import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ editProfile, addPlace, editAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className='main'>
            <section className='profile'>
                <div className='profile__edit-info'>
                    <div className='profile__avatar-container'>
                        <div className='profile__overlay'>
                            <img className='profile__avatar'
                                src={currentUser.avatar}
                                alt='Аватар'
                            />
                            <button
                                className='profile__avatar-edit-button'
                                type='button'
                                onClick={editAvatar}>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='profile__info'>
                    <div className='profile__info-edit'>
                        <h1 className='profile__title'>{currentUser.name}</h1>
                        <button
                            className='profile__edit-button'
                            type='button'
                            onClick={editProfile}>
                        </button>
                    </div>
                    <p className='profile__subtitle'>{currentUser.about}</p>
                </div>
                <button
                    className='profile__add-button'
                    type='button'
                    onClick={addPlace}>
                </button>
            </section>
            <div className='cards'>
                <ul className='cards__item'>
                    {cards.map((card) => (
                        <Card key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default Main;