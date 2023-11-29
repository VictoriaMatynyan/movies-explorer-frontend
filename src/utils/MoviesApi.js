import { BEATFILM_MOVIES_URL } from './urls';

export function validateResponse(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка получения ответа от сервера: ${res.status}`)
}

// получаем данные сервиса с фильмами
export function getMovies() {
    return fetch (`${BEATFILM_MOVIES_URL}/`, {
        method: 'GET',
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(validateResponse);
};
