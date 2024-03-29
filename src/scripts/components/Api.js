export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    // Проверка ответа сервера
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    // Загрузка данных карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Загрузка данных пользователя с сервера
    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Устанавливаем данные пользователя
    setUser(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResponseData)
    };
    // Добавление новой карточки
    createNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Удаление карточки
    deleteIdCard(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Снятие лайка
    dislike(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Постановка  лайка
    putLike(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._getResponseData)
    };
    // Обновление аватара пользователя
    setUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData)
    };

};