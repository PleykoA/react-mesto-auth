import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useFormValidation from '../utils/useFormValidation';

function EditProfilePopup({ isOpen, onUpdateUser, onClose, isLoading }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, setValues, resetValidation, isValid, errors } = useFormValidation({ name: currentUser.name, about: currentUser.about });

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser(values);
    }

    useEffect(() => {
        resetValidation();
        if (currentUser) {
            setValues(currentUser);
        }
    }, [isOpen, currentUser, setValues, resetValidation]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name='profile-edit'
            title='Редактировать профиль'
            buttonText='Сохранить'
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isValid={!isValid}
        >
            <input
                className={`form__input form__input_item_name ${isValid ? '' : 'form__input_type_error'}`}
                type='text'
                name='name'
                placeholder='Имя'
                minLength='2'
                maxLength='40'
                value={values.name || ''}
                onChange={handleChange}
                required
            />
            <span className={`form__input-error name-input-error ${errors.name && 'form__input-error_active'}`}>{errors.name || ''}</span>

            <input
                className={`form__input form__input_item_job ${isValid ? '' : 'form__input_type_error'}`}
                type='text'
                name='about'
                placeholder='О себе'
                minLength='2'
                maxLength='200'
                value={values.about || ''}
                onChange={handleChange}
                required
            />
            <span className={`form__input-error job-input-error ${isValid ? '' : 'form__input-error_active'}`}>{errors.about || ''}</span>

        </PopupWithForm>
    );
}

export default EditProfilePopup;