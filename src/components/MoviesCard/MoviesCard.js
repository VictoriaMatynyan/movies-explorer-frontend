import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

const MoviesCard = ({ movieCard }) => {
    // создаём стейт для сохранения фильмов
    const [isSaved, setIsSaved] = useState(false);
    // функция сохранения фильмов
    function onSaveToggle() {
        setIsSaved(!isSaved);
    };

    function onRemove() {
        setIsSaved(false);
    };

    const location = useLocation();

    return (
        <article className="movies-card">
            <div className="movies-card__info">
                <h2 className="movies-card__title">{movieCard.nameRU}</h2>
                <p className="movies-card__duration">{movieCard.duration}</p>
            </div>
            <img className="movies-card__image" src={movieCard.image} alt={movieCard.nameRU} />
            {location.pathname === '/movies' ? (
                <button
                className={`${!isSaved ? "movies-card__save-button_inactive" : "movies-card__save-button_active"}`}
                type="button"
                onClick={onSaveToggle}
            >
                {!isSaved ? "Сохранить" : ""}
                </button>
            ) : location.pathname === '/saved-movies' && (
                <button
                className="movies-card__delete-button"
                type="button"
                onClick={onRemove}
            >
                </button>
            )}
        </article>
    );
}

export default MoviesCard;