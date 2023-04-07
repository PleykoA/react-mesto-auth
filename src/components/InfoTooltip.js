import React from 'react';
import enter from '../images/enter.svg'
import failed from '../images/failed.svg';

function InfoTooltip({ isOpen, onClose, isSignedUp }) {
    return (
        <section
            className={isOpen ? 'popup popup_opened' : 'popup'}
            name='infotooltip'
            isOpen={isOpen}
            onClick={onClose}
             >

            <div className='popup__container'>
                {isSignedUp ? (
                    <>
                        <img
                            className='infotooltip__image'
                            src={enter}
                            alt='Вы успешно зарегистрировались'
                        />
                        <p className='infotooltip__text'>Вы успешно зарегистрировались!</p>
                    </>
                ) : (
                    <>
                        <img className='infotooltip__image'
                            src={failed}
                            alt='Что-то пошло не так' />

                        <p className='infotooltip__text'>
                            Что-то пошло не так! Попробуйте ещё раз
                        </p>
                    </>

                )}  <button
                    className='popup__close-button'
                    type='button'
                    onClick={onClose}
                />

            </div>
        </section >
    );
}

export default InfoTooltip;

