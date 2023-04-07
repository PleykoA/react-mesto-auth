import React from 'react';
import Popup from './Popup';
import success from '../images/enter.svg'
import error from '../images/failed.svg';

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
                        src={success}
                        alt='Регистрация успешно завершена'
                    />
                    <p className='infotooltip__text'>Вы успешно зарегистрировались!</p>
                </>
            ) : (
                <>
                    <img className='infotooltip__image' src={error} alt='Регистрация не удалась' />
                    <p className='infotooltip__text'>
                        Что-то пошло не так! Попробуйте ещё раз
                    </p>
                </>
            )}
        </Popup>
    );
}

export default InfoTooltip;

