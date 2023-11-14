import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = ({ loggedIn }) => {
    // создаём стейт для меню-бургера
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    // функция для изменения видимости меню-бургера: меняем false на true
    const toggleBurgerMenu = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    }

    // создаём переменную для отображения нужной шапки
    const location = useLocation();

    const authorizedPathname = '/movies' || '/saved-movies' || '/profile';

    return (
        <header className="header">
            {
            !loggedIn ? (
                <div className="header__container-unauth">
                    <Logo />
                    <nav className="header__auth-nav">
                            <Link to="signup" className="header__link">
                            Регистрация
                            </Link>
                            <Link to="signin" className="header__signin-button">
                                Войти
                            </Link>
                        </nav>
                </div>
                ) :
                (
                    <div className={`${location.pathname === authorizedPathname ? 'header__auth-container' : 'header__auth-container__landing'}`}>
                        <Logo />
                        <div className="header__nav-container">
                            <nav className="header__nav">
                                <NavLink to="/movies" className="header__nav-link">
                                    Фильмы
                                </NavLink>
                                <NavLink to="saved-movies" className="header__nav-link">
                                    Сохранённые фильмы
                                </NavLink>
                            </nav> 
                            <div className="header__button-containter">
                            <Link to="profile" className={`${location.pathname === authorizedPathname ? 'header__profile-button_authorized' : 'header__profile-button_landing'}`} />
                            {!isBurgerMenuOpen && (
                            <button className="header__burger-button"
                            type="button" 
                            onClick={toggleBurgerMenu}>
                            </button>
                            )}
                            </div>
                        <Navigation isBurgerMenuOpen={isBurgerMenuOpen} toggleBurgerMenu={toggleBurgerMenu} />
                        </div>
                    </div>
                    )
                }
        </header>
    );
};

export default Header;