console.log("test")
const profileEditButton = document.querySelector(".profile__edit-button")
const profileAddButton = document.querySelector(".profile__add-button")
const popUp = document.querySelector(".popup")
const popUpEdit = document.querySelector(".popup_edit")
const popUpAdd = document.querySelector(".popup_add")
const popUpCard = document.querySelector(".popup_card")
const ClosePopUpEdit = document.querySelector(".popup_edit_close")
const ClosePopUpAdd = document.querySelector(".popup_add_close")
const ClosePopUpCard = document.querySelector(".popup_card_close")
const templateCard = document.querySelector(".template_card").content
const AddButton = document.querySelector(".popup__add-button")
const SectionCards = document.querySelector(".elements")

const openPopup = (popUp) => {
  popUp.classList.add("popup_opened")
}

const closePopUp = (popUp) => {
  popUp.classList.remove("popup_opened")
}

profileEditButton.addEventListener("click", () => openPopup(popUpEdit))
profileAddButton.addEventListener("click", () => openPopup(popUpAdd))
ClosePopUpEdit.addEventListener("click", () => closePopUp(popUpEdit))
ClosePopUpAdd.addEventListener("click", () => closePopUp(popUpAdd))

//закрытие попап по клику мимо тела попапа:

popUpEdit.addEventListener("click", (event) => {
  if (!event.defaultPrevented) {
    closePopUp(popUpEdit)
  }
})

popUpAdd.addEventListener("click", (event) => {
  if (!event.defaultPrevented) {
    closePopUp(popUpAdd)
  }
})

popUpCard.addEventListener("click", (event) => {
  if (!event.defaultPrevented) {
    closePopUp(popUpCard)
  }
})

document
  .querySelector(".popup__container_edit")
  .addEventListener("click", (event) => {
    event.preventDefault()
  })
document
  .querySelector(".popup__container_add")
  .addEventListener("click", (event) => {
    event.preventDefault()
  })
document
  .querySelector(".popup__cardcontainer")
  .addEventListener("click", (event) => {
    event.preventDefault()
  })

// Находим форму в DOM
const popUpForm = document.querySelector(".popup__form")
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
  let nameInput = document.querySelector(".popup__name")
  let profileName = document.querySelector(".profile__name")
  profileName.textContent = nameInput.value
  let jobInput = document.querySelector(".popup__job")
  let profileJob = document.querySelector(".profile__job")
  profileJob.textContent = jobInput.value
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popUpForm.addEventListener("submit", formSubmitHandler)
popUpForm.addEventListener("submit", () => closePopUp(popUpEdit))
const submit = document.querySelector(".popup__edit-button")
submit.addEventListener("click", formSubmitHandler)
submit.addEventListener("click", () => closePopUp(popUpEdit))

// Массив карточек
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
]

const items = initialCards.map(function (item) {
  return { name: item.name, link: item.link }
})

// Функция добавления всех карточек
function renderCards() {
  items.forEach(AddCard)

  // Функция добавить карточку
  function AddCard({ name, link }) {
    const Card = templateCard.querySelector(".element").cloneNode(true)
    Card.querySelector(".element__text").textContent = name
    Card.querySelector(".element__image").src = link
    Card.querySelector(".element__image").alt = name
    Card.querySelector(".element__del").addEventListener("click", DeleteCard)
    //Лайк карточек
    Card.querySelector(".element__like").addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like_active")
      }
    )

    SectionCards.prepend(Card)

    // Открытие попапа с картинкой
    function openPopupCard(name, link) {
      console.log("name, link =>", name, link)
      popUpCard.classList.add("popup_opened")
      popUpCard.querySelector(".popup__image").src = Card.querySelector(".element__image").src
      popUpCard.querySelector(".popup__image").alt = Card.querySelector(".element__text").textContent
      popUpCard.querySelector(".popup__text").textContent = Card.querySelector(".element__text").textContent
    }
    Card.querySelector(".element__image").addEventListener(
      "click",
      openPopupCard
    )
    ClosePopUpCard.addEventListener("click", () => closePopUp(popUpCard))
  }

  // Добавление карточки через popup
  AddButton.addEventListener("click", (evt) => closePopUp(popUpAdd))
  AddButton.addEventListener("click", function (evt) {
    evt.preventDefault()
    const InputCardName = document.querySelector(".js_popup_img_name")
    const InputCardLink = document.querySelector(".js_popup__img_link")
    AddCard({ name: InputCardName.value, link: InputCardLink.value })
    InputCardName.value = ""
    InputCardLink.value = ""
  })

  //Функция удалить карточку &&&&&
  function DeleteCard(evt) {
    evt.target.closest(".element").remove()
  }
}
renderCards()
