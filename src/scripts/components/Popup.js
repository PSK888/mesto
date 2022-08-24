import { escKey } from "../utils/constants.js";

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    //закрытие попапа по клику на клавишу ESC:
    _handleEscClose(event) {
        if (event.key === escKey) {
            this.close();
        };
    }
    // Открытие попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    // Закрытие попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    setEventListeners() {
        //закрытие попапа по клику мимо тела попапа или по клику на кнопку Х:
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget
                || evt.target.classList.contains('popup__close')) {
                this.close(this._popup);
            }
        })
    }
}

