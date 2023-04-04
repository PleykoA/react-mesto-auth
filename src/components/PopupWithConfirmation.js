import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirmation({ isOpen, onClose, isLoading, card, isValid, onCardDelete }) {

  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name='delete'
      title='Вы уверены?'
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      onSubmit={handleSubmit}
      isValid={!isValid}
      onClose={onClose}
      isLoading={isLoading}
    />
  );
}

export default PopupWithConfirmation;
