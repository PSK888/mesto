// import to index.js :
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}
export const popUpEditForm = document.querySelector(".popup__form_edit");
export const popUpAddForm = document.querySelector(".popup__form_add");
export const popUpAvatarForm = document.querySelector(".popup__form_avatar");

export const profileEditButton = document.querySelector(".profile__edit-button");
export const nameInput = document.querySelector(".popup__name");
export const jobInput = document.querySelector(".popup__job");
export const profileAvatarButton = document.querySelector('.profile__avatar');

export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");
export const profileAvatar = document.querySelector(".profile__avatar");

export const profileAddButton = document.querySelector(".profile__add-button");

export const imagePopupSelector = '.popup_card';
export const templateSelector = '.template_card';
export const containerSelector = ".elements";
export const popupEditSelector = '.popup_edit';
export const popupAddSelector = ".popup_add";

// import to Popup.js:
export const escKey = 'Escape'

