const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const { formSelector, inputSelector, buttonSelector, inactiveButtonClass,
    inputErrorClass, errorClass } = options;


// Функция, которая добавляет класс с ошибкой
function showInputError(formSelector, inputSelector, errorMessage) {  // Передадим текст ошибки вторым параметром errorMessage
    const formError = formSelector.querySelector(`.${inputSelector.id}-error`); // Находим элемент ошибки внутри самой функции
    inputSelector.classList.add(inputErrorClass);
    formError.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
    formError.classList.add(errorClass); // Показываем сообщение об ошибке
};

// Функция, которая удаляет класс с ошибкой
function hideInputError(formSelector, inputSelector) {
    const formError = formSelector.querySelector(`.${inputSelector.id}-error`); // Находим элемент ошибки внутри самой функции
    inputSelector.classList.remove(inputErrorClass);
    formError.classList.remove(errorClass); // Скрываем сообщение об ошибке
    formError.textContent = ''; // Очистим ошибку
};

// Функция, которая проверяет валидность поля
function checkInputValidity(formSelector, inputSelector) {
    if (!inputSelector.validity.valid) {
        showInputError(formSelector, inputSelector, inputSelector.validationMessage);  // Если поле не проходит валидацию, покажем ошибку
    } else {
        hideInputError(formSelector, inputSelector);  // Если проходит, скроем
    }
};

function setEventListeners(formSelector) {
    const inputList = Array.from(formSelector.querySelectorAll(inputSelector)); // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const submitButtonSelector = formSelector.querySelector(buttonSelector); // Найдём в текущей форме кнопку отправки
    toggleButtonState(inputList, submitButtonSelector); // Вызовем toggleButtonState , чтобы не ждать ввода данных в поля
    inputList.forEach((inputSelector) => {   // Обойдём все элементы полученной коллекции
        inputSelector.addEventListener('input', () => {  // каждому полю добавим обработчик события input
            checkInputValidity(formSelector, inputSelector)  // Внутри колбэка вызовем checkInputValidity , передав ей форму и проверяемый элемент
            toggleButtonState(inputList, submitButtonSelector);  // Вызовем toggleButtonState , чтобы не ждать ввода данных в поля
        });
    });
};

// Функция принимает массив полей
function hasInvalidInput(inputList) {
    return inputList.some((inputSelector) => {   // проходим по этому массиву методом some
        return !inputSelector.validity.valid; // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true
    })
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, submitButtonSelector) {
    if (hasInvalidInput(inputList)) {  // Если есть хотя бы один невалидный инпут - сделай кнопку неактивной
        submitButtonSelector.classList.add(inactiveButtonClass);
        submitButtonSelector.setAttribute('disabled', true);
    } else {   // иначе сделай кнопку активной
        submitButtonSelector.classList.remove(inactiveButtonClass);
        submitButtonSelector.removeAttribute('disabled');
    }
};

function resetFormsErrors() {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((form) => {
        const inputList = Array.from(form.querySelectorAll(inputSelector))
        inputList.forEach((input) => {
            hideInputError(form, input);
        });
    });
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll(formSelector)); // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    formList.forEach((formSelector) => {  // Переберём полученную коллекцию
        formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault(); // У каждой формы отменим стандартное поведение
        });
        setEventListeners(formSelector); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    });
};

enableValidation(options);

