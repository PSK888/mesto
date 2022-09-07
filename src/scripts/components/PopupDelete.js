import Popup from './Popup.js';

export default class PopupDelete extends Popup {
    constructor({popupSelector}) {
        super(popupSelector)
        this._popup = document.querySelector(popupSelector);
        this._submitButton = this._popup.querySelector('.popup__button');
    }
    close() {
        super.close();
    }
    setWaitSubmit(action) {
        this._submitClick = action;
    }
    setEventListeners() {
        this._submitButton.addEventListener('click', (evt) => this._submitClick(evt));
        super.setEventListeners();
    }
}

