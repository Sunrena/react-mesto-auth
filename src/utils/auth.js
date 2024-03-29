export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Accept: 'application/json' },
            body: JSON.stringify({ email, password }), 
    })
    .then((response) => {
        return checkResponse(response);
    })
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
           },
            body: JSON.stringify({ email, password }), 
    })
    .then((response) => {
        return checkResponse(response);
    })
    .then((data) => {
        if (data.token) {
            localStorage.setItem('jwt', data.token);
            return data;
        }
    })
};

export const getUserMe = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
           },    
    })
    .then((response) => {
        return checkResponse(response);
    })
    .then((data) => data);
}
