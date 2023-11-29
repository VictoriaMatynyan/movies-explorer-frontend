import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
// изображения приходят с сервера с относительным URL, поэтому добавляем к ним URL сервера
import { BEATFILM_BASE_URL } from "../../utils/urls";

const MoviesCard = ({ movieCard, isSaved, onMovieSave, onMovieDelete }) => {
    // функция сохранения фильмов
    function onMovieCardSave() {
        onMovieSave(movieCard);
    };

    // функция удаления фильма
    function onMovieCardDelete() {
        onMovieDelete(movieCard);
    }

    // переводим минуты в часы и минуты
    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        if (hours < 1) {
            return minutes + 'м';
        } else {
            return hours + 'ч ' + minutes + 'м';
        }
    };

    const location = useLocation();

    return (
        <article className="movies-card">
            <div className="movies-card__info">
                <h2 className="movies-card__title">{movieCard.nameRU}</h2>
                <p className="movies-card__duration">{getTimeFromMins(movieCard.duration)}</p>
            </div>
            <a className="movies-card__trailer-link" href={movieCard.trailerLink} target="_blank" rel="noreferrer">
                <img
                className="movies-card__image" src={isSaved ? movieCard.image.url : `${BEATFILM_BASE_URL}${movieCard.image.url}`}
                alt={`Постер к фильму ${movieCard.nameRU}, он же обложка карточки с ним `} />
            </a>
            {location.pathname === '/movies' ? (
                <button
                className={`movies-card__save-button ${!isSaved ? "movies-card__save-button_inactive" : "movies-card__save-button_active"}`}
                type="button"
                onClick={isSaved ? onMovieCardDelete : onMovieCardSave}
            >
                {!isSaved ? "Сохранить" : ""}
                </button>
            ) : location.pathname === '/saved-movies' && (
                <button
                className="movies-card__delete-button"
                type="button"
                onMovieDelete={onMovieCardDelete}
            >
                </button>
            )}
        </article>
    );
}

export default MoviesCard;