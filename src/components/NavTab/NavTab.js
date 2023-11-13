import React, { useState } from 'react';
import './NavTab.css';

const NavTab = () => {
    // создаём стейт для навигационного меню
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(true);
    // функция для изменения видимости нав. меню
    const toggleNavMenu = () => {
        setIsNavMenuOpen(!isNavMenuOpen);
    }

    return (
        <nav className="nav-tab">
            <button 
            className="nav-tab__button"
            onClick={toggleNavMenu}>
                Узнать больше
            </button>
            {
                !isNavMenuOpen && (
                    <ul className="nav-tab__list nav-tab__list_opened">
                <li className="nav-tab__item">
                    <a href="#aboutProject" className="nav-tab__link">О проекте</a>
                </li>
                <li className="nav-tab__item">
                    <a href="#techs" className="nav-tab__link">Технологии</a>
                </li>
                <li className="nav-tab__item">
                    <a href="#aboutMe" className="nav-tab__link">Студент</a>
                </li>
            </ul>
                )
            }
        </nav>
    )
}

export default NavTab;

// заменить <a> на <Link> из react-router-dom