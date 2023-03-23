class Api {
  constructor({ url }) {
    this._url = url
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject('error')
    }
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, { credentials: 'include' }).then(this._checkResponse)
  }

  getData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  getUserAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse)
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse)
  }

  postUserCard(post) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
      credentials: 'include',
    }).then(this._checkResponse)
  }

  addLike(likeId) {
    return fetch(`${this._url}cards/${likeId}/likes`, {
      method: 'PUT',
      credentials: 'include',
    }).then(this._checkResponse)
  }

  removeLike(likeId) {
    return fetch(`${this._url}cards/${likeId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(this._checkResponse)
  }

  changeLikeCardStatus(_id, liked) {
    this._status = liked ? this.removeLike(_id) : this.addLike(_id)
    return this._status
  }

  removeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(this._checkResponse)
  }
}

const api = new Api({
  url: 'https://api.mesto.lapkes.nomoredomains.work/',
})
export default api
