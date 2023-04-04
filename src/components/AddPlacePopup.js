import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../utils/useFormValidation';

function AddPlacePopup({ addPlace, isOpen, onClose, isLoading }) {
    const { values, handleChange, setValues, resetValidation, isValid, errors } = useFormValidation({});

    function handleSubmit(e) {
        e.preventDefault();
        addPlace({
            name: values.place,
            link: values.link,
        });

    }

    useEffect(() => {
        resetValidation();
        setValues({});
    }, [setValues, resetValidation, isOpen]);


    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name='add'
            title='Новое место'
            buttonText='Сохранить'
            isLoading={isLoading}
            isValid={!isValid}
        >
            <input
                className={`form__input form__input_item_place ${isValid ? '' : 'form__input_type_error'}`}
                type='text'
                name='place'
                placeholder='Название'
                minLength='2'
                maxLength='30'
                onChange={handleChange}
                value={values.place || ''}
                required
            />
            <span className={`form__input-error place-input-error ${errors.place && 'form__input-error_active'}`}>{errors.place || ''}</span>

            <input
                className={`form__input form__input_item_link ${isValid ? '' : 'form__input_type_error'}`}
                type='url'
                name='link'
                placeholder='Ссылка на картинку'
                onChange={handleChange}
                value={values.link || ''}
                required
            />
            <span className={`form__input-error link-input-error ${errors.link && 'form__input-error_active'}`}>{errors.link || ''}</span>

        </PopupWithForm>
    );
}

export default AddPlacePopup;