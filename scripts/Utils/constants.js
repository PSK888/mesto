const initialCards = [
    {
        name: "Архыз",
        link:
            "https://images.unsplash.com/photo-1639162850532-17af5c900790?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8JUQwJUIwJUQxJTgwJUQxJTg1JUQxJThCJUQwJUI3fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    {
        name: "Казань",
        link:
            "https://images.unsplash.com/photo-1631775866694-fe340840cc52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2F6YW58ZW58MHx8MHx8&w=1000&q=80",
    },
    {
        name: "Москва",
        link:
            "https://images.unsplash.com/photo-1580033813221-dbe4d224e1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8JUQwJUJDJUQwJUJFJUQxJTgxJUQwJUJBJUQwJUIyJUQwJUIwJTIwJUQxJTgxJUQwJUI4JUQxJTgyJUQwJUI4fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    {
        name: "Камчатка",
        link:
            "https://images.unsplash.com/photo-1645128187991-3030aa113532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JUQwJUJBJUQwJUIwJUQwJUJDJUQxJTg3JUQwJUIwJUQxJTgyJUQwJUJBJUQwJUIwfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    {
        name: "Санкт-Петербург",
        link:
            "https://images.unsplash.com/photo-1556610961-2fecc5927173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3QuJTIwcGV0ZXJzYnVyZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
    },
    {
        name: "Байкал",
        link:
            "https://images.unsplash.com/photo-1652167934538-c0b4ab5ced1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fCVEMCVCMSVEMCVCMCVEMCVCOSVEMCVCQSVEMCVCMCVEMCVCQnxlbnwwfHwwfHw%3D&w=1000&q=80",
    },
];

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const escKey = 'Escape'