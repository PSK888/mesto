const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const popUpEdit = document.querySelector(".popup_edit");
const popUpAdd = document.querySelector(".popup_add");
const popUpCard = document.querySelector(".popup_card");
const popUps = [popUpEdit, popUpAdd, popUpCard]

const popUpEditClose = document.querySelector(".popup__close_edit");
const popUpAddClose = document.querySelector(".popup__close_add");
const popUpCardClose = document.querySelector(".popup__close_card");

const contEdit = document.querySelector(".popup__container_edit")
const contAdd = document.querySelector(".popup__container_add")
const contCard = document.querySelector(".popup__cardcontainer")
const popUpContainer = [contEdit, contAdd, contCard];

const templateCard = document.querySelector(".template_card").content;
const popUpAddButton = document.querySelector(".popup__add-button");
const sectionCards = document.querySelector(".elements");
const nameInput = document.querySelector(".popup__name");
const profileName = document.querySelector(".profile__name");
const jobInput = document.querySelector(".popup__job");
const profileJob = document.querySelector(".profile__job");
const submitEditForm = document.querySelector(".popup__edit-button");
const popUpInputName = document.querySelector(".popup__input_name");
const popUpInputLink = document.querySelector(".popup__input_link");
const popUpForm = document.querySelector(".popup__form");
const popUpImage = document.querySelector(".popup__image");
const popUpText = document.querySelector(".popup__text");

const openPopup = (popUp) => {
    popUp.classList.add("popup_opened")

}

const closePopUp = (popUp) => {
    popUp.classList.remove("popup_opened");
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
    popUpInputName.value = "";
    popUpInputLink.value = "";

});

// Закрытие модальных окон
popUpEditClose.addEventListener("click", () => closePopUp(popUpEdit));
popUpAddClose.addEventListener("click", () => closePopUp(popUpAdd));
popUpCardClose.addEventListener("click", () => closePopUp(popUpCard));

//закрытие попапа по клику мимо тела попапа:
popUps.forEach((index) => {
    index.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) {
            closePopUp(index)
        }
    });
})


// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleSubmitForm(evt) {
    evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popUpForm.addEventListener("submit", handleSubmitForm);
popUpForm.addEventListener("submit", () => closePopUp(popUpEdit));
submitEditForm.addEventListener("click", handleSubmitForm);
submitEditForm.addEventListener("click", () => closePopUp(popUpEdit));

// Массив карточек (initialCards) перенесен в отдельный cards.js

const renderCard = (card) => { sectionCards.prepend(addCard(card)); }

initialCards.forEach((card) => { renderCard(card) });


// Функция добавить карточку
function addCard({ name, link }) {
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
    likeButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like_active");
    })


    //Удаление карточек
    function deleteCard(card) {
        card.remove()
    }

    return card;

}

renderCard

// Добавление карточки через popup
popUpAddButton.addEventListener("click", (evt) => closePopUp(popUpAdd));
popUpAddButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    renderCard({ name: popUpInputName.value, link: popUpInputLink.value });
    popUpInputName.value = "";
    popUpInputLink.value = "";

});





