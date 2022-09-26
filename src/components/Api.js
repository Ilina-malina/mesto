export class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
          headers: this._headers
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
    }

    addCard = (card) => {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(card)
        })
        .then(card => {
            if (card.ok) {
                return card.json();
            }
            return Promise.reject(`Ошибка: ${card.status}`);
        })
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(card => {
            if (card.ok) {
                return card.json();
            }
            return Promise.reject(`Ошибка: ${card.status}`);
        }) 
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    editUserInfo(name, about) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({name, about})
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    editUserAvatar(avatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar})
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    putLike(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
            method: 'PUT',
            headers: this._headers
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteLike(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
            method: 'DELETE',
            headers: this._headers
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}
