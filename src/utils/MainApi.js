import { BASE_URL } from './urls';

export function validateResponse(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка получения ответа от сервера: ${res.status}`)
};

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(validateResponse);
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include', // отправляем куки вместе с запросом
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(validateResponse);
};

export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(validateResponse);
};

// запрос на данные текущего пользователя
export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(validateResponse);
};

// запрос на изменение данных пользователя
export const editUserInfo = (formValues) => { //formValues name, email
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name: formValues.name,
            email: formValues.email
        }) //formValues.name, formValues.email name, email
    })
    .then(validateResponse);
};

// запрос карточек с фильмами
export const getMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(validateResponse);
};

// запрос на сохранение карточки
export const addMovie = (
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nameRU,
            nameEN,
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            thumbnail,
            movieId,
        })
    })
    .then(validateResponse);
};

// запрос на удаление карточки из списка сохранённых
export const deleteMovie = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(validateResponse);
}