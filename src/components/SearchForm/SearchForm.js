import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = ({ onSearchSubmit, onCheckboxFilter, isLoading, isChecked }) => {
    const location = useLocation();
    // стейт для хранения значения поискового запроса
    const [movieQuery, setMovieQuery] = useState('');
    // const [isMovieSaved, setIsMovieSaved] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // настраиваем поиск фильмов и сохраняем результат в LocalStorage
    // function handleMovieSearchConfig(movies, searchTerm, isMovieSaved) {
    //     // убираем зависимость от регистра и лишние пробелы
    //     const searchTermToLowerCase = searchTerm.toLowerCase().trim();
    //     const foundMovies = movies.filter((movie) => {
    //         // настраиваем названия фильмов по аналогии с запросом
    //         const movieNameRUToLowerCase = movie.nameRU.toLowerCase().trim();
    //         const movieNameENToLowerCase = movie.nameEN.toLowerCase().trim();
    //         return (
    //             movieNameRUToLowerCase.includes(searchTermToLowerCase) ||
    //             movieNameENToLowerCase.includes(searchTermToLowerCase)
    //         );
    //     })
    //     if (isMovieSaved) {
    //         // если фильм не соханён, то добавляем в LocalStorage поисковый запрос и сам фильм
    //         localStorage.setItem("movieSearchTerm", searchTerm);
    //         localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
    //     } else {

    //     }
    // }

    // функция поиска фильмов Movies отличается от SavedMovies
    function handleSubmit(e) {
        e.preventDefault();
        if (location.pathname === '/movies') {
            if (!movieQuery) { 
                setErrorMessage('Нужно ввести ключевое слово');
            } else {
                onSearchSubmit(movieQuery);
                setErrorMessage('');
            }
        } else {
            onSearchSubmit(movieQuery);
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