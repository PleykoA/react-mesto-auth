import React from 'react';
import Popup from './Popup';
import successIcon from '../images/success.svg';
import errorIcon from '../images/error.svg';

function InfoTooltip({ isOpen, onClose, isSignedUp }) {
    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            name={'infotooltip'}>
            {isSignedUp ? (
                <>
                    <img
                        className='infotooltip__image'
                        src={successIcon}
                        alt='Регистрация успешно завершена'
                    />
                    <p className='infotooltip__text'>Вы успешно зарегистрировались!</p>
                </>
            ) : (
                <>
                    <img className='infotooltip__image' src={errorIcon} alt='Регистрация не удалась' />
                    <p className='infotooltip__text'>
                        Что-то пошло не так! Попробуйте ещё раз
                    </p>
                </>
            )}
        </Popup>
    );
}

export default InfoTooltip;

