import '../pages/index.css'

import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";

import { items } from "../scripts/Utils/constants.js";

import { config } from "../scripts/Utils/constants.js";
import { popUpEditForm } from "../scripts/Utils/constants.js";
import { popUpAddForm } from "../scripts/Utils/constants.js";

import { profileEditButton } from "../scripts/Utils/constants.js";
import { nameInput } from "../scripts/Utils/constants.js";
import { jobInput } from "../scripts/Utils/constants.js";
import { profileName } from "../scripts/Utils/constants.js";
import { profileJob } from "../scripts/Utils/constants.js";

import { profileAddButton } from "../scripts/Utils/constants.js";
import { popUpAddButton } from "../scripts/Utils/constants.js";
import { popUpInputName } from "../scripts/Utils/constants.js";
import { popUpInputLink } from "../scripts/Utils/constants.js";
import { cardContainer } from "../scripts/Utils/constants.js";

import { imagePopupSelector } from "../scripts/Utils/constants.js";
import { templateSelector } from "../scripts/Utils/constants.js";
import { containerSelector } from "../scripts/Utils/constants.js";

////////////////////////////////////////////////////////////////////
// Открытие попапа с картинкой 
//Cоздаем экземпляр класса - открытие картинки
const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();

//Открытие карточки по клику на картинку
function handleCardClick(name, link) {
    popupWithImage.open(name, link)
};

// Форма EDIT ///////////////////////////////////////////////////////////////
//Cоздаем экземпляр класса - информация о пользователе
const user = new UserInfo({ profileName, profileJob });

//Слушатель кнопки EDIT (Открывает PopUp)
profileEditButton.addEventListener("click", () => {
    const userData = user.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    FormValidatorEdit.resetFormsErrors();
    popUpEditProfile.open();
});

// Обработчик «Submit» формы Edit
const popUpEditProfile = new PopupWithForm({
    popupSelector: '.popup_edit',
    handleFormSubmit: ({ name, job }) => {
        user.setUserInfo({ name: nameInput.value, job: jobInput.value });
        name = nameInput.value;
        job = jobInput.value;
        popUpEditProfile.close();
    }
})

popUpEditProfile.setEventListeners();

// Форма ADD ///////////////////////////////////////////////////////////////// 
//Cоздаем экземпляр класса - добавление карточки
const popUpAddCard = new PopupWithForm({
    popupSelector: '.popup_add',
    handleFormSubmit: () => { }
})

popUpAddCard.setEventListeners();

profileAddButton.addEventListener("click", () => {
    popUpAddCard.open()
    popUpAddForm.reset();
    FormValidatorAdd.resetFormsErrors()
    FormValidatorAdd.disableSubmitButton()
});

popUpAddButton.addEventListener("click", () => {
    createUserCard();
    popUpAddCard.close()
})


function createCard(item) {
    const data = { name: item.name, link: item.link }
    const card = new Card(data, templateSelector, handleCardClick);
    return card.generateCard()
}

function renderCard(item) {
    cardContainer.prepend(item)
}

function createUserCard() {
    renderCard(createCard({
        name: popUpInputName.value,
        link: popUpInputLink.value
    }))
}

// Валидация форм
const FormValidatorEdit = new FormValidator(popUpEditForm, config);
FormValidatorEdit.enableValidation();

const FormValidatorAdd = new FormValidator(popUpAddForm, config);
FormValidatorAdd.enableValidation();


// Класс Section, отвечает за отрисовку элементов на странице.
const SectionCard = new Section({
    data: items,
    renderer: (item) => {
        const card = new Card(item, templateSelector, handleCardClick);
        const newcard = card.generateCard();
        SectionCard.addItem(newcard)
    },
}, containerSelector);

SectionCard.renderItems();