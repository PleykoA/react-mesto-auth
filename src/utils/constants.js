import { Api } from './Api';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  errorSelector: 'form__input-error',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};



//кнопки добавления
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileEditAvatarButton = document.querySelector('.profile__avatar-edit-button');

//формы
export const formElement = document.querySelector('.form_type_edit');
export const formPlace = document.querySelector('.form_edit_place');
export const formAvatar = document.querySelector('.form_edite_avatar');

//инпуты
/* const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle'); */
export const popupNameInput = document.querySelector('.form__input_item_name');
export const popupInfoInput = document.querySelector('.form__input_item_job');
/* const popupLinkInput = document.querySelector('.form__input_item_link');
const popupPlaceInput = document.querySelector('.form__input_item_place'); */

export const cardsItems = document.querySelector('.cards__item');
export const avatarInput = document.querySelector('.form__input_link_avatar');
