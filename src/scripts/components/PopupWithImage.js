import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup_image = this._popup.querySelector('.popup__image');
        this._popup_text = this._popup.querySelector('.popup__text');
    }
    // Перезаписывает родительский метод open, т.к. нужно вставлять в попап картинку с src изображения и подписью.
    open(name, link) {
        this._popup_image.alt = name;
        this._popup_image.src = link;
        this._popup_text.textContent = name;
        super.open();
    }
}