export class UserInfo {
    constructor(userSelector) {
        this._name = document.querySelector(userSelector.name);
        this._description = document.querySelector(userSelector.descriptionSelector);
        this._avatar = document.querySelector(userSelector.avatar);
    }

    setUser = (user) => {
        this._user = user;
        this._setUserInfo(this._user.name, this._user.about);
        this._setUserAvatar(this._user.avatar);
    }

    getUserInfo() {
        const userData = {
            name: this._user.name,
            description: this._user.about,
            id: this._user._id
        }
        return userData;
    }

    _setUserInfo(name, description) {
        this._name.textContent = name;
        this._description.textContent = description;
    }

    _setUserAvatar(avatar) {
        this._avatar.style.backgroundImage = `url(${avatar})`;
    }
}

