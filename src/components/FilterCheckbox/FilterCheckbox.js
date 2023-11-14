import React from "react";
import './FilterCheckbox.css';

const FilterCheckbox = () => {
    return (
        <div className="filter-checkbox">
            <label
                className="filter-checkbox__label"
                htmlFor="filter-checkbox"
            >
                <input
                className="filter-checkbox__input"
                id="filter-checkbox"
                type="checkbox"/>
                <span className="filter-checkbox__text">Короткометражки</span>
            </label>
        </div>
    );
};

export default FilterCheckbox;