import "../pages/index.css";

import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";

import {
    items, config, popUpEditForm, popUpAddForm, profileEditButton,
    nameInput, jobInput, profileName, profileJob, profileAddButton,
    popUpInputName, popUpInputLink, imagePopupSelector, templateSelector,
    containerSelector, popupEditSelector, popupAddSelector
} from "../scripts/utils/constants.js";

////////////////////////////////////////////////////////////////////
// Открытие попапа с картинкой 
//Cоздаем экземпляр класса - открытие картинки
const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();

//Открытие карточки по клику на картинку
function handleCardClick(name, link) {
    popupWithImage.open(name, link);
};

// Форма EDIT ///////////////////////////////////////////////////////////////
//Cоздаем экземпляр класса - информация о пользователе
const user = new UserInfo({ profileName, profileJob });

//Слушатель кнопки EDIT (Открывает PopUp)
profileEditButton.addEventListener("click", () => {
    const userData = user.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    validatorEditProfile.resetFormsErrors();
    popUpEditProfile.open();
});

// Обработчик «Submit» формы Edit
const popUpEditProfile = new PopupWithForm({
    popupSelector: popupEditSelector,
    handleFormSubmit: (data) => {
        user.setUserInfo({ name: data.editName, job: data.editJob });
    }
})

popUpEditProfile.setEventListeners();

// Форма ADD ///////////////////////////////////////////////////////////////// 
//Cоздаем экземпляр класса - добавление карточки
const popUpAddCard = new PopupWithForm({
    popupSelector: popupAddSelector,
    handleFormSubmit: (data) => {
        renderCard(createCard({
            name: data.addName,
            link: data.addLink
        }));
    }
})

profileAddButton.addEventListener("click", () => {
    popUpAddCard.open();
    popUpAddForm.reset();
    validatorAddCard.resetFormsErrors();
    validatorAddCard.disableSubmitButton();
});

popUpAddCard.setEventListeners();

function createCard(item) {
    const data = { name: item.name, link: item.link };
    const card = new Card(data, templateSelector, handleCardClick);
    return card.generateCard();
}

function renderCard(item) {
    cardsList.addItem(item);
}

// Валидация форм
const validatorEditProfile = new FormValidator(popUpEditForm, config);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(popUpAddForm, config);
validatorAddCard.enableValidation();

// Класс Section, отвечает за отрисовку элементов на странице.
const cardsList = new Section({
    data: items,
    renderer: (item) => {
        const card = createCard(item);
        renderCard(card);
    },
}, containerSelector);

cardsList.renderItems();

const tweets = [
    'Какой-то странный тред',
    'Твит, адресованный Илону Маску',
    'Ответ на инфоповод'
  ];
  
  function consoleTweet(tweet) {
      console.log(tweet);
  }
  
  tweets.forEach(consoleTweet); 