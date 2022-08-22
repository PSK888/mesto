export default class FormValidator {
    constructor(form, config) { //config = scripts\Utils\validationConfig.js
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._buttonSelector = config.buttonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._errorList = this._form.querySelectorAll(".popup__input-error")
    }

    _showInputError(inputSelector, errorMessage) {  // Передадим текст ошибки вторым параметром errorMessage
        const formError = this._form.querySelector(`.${inputSelector.id}-error`); // Находим элемент ошибки внутри самой функции
        inputSelector.classList.add(this._inputErrorClass);
        formError.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
        formError.classList.add(this._errorClass); // Показываем сообщение об ошибке
    };

    // Функция, которая удаляет класс с ошибкой
    _hideInputError(inputSelector) {
        const formError = this._form.querySelector(`.${inputSelector.id}-error`); // Находим элемент ошибки внутри самой функции
        inputSelector.classList.remove(this._inputErrorClass);
        formError.classList.remove(this._errorClass); // Скрываем сообщение об ошибке
        formError.textContent = ''; // Очистим ошибку
    };

    // Функция, которая проверяет валидность поля
    _checkInputValidity(inputSelector) {
        if (!inputSelector.validity.valid) {
            this._showInputError(inputSelector, inputSelector.validationMessage);  // Если поле не проходит валидацию, покажем ошибку
        } else {
            this._hideInputError(inputSelector);  // Если проходит, скроем
        }
    };

    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); // Находим все поля внутри формы, сделаем из них массив методом Array.from

        this._toggleButtonState(); // Вызовем toggleButtonState , чтобы не ждать ввода данных в поля
        this._inputList.forEach((inputSelector) => {   // Обойдём все элементы полученной коллекции
            inputSelector.addEventListener('input', () => {  // каждому полю добавим обработчик события input
                this._checkInputValidity(inputSelector)  // Внутри колбэка вызовем checkInputValidity , передав ей форму и проверяемый элемент
                this._toggleButtonState();  // Вызовем toggleButtonState , чтобы не ждать ввода данных в поля
            });
        });
    };

    // Функция принимает массив полей
    _hasInvalidInput() {
        return this._inputList.some((inputSelector) => {   // проходим по этому массиву методом some
            return !inputSelector.validity.valid; // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true
        })
    };

    // Чистим ошибки span 
    resetFormsErrors() {
        this._errorList.forEach(error => {
            error.textContent = '';
            error.classList.remove(this._errorClass)
        })
        this._inputList.forEach(inputSelector => {
            inputSelector.classList.remove(this._inputErrorClass)
        })
    }

    // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
    _toggleButtonState() {
        this._button = this._form.querySelector(this._buttonSelector); // Найдём в текущей форме кнопку отправки
        if (this._hasInvalidInput(this._inputList)) {  // Если есть хотя бы один невалидный инпут - сделай кнопку неактивной
            this.disableSubmitButton()  
        } else {   // иначе сделай кнопку активной
            this.enableSubmitButton()
        }
    };

    disableSubmitButton(){
        this._button.classList.add(this._inactiveButtonClass);
        this._button.setAttribute('disabled', true);
    }

    enableSubmitButton(){
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.removeAttribute('disabled');
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault(); // У каждой формы отменим стандартное поведение
        });
        this._setEventListeners()
    };
};




