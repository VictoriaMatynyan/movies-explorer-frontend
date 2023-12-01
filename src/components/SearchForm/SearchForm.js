import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = ({ onSearchSubmit, onCheckboxFilter, isLoading, errorMessage }) => {
    const location = useLocation();
    // стейт для хранения значения поискового запроса
    const [movieQuery, setMovieQuery] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (location.pathname === '/movies') {
            const movieSearchQuery = localStorage.getItem('movieSearchQuery');
            const checkboxState = localStorage.getItem('checkboxState');
            if (movieSearchQuery) {
                setMovieQuery(movieSearchQuery);
            }
            setIsChecked(checkboxState === 'true');
        }
    }, [location.pathname]);

    function handleSubmit(e) {
        e.preventDefault();
        if (location.pathname === '/movies') {
            onSearchSubmit(movieQuery);
            localStorage.setItem('movieSearchQuery', movieQuery);
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
                </form>
            </div>
            <span className="search-form__error">{!movieQuery ? "Нужно ввести ключевое слово" : errorMessage}</span>
            <FilterCheckbox
                onCheckboxFilter={onCheckboxFilter}
                isLoading={isLoading}
                isChecked={isChecked}
            />
        </section>
    )
}

export default SearchForm;