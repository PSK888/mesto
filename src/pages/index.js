import "../pages/index.css";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Api from "../scripts/components/Api.js";
import PopupDelete from "../scripts/components/PopupDelete.js";
import {
    config, popUpEditForm, popUpAddForm, popUpAvatarForm, profileEditButton, nameInput,
    jobInput, profileName, profileJob, profileAvatar, profileAvatarButton, profileAddButton,
    imagePopupSelector, templateSelector, containerSelector, popupEditSelector, popupAddSelector,
    popUpInputName, popUpInputLink
} from "../scripts/utils/constants.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
    token: '8d5907dd-c90e-487c-abb3-37b80de35d33'});

// Валидация форм
const validatorEditProfile = new FormValidator(popUpEditForm, config);
validatorEditProfile.enableValidation();

const validatorAvatarProfile = new FormValidator(popUpAvatarForm, config);
validatorAvatarProfile.enableValidation();

const validatorAddCard = new FormValidator(popUpAddForm, config);
validatorAddCard.enableValidation();

////////////////////////////////////////////////////////////////////

const popupWithImage = new PopupWithImage(imagePopupSelector);

const deletePopup = new PopupDelete({ popupSelector: '.popup_delete' })

const popupWithEditForm = new PopupWithForm({
    popupSelector: popupEditSelector,
    handleFormSubmit: () => {
        user.setUserInfo({
            name: nameInput.value,
            about: jobInput.value
        });
        api.setUser({
            name: nameInput.value,
            about: jobInput.value
        })
            .then(() => {
                popupWithEditForm.close();
            })
            .catch(() => {
                console.log(`Ошибка! Не удалось изменить данные пользователя.`);
            })
            .finally(() => {
                popupWithEditForm.saving(false);
            })
    }
})

const popupWithAddForm = new PopupWithForm({
    popupSelector: popupAddSelector,
    handleFormSubmit: () => {
        api.createNewCard({
            name: popUpInputName.value,
            link: popUpInputLink.value
        })
            .then((res) => {
                const card = createCard(res);
                cardsList.prependItem(card)
                popupWithAddForm.close();
            })
            .catch(() => {
                console.log(`Ошибка! Не удалось добавить карточку.`);
            })
            .finally(() => {
                popupWithAddForm.saving(false);
            })
    }
});

const popupWithAvatarForm = new PopupWithForm({
    popupSelector: '.popup_avatar',
    handleFormSubmit: (data) => {
        user.setAvatar(data),
            api.setUserAvatar(data)
                .then(() => {
                    popupWithAvatarForm.close();
                })
                .catch(() => {
                    console.log(`Ошибка! Не удалось сменить аватар.`);
                })
                .finally(() => {
                    popupWithAvatarForm.saving(false);
                })
    }
});

profileEditButton.addEventListener("click", () => {
    const userData = user.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
    validatorEditProfile.resetFormsErrors();
    popupWithEditForm.open();
});

profileAddButton.addEventListener("click", () => {
    popupWithAddForm.open();
    popUpAddForm.reset();
    validatorAddCard.resetFormsErrors();
    validatorAddCard.disableSubmitButton();
});

profileAvatarButton.addEventListener("click", () => {
    validatorAvatarProfile.resetFormsErrors();
    validatorAvatarProfile.disableSubmitButton();
    popupWithAvatarForm.open();
});

popupWithEditForm.setEventListeners();
popupWithAvatarForm.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithImage.setEventListeners();
deletePopup.setEventListeners();

function createCard(data) {
    const card = new Card({
        data,
        name: data.name,
        link: data.link,
        likes: data.likes,
        //userId: 'd78eadac368e3a75ec7c1a26',
        userId: user.getUserId(),
        ownerId: data.owner._id,
        _id: data._id,
    }, templateSelector, {

        handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
        },

        handleDeleteButton: (data) => {
            deletePopup.setWaitSubmit((evt) => {
                evt.preventDefault();
                api.deleteIdCard(data._id)
                    .then(() => {
                        card.deleteCard();
                        deletePopup.close();
                    })
                    .catch(() => {
                        console.log(`Ошибка! Не удалось удалить карточку.`);
                    })
            })
            deletePopup.open();
        },

        putLike: () => {
            api.putLike(data)
                .then(data => {
                    // card.likes = data.likes;
                    card.likeCard();
                    card.setCounter(data);
                    console.log('putLike')
                    if (data.likes.length < 1) {card.setCounter().remove}
                })
                .catch(() => {
                    console.log('Ошибка! Не удалось лайкнуть :(');
                })
        },
        dislike: () => {
            api.dislike(data)
                .then(data => {
                    card.likeCard();
                    card.setCounter(data);
                    console.log('DisLike')
                })
                .catch(() => {
                    console.log('Ошибка! Не удалось снять лайк ;)');
                })
        }
    })
    return card.generateCard();
}

//Cоздаем экземпляр класса - информация о пользователе
const user = new UserInfo({ profileName, profileJob, profileAvatar });

// Класс Section, отвечает за отрисовку элементов на странице.
const cardsList = new Section({
    renderer: (data) => {
        const card = createCard(data);
        cardsList.prependItem(card);
    },
}, containerSelector);

// Загрузка карточек и данных пользователя с сервера
Promise.all([api.getUser(), api.getInitialCards()])
    .then(([userData, cards]) => {
        //userId = userData._id;
        //card.userId = userData._id;
        user.setUserId(userData._id);
        user.setUserInfo(userData);
        cardsList.renderItems(cards.reverse());
    })
    .catch(() => console.log('Ошибка! Не удалось загрузить данные :('));




