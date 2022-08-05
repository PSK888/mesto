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
const popUpAddButton = document.querySelector(".popup__add-button");
const popUpAddForm = document.querySelector(".popup__form_add");
const popUpInputName = document.querySelector(".popup__input_name");
const popUpInputLink = document.querySelector(".popup__input_link");
const popUpImage = document.querySelector(".popup__image");
const popUpText = document.querySelector(".popup__text");
const popUpCard = document.querySelector(".popup_card");
const cardsSection = document.querySelector(".elements");
const templateSelector = '.template_card';
const sectionCards = document.querySelector(".elements");

const popUps = document.querySelectorAll('.popup')


////////////////////////////////////////////////////////////////////
function openPopup(popUp) {
    popUp.classList.add("popup_opened")
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
}

// Слушатель кнопки EDIT (Открывает PopUp)
profileEditButton.addEventListener("click", () => {
    openPopup(popUpEdit)
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
    FormValidatorEdit.resetFormsErrors()
});

// Слушатель кнопки ADD (Открывает PopUp)
profileAddButton.addEventListener("click", () => {
    openPopup(popUpAdd)
    popUpAddForm.reset();
    FormValidatorAdd.resetFormsErrors()
    FormValidatorAdd.disableSubmitButton()
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
function createCard(item) {
    const data = { name: item.name, link: item.link }
    const card = new Card(data, templateSelector, openPopupCard);
    return card.generateCard()
}

function renderCard(item) {
    sectionCards.prepend(item)
}

initialCards.forEach((item) => { 
    renderCard(createCard(item));
})

function createUserCard() {
    renderCard(createCard({
        name: popUpInputName.value, 
        link: popUpInputLink.value
    }))
}

// Обработчик «Submit» формы ADD   
function handleSubmitAddForm(evt) {
    createUserCard(); closePopUp(popUpAdd)
};

// Прикрепляем обработчик к форме: он будет следить за событием “submit” в ADD    
popUpAddForm.addEventListener("submit", handleSubmitAddForm);

// Валидация формы 
const FormValidatorAdd = new FormValidator(popUpAddForm, config);
FormValidatorAdd.enableValidation();









