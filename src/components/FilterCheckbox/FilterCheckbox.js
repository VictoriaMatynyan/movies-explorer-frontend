import React, { useState } from "react";
import './FilterCheckbox.css';

const FilterCheckbox = ({ onCheckboxChange, isLoading, isChecked }) => {
    const [isCheckBoxChecked, setIsCheckboxChecked] = useState(isChecked);
    const handleCheckboxToggle = (e) => {
        setIsCheckboxChecked(e.target.checked);
        onCheckboxChange(e.target.checked);
    };

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
                onChange={handleCheckboxToggle}
                // onChange={(e) => onCheckboxChange(e.target.checked)}
                disabled={isLoading ? true : false}
                checked={isCheckBoxChecked} />
                <span className="filter-checkbox__text">Короткометражки</span>
            </label>
        </div>
    );
};

export default FilterCheckbox;