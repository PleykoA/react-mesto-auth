export class Api {

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfoApi() {
    return fetch(`${this._baseUrl}/users/me`,
      { headers: this._headers })
      .then(res =>
        this._response(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      { headers: this._headers })
      .then(res =>
        this._response(res));
  }

  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: card.name,
        link: card.link
      }),
      headers: this._headers
    })
      .then(res =>
        this._response(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res =>
        this._response(res));
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res =>
        this._response(res));
  }

  removeLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res =>
        this._response(res));
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res =>
        this._response(res));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res =>
        this._response(res));
  }

}

const api = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
    headers: {
      authorization: '4842089d-f2bb-472a-aa84-030e4841425a',
      'Content-Type': 'application/json'
    }
  }
);

export default api;