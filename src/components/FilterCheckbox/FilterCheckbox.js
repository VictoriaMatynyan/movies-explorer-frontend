import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css';

const FilterCheckbox = ({ onCheckboxFilter, isLoading }) => {
    const location = useLocation();
    // const [isCheckBoxChecked, setIsCheckboxChecked] = useState(false);
    const [isCheckBoxChecked, setIsCheckboxChecked] = useState(() => {
        if (location.pathname === '/movies') {
            return localStorage.getItem('checkboxState') === 'true';
        }
        return false;
    });
    const handleCheckboxToggle = () => {
        const targetChecked = !isCheckBoxChecked;
        setIsCheckboxChecked(targetChecked);
        onCheckboxFilter(targetChecked);
    };

    useEffect(() => {
        const handleStorageChange = (e) => {
          if (e.key === 'checkboxState') {
            setIsCheckboxChecked(e.newValue === 'true');
          }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);

    return (
        <div className="filter-checkbox">
            <label
                className="filter-checkbox__label"
                htmlFor="filter-checkbox">
                <input
                className="filter-checkbox__input"
                id="filter-checkbox"
                type="checkbox"
                onChange={handleCheckboxToggle}
                disabled={isLoading ? true : false}
                checked={isCheckBoxChecked}
                 />
                <span className="filter-checkbox__text">Короткометражки</span>
            </label>
        </div>
    );
};

export default FilterCheckbox;