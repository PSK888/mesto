const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const { formSelector, inputSelector, buttonSelector, inactiveButtonClass,
    inputErrorClass, errorClass } = enableValidation


// Функция, которая добавляет класс с ошибкой
// Передадим текст ошибки вторым параметром errorMessage
function showInputError(formSelector, inputSelector, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(inputErrorClass);
    // Заменим содержимое span с ошибкой на переданный параметр
    formError.textContent = errorMessage;
    // Показываем сообщение об ошибке
    formError.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError(formSelector, inputSelector) {
    // Находим элемент ошибки внутри самой функции
    const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(inputErrorClass);
    // Скрываем сообщение об ошибке
    formError.classList.remove(errorClass);
    // Очистим ошибку
    formError.textContent = '';
};

// Функция, которая проверяет валидность поля
function checkInputValidity (formSelector, inputSelector) {
    if (!inputSelector.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
        // Если проходит, скроем
        hideInputError(formSelector, inputSelector);
    }
};

function setEventListeners(formSelector) {
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
    // Найдём в текущей форме кнопку отправки
    const submitButtonSelector = formSelector.querySelector(buttonSelector);

    // Вызовем toggleButtonState , чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, submitButtonSelector);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputSelector) => {
        // каждому полю добавим обработчик события input
        inputSelector.addEventListener('input', () => {
            // Внутри колбэка вызовем checkInputValidity , передав ей форму и проверяемый элемент
            checkInputValidity (formSelector, inputSelector)

            // Вызовем toggleButtonState , чтобы не ждать ввода данных в поля
            toggleButtonState(inputList, submitButtonSelector);
        });
    });
};

function isValid() {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(formSelector));

    // Переберём полученную коллекцию
    formList.forEach((formSelector) => {
        formSelector.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
        // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
        setEventListeners(formSelector);
    });
};

isValid()

// Функция принимает массив полей
function hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputSelector) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true

        return !inputSelector.validity.valid;
    })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, submitButtonSelector) {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        submitButtonSelector.classList.add(inactiveButtonClass);
        submitButtonSelector.setAttribute('disabled', true);
    } else {
        // иначе сделай кнопку активной
        submitButtonSelector.classList.remove(inactiveButtonClass);
        submitButtonSelector.removeAttribute('disabled');
    }
};

function reset() {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((form) => {
        const inputList = Array.from(form.querySelectorAll(inputSelector))
        inputList.forEach((input) => {
            hideInputError(form, input);
        });
    });
}