import PopupWithForm from './PopupWithForm';
import useFormValidation from '../utils/useFormValidation';
import React, { useEffect, useRef } from 'react';

function EditAvatarPopup({ isOpen, editAvatar, isLoading, onClose }) {
    const { values, handleChange, resetValidation, isValid, errors } = useFormValidation({});
    const avatar = useRef(null);

    useEffect(() => {
        resetValidation();
    }, [isOpen, resetValidation]);

    function handleSubmit(e) {
        e.preventDefault();
        editAvatar({ avatar: avatar.current.value });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name='avatar-edit'
            title='Обновить аватар'
            buttonText='Сохранить'
            isLoading={isLoading}
            isValid={!isValid}
        >
            <input className={`form__input form__input_link_avatar ${isValid ? '' : 'form__input_type_error'}`}
                type='url'
                name='avatar'
                ref={avatar}
                value={values.avatar || ''}
                onChange={handleChange}
                placeholder='Ссылка на картинку'
                minLength='2'
                maxLength='200'
                required
            />
            <span className={`form__input-error ${errors.avatar && 'form__input-error_active'}`}>{errors.avatar || ''}</span>

        </PopupWithForm >
    );
}

export default EditAvatarPopup;