export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.header = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  async getInitialCards() {
    const res = await fetch(this.baseUrl + "/cards", {
      headers: this.header,
    });
    return this._checkResponse(res);
  }

  async getUserInfo() {
    const res = await fetch(this.baseUrl + "/users/me", {
      headers: this.header,
    });
    return this._checkResponse(res);
  }

  async updateProfileInfo(name, about) {
    const res = await fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.header,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    return this._checkResponse(res);
  }

  async updateAvatar(newAvatarUrl) {
    const res = await fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.header,
      body: JSON.stringify({ avatar: newAvatarUrl }),
    });
    return this._checkResponse(res);
  }

  async createNewCard({ name, link }) {
    const res = await fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.header,
      body: JSON.stringify({
        name,
        link,
      }),
    });
    return this._checkResponse(res);
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.header,
    });
    return this._checkResponse(res);
  }

  async likeCard(cardId) {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.header,
    });
    return this._checkResponse(res);
  }

  async dislikeCard(cardId) {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.header,
    });
    return this._checkResponse(res);
  }
}
