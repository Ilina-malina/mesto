export class UserInfo {
    constructor(userSelector) {
        this._name = document.querySelector(userSelector.name);
        this._description = document.querySelector(userSelector.descriptionSelector);
    }

    getUserInfo() {
        const userData = {
            name: this._name.textContent,
            description: this._description.textContent
        }
        return userData;
    }

    setUserInfo(name, description) {
        this._name.textContent = name;
        this._description.textContent = description;
    }
}