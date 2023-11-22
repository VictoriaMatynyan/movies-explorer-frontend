import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = () => {
    return (
        <section className="search-form">
            <div className="search-form__container">
                <form className="search-form__form" name="search-form">
                    <label className="search-form__label" htmlFor="search-form">
                        <input
                            className="search-form__input"
                            id="search-form"
                            type="text"
                            placeholder="Фильм"
                            autoComplete="off"
                            required
                        />
                    </label>
                    <button
                        className="search-form__button"
                        type="submit"
                        aria-label="Кнопка поиска фильмов"
                        // onClick={onClick}
                    >
                        Поиск
                    </button>
                </form>
            </div>
            <FilterCheckbox />
        </section>
    )
}

export default SearchForm;