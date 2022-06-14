const profileEditBotton = document.querySelector('.profile__edit-button');

const popUp = document.querySelector ('.popup');

const popupClosePopUp = document.querySelector('.popup__close');

profileEditBotton.addEventListener('click', openPopup) 
popupClosePopUp.addEventListener('click', closePopUp)

function openPopup (event) {
    event.preventDefault()
popUp.classList.add('popup_opened')
}

function closePopUp (event) {
    popUp.classList.remove('popup_opened')
}

 popUp.addEventListener('click', (event) => {
    if(!event.defaultPrevented){closePopUp()} })

 document.querySelector('.popup__body').addEventListener('click', (event) => {event.preventDefault() })


 // Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
     
    // Находим поля формы в DOM
      // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent

     let nameInput = document.querySelector('.popup__name');
     let profileName = document.querySelector('.profile__name')
     profileName.textContent = nameInput.value;
     let jobInput = document.querySelector('.popup__job');
     let profileJob = document.querySelector('.profile__job')
     profileJob.textContent = jobInput.value;
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
    formElement.addEventListener('submit', formSubmitHandler);
    formElement.addEventListener('submit', closePopUp)
    let submit = document.querySelector('.popup__save')
    submit.addEventListener('click', formSubmitHandler)
    submit.addEventListener('click', closePopUp)
