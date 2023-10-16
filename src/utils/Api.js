class Api {
    constructor({ headers, baseURL }) {
        this._headers = headers;
        this._baseURL = baseURL;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCardsApi() {
        return fetch(`${this._baseURL}cards`, {
            headers: this._headers,}).then(this._checkResponse);
    }

    getUserInfoApi() {
        return fetch(`${this._baseURL}users/me`, {
                    headers: this._headers,}).then(this._checkResponse);
    }

    setUserInfo(item) {
        return fetch(`${this._baseURL}users/me`, {
                    method: 'PATCH',
                    headers: this._headers,
                    body: JSON.stringify({
                        name: item.name,
                        about: item.about,
                    }),
                }).then(this._checkResponse);
    }

    setAvatar(item) {
        return fetch(`${this._baseURL}users/me/avatar`, {
                    method: 'PATCH',
                    headers: this._headers,
                    body: JSON.stringify({
                        avatar: item.avatar,
                    }),
                }).then(this._checkResponse);
    }

    createCard({ name, link }) {
        return fetch(`${this._baseURL}cards`, {
                    method: 'POST',
                    headers: this._headers,
                    body: JSON.stringify({
                        name: name,
                        link: link,
                    }),
                }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseURL}cards/${cardId}`, {
                            method: 'DELETE',
                            headers: this._headers,
                        }).then(this._checkResponse);
    }

    switchLikeCard(cardId, isLiked) {
        if (!isLiked) {
            return fetch(`${this._baseURL}cards/${cardId}/likes`, {
                        method: 'PUT',
                        headers: this._headers,
                    }).then(this._checkResponse);
        } else {
            return fetch(`${this._baseURL}cards/${cardId}/likes`, {
                        method: 'DELETE',
                        headers: this._headers,
                    }).then(this._checkResponse);
        }
    }
}

const api = new Api({
    headers: {
        authorization: "6030fb95-8b1e-43bf-a548-3fe76a35651e",
        "Content-Type": "application/json",
      },
      baseURL: "https://mesto.nomoreparties.co/v1/cohort-68/",
});

export {api}