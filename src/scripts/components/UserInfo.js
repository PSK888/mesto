export default class UserInfo {
    //Принимает в конструктор объект с селекторами двух элементов:
    // элемента имени пользователя и элемента информации о себе.
    constructor({ profileName, profileJob }) {
        this._profName = profileName;
        this._profJob = profileJob;
    }

    // Возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._profName.textContent,
            job: this._profJob.textContent
        };
    }

    // Принимает и устанавливает данные пользователя
    setUserInfo({ name, job }) {
        this._profName.textContent = name;
        this._profJob.textContent = job;
    }
}
