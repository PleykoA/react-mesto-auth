import React from 'react';
import enter from '../images/enter.svg'
import failed from '../images/failed.svg';

function InfoTooltip({ isOpen, onClose, isSignedUp }) {
    return (
        <section
            className={isOpen ? 'popup popup_opened' : 'popup'}
            name='infotooltip'
            onClick={onClose}
        >

            <div className='popup__container'>
                <img
                    className='infotooltip__image'
                    src={isSignedUp ? enter : failed}
                    alt={isSignedUp ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так'}
                />
                <p className='infotooltip__text'>
                    {isSignedUp ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
                <button
                    className='popup__close-button'
                    type='button'
                    onClick={onClose}
                />

            </div>
        </section >
    );
}

export default InfoTooltip;

