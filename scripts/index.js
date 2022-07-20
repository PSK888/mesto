const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popUpEdit = document.querySelector(".popup_edit");
const popUpAdd = document.querySelector(".popup_add");
const popUpCard = document.querySelector(".popup_card");
const popUps = [popUpEdit, popUpAdd, popUpCard]
const templateCard = document.querySelector(".template_card").content;
const sectionCards = document.querySelector(".elements");
const nameInput = document.querySelector(".popup__name");
const profileName = document.querySelector(".profile__name");
const jobInput = document.querySelector(".popup__job");
const profileJob = document.querySelector(".profile__job");
const submitAddButton = document.querySelector(".popup__add-button");
const submitEditForm = document.querySelector(".popup__edit-button");
const popUpInputName = document.querySelector(".popup__input_name");
const popUpInputLink = document.querySelector(".popup__input_link");
const popUpEditForm = document.querySelector(".popup__form_edit");
const popUpAddForm = document.querySelector(".popup__form_add");
const popUpImage = document.querySelector(".popup__image");
const popUpText = document.querySelector(".popup__text");
const escKey = 'Escape'

const openPopup = (popUp) => {
    popUp.classList.add("popup_opened")
    resetFormsErrors();
    submitAddButton.classList.add(inactiveButtonClass);
    submitAddButton.setAttribute('disabled', true);
    document.addEventListener("keydown", closePopUpEsc);
}

const closePopUp = (popUp) => {
    popUp.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopUpEsc);
}

// Открытие попапа с картинкой 
const openPopupCard = (name, link) => {
    openPopup(popUpCard)
    popUpImage.src = link;
    popUpImage.alt = name;
    popUpText.textContent = name;
}

// Слушатель кнопки EDIT
profileEditButton.addEventListener("click", () => {
    openPopup(popUpEdit)
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
});

// Слушатель кнопки ADD
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
function closePopUpEsc(event) {
    if (event.key === escKey) {
        const popUpOpen = document.querySelector(".popup_opened");
        closePopUp(popUpOpen);
    }
};

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleSubmitEditForm(evt) {
    evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” в Edit
popUpEditForm.addEventListener("submit", handleSubmitEditForm);
submitEditForm.addEventListener("click", () => { handleSubmitEditForm, closePopUp(popUpEdit) });

// Массив карточек (initialCards) перенесен в отдельный cards.js
const renderCard = (card) => { sectionCards.prepend(createCard(card)); }
initialCards.forEach((card) => { renderCard(card) });

// Функция добавить карточку
function createCard({ name, link }) {
    const card = templateCard.querySelector(".element").cloneNode(true);
    const cardImage = card.querySelector(".element__image")
    cardImage.src = link;
    cardImage.alt = name;
    cardImage.addEventListener("click", function () { openPopupCard(name, link) });
    const cardText = card.querySelector(".element__text")
    cardText.textContent = name;

    //Удаление карточек
    const deleteButton = card.querySelector(".element__del");
    deleteButton.addEventListener("click", () => deleteCard(card));

    //Лайк карточек
    const likeButton = card.querySelector(".element__like");
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle("element__like_active");
    })

    //Удаление карточек
    function deleteCard(card) {
        card.remove()
    }

    return card;
}

// Добавление карточки через popup
submitAddButton.addEventListener("click", () => { closePopUp(popUpAdd) });
popUpAddForm.addEventListener("submit", handleSubmitAddForm);

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleSubmitAddForm(evt) {
    evt.preventDefault()
    renderCard({ name: popUpInputName.value, link: popUpInputLink.value });
}

