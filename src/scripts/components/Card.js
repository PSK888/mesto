export default class Card {
    // функция handleCardClick открывает попап с картинкой при клике на карточку.
    constructor(data, templateSelector, { handleCardClick, handleDeleteButton, dislike, putLike }) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButton = handleDeleteButton;
        this._dislike = dislike;
        this._putLike = putLike;
    }
    //Возвращаем разметку template элемента. 
    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector)
            .content.querySelector('.element').cloneNode(true);
        return cardElement; // вернём DOM-элемент карточки
    }
    // Генерируем карточку
    generateCard() {
        this._element = this._getTemplate();  // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
        this._cardImage = this._element.querySelector('.element__image');
        this._buttonLike = this._element.querySelector('.element__like');
        this._cardImage.src = this._link; // Добавим данные
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__text').textContent = this._name;
        this._basketButton = this._element.querySelector('.element__del');
        this._counter = this._element.querySelector('.element__counter');
        this._counter.textContent = this._likes.length;
        this._userLiked = this._likes.some(like => like._id === this._userId);
        this._setEventListeners();
        this._deleteBasketButton();
        this._isCardLiked();
        return this._element;  // Вернём элемент наружу
    }
    // Удаляет корзину если не мой ID
    _deleteBasketButton() {
        if (this._userId !== this._ownerId) {
            this._basketButton.remove();
            this._basketButton = null;
        }
    }
    //!!! Закрасит лайк если лайк мой 
    _isCardLiked() {
        if (this._userLiked) {
            this._buttonLike.classList.add('element__like_active');
        }
    }
    // Получаем id карточки
    getCardId() {
        return this._id;
    }
    // Лайк карточки
    likeCard() {
        this._buttonLike.classList.add('element__like_active');
    }
    // Удаление лайка
    disLikeCard() {
        this._buttonLike.classList.remove('element__like_active');
    }
    // Удаление карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    };
    // Устанавливаем счетчик лайков
    setCounter(data) {
        this._buttonLike.classList.toggle('element__like_active');
        this._counter.textContent = data.likes.length;
    }
    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });

        this._element.querySelector('.element__del').addEventListener('click', () => {
            this._handleDeleteButton(this._data)
        });

        this._buttonLike.addEventListener('click', (evt) => {
            if (this._element.querySelector('.element__like').classList.contains('element__like_active')) {
                this._dislike(evt);
            } else {
                this._putLike(evt);
            }
        });
    }

}


