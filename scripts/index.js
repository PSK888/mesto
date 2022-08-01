import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const popUpEdit = document.querySelector(".popup_edit");
const popUpEditForm = document.querySelector(".popup__form_edit");
const nameInput = document.querySelector(".popup__name");
const profileName = document.querySelector(".profile__name");
const jobInput = document.querySelector(".popup__job");
const profileJob = document.querySelector(".profile__job");

const profileAddButton = document.querySelector(".profile__add-button");
const popUpAdd = document.querySelector(".popup_add");
const submitAddButton = document.querySelector(".popup__add-button");
const popUpAddForm = document.querySelector(".popup__form_add");
const popUpInputName = document.querySelector(".popup__input_name");
const popUpInputLink = document.querySelector(".popup__input_link");
const popUpImage = document.querySelector(".popup__image");
const popUpText = document.querySelector(".popup__text");

const popUpCard = document.querySelector(".popup_card");
const templateCard = document.querySelector(".template_card").content;
const sectionCards = document.querySelector(".elements");
const card = templateCard.querySelector(".element").cloneNode(true);
const cardImage = card.querySelector(".element__image")

const popUps = [popUpEdit, popUpAdd, popUpCard]
const escKey = 'Escape'

////////////////////////////////////////////////////////////////////
function openPopup(popUp) {
    popUp.classList.add("popup_opened")
    FormValidatorAdd._resetFormsErrors()
    FormValidatorEdit._resetFormsErrors()
    submitAddButton.classList.add("popup__button_disabled");
    submitAddButton.setAttribute('disabled', true);
    document.addEventListener("keydown", closePopupOnEsc);
}

function closePopUp(popUp) {
    popUp.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupOnEsc);
}

// Открытие попапа с картинкой 
function openPopupCard(name, link) {
    openPopup(popUpCard)
    popUpImage.src = link;
    popUpImage.alt = name;
    popUpText.textContent = name;
    cardImage.addEventListener("click", function () { openPopupCard(name, link) });
}

// Слушатель кнопки EDIT (Открывает PopUp)
profileEditButton.addEventListener("click", () => {
    openPopup(popUpEdit)
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
});

// Слушатель кнопки ADD (Открывает PopUp)
profileAddButton.addEventListener("click", () => {
    openPopup(popUpAdd)
    popUpAddForm.reset();
});

//закрытие попапа по клику мимо тела попапа или по клику на кнопку Х:
popUps.forEach((popUp) => {
    popUp.addEventListener("click", (event) => {
        if (event.target === event.currentTarget || event.target.classList.contains("popup__close")) {
            closePopUp(popUp)
        }
    })
})

//закрытие попапа по клику на клавишу ESC:
function closePopupOnEsc(event) {
    if (event.key === escKey) {
        const popUpOpen = document.querySelector(".popup_opened");
        closePopUp(popUpOpen);
    }
};

// Форма EDIT ///////////////////////////////////////////////////////////////

// Обработчик «Submit» формы Edit
function handleSubmitEditForm(evt) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopUp(popUpEdit)
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” в Edit
popUpEditForm.addEventListener("submit", handleSubmitEditForm);
// Валидация формы
const FormValidatorEdit = new FormValidator(popUpEditForm, config);
FormValidatorEdit.enableValidation();


// Форма ADD /////////////////////////////////////////////////////////////////

// Добавляем карточки из scripts\Utils\initialCards.js
initialCards.forEach((item) => {
    const data = { name: item.name, link: item.link }
    const templateSelector = '.template_card'
    const card = new Card(data, templateSelector, openPopupCard);// Создадим экземпляр карточки
    const cardElement = card.generateCard();// Создаём карточку и возвращаем наружу
    document.querySelector(".elements").prepend(cardElement);// Добавляем в DOM
})

// Добавляем карточку пользователя
function createNewCard() {
    const UserData = { name: popUpInputName.value, link: popUpInputLink.value };
    const templateSelector = '.template_card';
    const newCard = new Card(UserData, templateSelector, openPopupCard);
    sectionCards.prepend(newCard.generateCard());
}

// Обработчик «Submit» формы ADD  
function handleSubmitAddForm(evt) {
    createNewCard(); closePopUp(popUpAdd)
};
// Прикрепляем обработчик к форме: он будет следить за событием “submit” в ADD   
popUpAddForm.addEventListener("submit", handleSubmitAddForm);
// Валидация формы
const FormValidatorAdd = new FormValidator(popUpAddForm, config);
FormValidatorAdd.enableValidation();









