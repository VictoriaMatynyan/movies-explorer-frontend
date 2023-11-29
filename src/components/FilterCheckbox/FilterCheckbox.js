import React from "react";
import './FilterCheckbox.css';

const FilterCheckbox = ({ onCheckboxChange, isLoading, isChecked }) => {
    return (
        <div className="filter-checkbox">
            <label
                className="filter-checkbox__label"
                htmlFor="filter-checkbox"
            >
                <input
                className="filter-checkbox__input"
                id="filter-checkbox"
                type="checkbox"
                onChange={(e) => onCheckboxChange(e.target.checked)}
                disabled={isLoading ? true : false}
                checked={isChecked} />
                <span className="filter-checkbox__text">Короткометражки</span>
            </label>
        </div>
    );
};

export default FilterCheckbox;