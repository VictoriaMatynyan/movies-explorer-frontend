import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = ({ onSearchSubmit, onCheckboxFilter, isLoading, errorMessage }) => {
    const location = useLocation();
    // стейт для хранения значения поискового запроса
    const [movieQuery, setMovieQuery] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    // стейт для работы с ошибками
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const checkboxState = localStorage.getItem('checkboxState');
        // разделяем поисковую строку для всех и сохранённых фильмов и
        // определяем нужный нам ключ для поиска в зависимости от страницы
        const storedMovieQuery = location.pathname === '/movies' ?
            localStorage.getItem('movieSearchQuery') :
            localStorage.getItem('savedMovieSearchQuery');

        if (storedMovieQuery) {
            setMovieQuery(storedMovieQuery);
        }
        setIsChecked(checkboxState === 'true');
    }, [location.pathname]);

    function handleSubmit(e) {
        e.preventDefault();
        if (location.pathname === '/movies') {
            const storageKey = 'movieSearchQuery';
            onSearchSubmit(movieQuery);
            localStorage.setItem(storageKey, movieQuery);
        }
        onSearchSubmit(movieQuery);
        setIsSubmitted(true);
    };

    return (
        <section className="search-form">
            <div className="search-form__container">
                <form
                className="search-form__form"
                name="search-form"
                noValidate
                onSubmit={handleSubmit}>
                    <label className="search-form__label" htmlFor="search-form">
                        <input
                            className="search-form__input"
                            id="search-form"
                            type="text"
                            placeholder="Фильм"
                            autoComplete="off"
                            required
                            value={movieQuery}
                            onChange={(e) => setMovieQuery(e.target.value)}
                        />
                    </label>
                    <button
                        className="search-form__button"
                        type="submit"
                        aria-label="Кнопка поиска фильмов"
                        disabled={!movieQuery || isLoading}
                    >
                        {isLoading ? "Ищу..." : "Поиск"}
                    </button>
                </form>
            </div>
            <span className="search-form__error">{isSubmitted && movieQuery === '' ? "Нужно ввести ключевое слово" : errorMessage}</span>
            <FilterCheckbox
                onCheckboxFilter={onCheckboxFilter}
                isLoading={isLoading}
                isChecked={isChecked}
            />
        </section>
    )
}

export default SearchForm;