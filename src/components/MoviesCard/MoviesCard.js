import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
// изображения приходят с сервера с относительным URL, поэтому добавляем к ним URL сервера
import { BEATFILM_BASE_URL } from "../../utils/urls";

const MoviesCard = ({ movieCard, savedMovies, isSaved, onMovieSave, onMovieDelete }) => {
    const [movieToBeDeleted, setMovieToBeDeleted] = useState('');
    const [isMovieInSaved, setIsMovieInSaved] = useState(isSaved ? true : false);
    const location = useLocation();

    useEffect(() => {
        const savedMovie = savedMovies && savedMovies.find((savedMovie) => savedMovie?.movieId === movieCard.id);
        setMovieToBeDeleted(savedMovie?._id);
    }, [savedMovies, movieCard.id]);

    // функция сохранения фильмов
    function onMovieCardSave() {
        if (isMovieInSaved) {
            onMovieDelete(movieCard);
            // onMovieDelete(movieToBeDeleted);
            setIsMovieInSaved(false);
        } else {
            onMovieSave(movieCard);
            const savedMoviesFromLocalStorage = JSON.parse(localStorage.getItem('savedMovies')) || [];
            localStorage.setItem('savedMovies', JSON.stringify([...savedMoviesFromLocalStorage, { movieId: movieCard.id }]));
            setIsMovieInSaved(true);
        }        
    };

    // функция удаления фильма
    function onMovieCardDelete() {
        onMovieDelete(movieCard);
        setIsMovieInSaved(false);
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

    return (
        <article className="movies-card">
            <div className="movies-card__info">
                <h2 className="movies-card__title">{movieCard.nameRU}</h2>
                <p className="movies-card__duration">{getTimeFromMins(movieCard.duration)}</p>
            </div>
            <a className="movies-card__trailer-link" href={movieCard.trailerLink} target="_blank" rel="noreferrer">
                <img
                className="movies-card__image" src={location.pathname === '/saved-movies' ? movieCard.image : `${BEATFILM_BASE_URL}${movieCard.image.url}`}
                alt={`Постер к фильму ${movieCard.nameRU}, он же обложка карточки с ним `} />
            </a>
            {location.pathname === '/movies' ? (
                <button
                className={`movies-card__save-button ${!isMovieInSaved ? "movies-card__save-button_inactive" : "movies-card__save-button_active"}`}
                type="button"
                onClick={isMovieInSaved ? onMovieCardDelete : onMovieCardSave}
            >
                {!isMovieInSaved ? "Сохранить" : ""}
                </button>
            ) : location.pathname === '/saved-movies' && (
                <button
                className="movies-card__delete-button"
                type="button"
                onClick={onMovieCardDelete}
            >
                </button>
            )}
        </article>
    );
}

export default MoviesCard;