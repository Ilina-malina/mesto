export class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
          headers: this._headers
        })
          .then((res) => {
            return this._checkStatus(res);
          })
    }

    addCard = (card) => {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(card)
        })
        .then((res) => {
          return this._checkStatus(res);
        })
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
          return this._checkStatus(res);
        })
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
          })
          .then((res) => {
            return this._checkStatus(res);
          })
    }

    editUserInfo(name, about) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({name, about})
          })
          .then((res) => {
            return this._checkStatus(res);
          })
    }

    editUserAvatar(avatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar})
          })
          .then((res) => {
            return this._checkStatus(res);
          })
    }

    putLike(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
            method: 'PUT',
            headers: this._headers
          })
          .then((res) => {
            return this._checkStatus(res);
          })
    }

    deleteLike(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
            method: 'DELETE',
            headers: this._headers
          })
          .then((res) => {
            return this._checkStatus(res);
          })
    }

    _checkStatus(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
}
