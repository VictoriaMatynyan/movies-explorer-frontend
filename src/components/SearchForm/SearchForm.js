import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = ({ onSearchSubmit, onCheckboxFilter, isLoading, isChecked }) => {
    const location = useLocation();
    // стейт для хранения значения поискового запроса
    const [movieQuery, setMovieQuery] = useState('');
    // const [isMovieSaved, setIsMovieSaved] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (location.pathname === '/movies') {
            const movieSearchQuery = localStorage.getItem('movieSearchQuery');
            if (movieSearchQuery) {
                setMovieQuery(movieSearchQuery);
            }
            // setMovieQuery(localStorage.getItem('movieSearchQuery'));
        }
    }, [location.pathname]);

    // функция поиска фильмов Movies отличается от SavedMovies
    function handleSubmit(e) {
        e.preventDefault();
        if (location.pathname === '/movies') {
            if (!movieQuery) { 
                setErrorMessage('Нужно ввести ключевое слово');
            } else {
                onSearchSubmit(movieQuery);
                setErrorMessage('');
                localStorage.setItem('movieSearchQuery', movieQuery);
            }
        } else {
            onSearchSubmit(movieQuery);
            localStorage.setItem('movieSearchQuery', movieQuery);
        }
    };

    return (
        <section className="search-form">
            <div className="search-form__container">
                <form
                className="search-form__form"
                name="search-form"
                onSubmit={handleSubmit}>
                    <label className="search-form__label" htmlFor="search-form">
                        <input
                            className="search-form__input"
                            id="search-form"
                            type="text"
                            placeholder="Фильм"
                            autoComplete="off"
                            required
                            value={movieQuery || ""}
                            onChange={(e) => setMovieQuery(e.target.value)}
                        />
                    </label>
                    <button
                        className="search-form__button"
                        type="submit"
                        aria-label="Кнопка поиска фильмов"
                    >
                        Поиск
                    </button>
                    <span className="search-form__error">{errorMessage}</span>
                </form>
            </div>
            <FilterCheckbox
                onCheckboxChange={onCheckboxFilter}
                isLoading={isLoading}
                isChecked={isChecked} />
        </section>
    )
}

export default SearchForm;