export default class Card {  
    constructor(data, templateSelector, openPopupCard) { // в конструкторе будут динамические данные, для каждого экземпляра свои
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopupCard = openPopupCard
    }

    _getTemplate() { //Следующая задача — научить класс Card возвращать разметку. 
        const cardElement = document.querySelector(this._templateSelector)
            .content.querySelector('.element').cloneNode(true);
        return cardElement; // вернём DOM-элемент карточки
    }

    generateCard() {
        this._element = this._getTemplate();  // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
        this._cardImage = this._element.querySelector('.element__image')
        this._buttonLike = this._element.querySelector('.element__like')
        this._setEventListeners(); // добавим обработчики
        this._cardImage.src = this._link; // Добавим данные
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__text').textContent = this._name;
        return this._element;  // Вернём элемент наружу
    }

    _likeCard() {
        this._buttonLike.classList.toggle('element__like_active');
    }

    _deleteCard() {
        this._element.remove()
        this._element = null;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._openPopupCard(this._name, this._link);
        });
        this._element.querySelector('.element__del').addEventListener('click', () => {
            this._deleteCard()
        });
        this._buttonLike.addEventListener('click', () => {
            this._likeCard()
        });
    }

}


