class Auth {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    checkResp(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then((res) =>
            this.checkResp(res));
    }

    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then((res) =>
            this.checkResp(res));
    }

    getToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((res) =>
            this.checkResp(res));
    }
}

const auth = new Auth({
    url: 'https://auth.nomoreparties.co',
});

export default auth;