export default class UserInfo {
    //Принимает в конструктор объект с селекторами элементов.
    constructor({ profileName, profileJob, profileAvatar }) {
        this._profName = profileName;
        this._profJob = profileJob;
        this._avatar = profileAvatar;
    }
    // Возвращает объект с данными пользователя.
    getUserInfo() {
        return {
            name: this._profName.textContent,
            about: this._profJob.textContent,
            avatar: this._avatar.src
        };
    }
    // Получаем id 
    getUserId() {
        return this._userId;
    }
    // Устанавливаем id
    setUserId(userId) {
        this._userId = userId;
    }
    // Принимает и устанавливает данные пользователя.
    setUserInfo(data) {
        if (data.name) this._profName.textContent = data.name;
        if (data.about) this._profJob.textContent = data.about;
        this.setAvatar(data);
    }
    // Устанавливает аватар.
    setAvatar(data) {
        if (data.avatar) this._avatar.src = data.avatar;
        if (data.name) this._avatar.alt = data.name;
    }
}
