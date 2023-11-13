import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

    const authorizedPathname = ['/movies, /saved-movies', '/profile'];

    return (
        <header className="header">
                {
                    !loggedIn ? (
                        <div className='header__container_auth'>
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
                    <div className={`${location.pathname === authorizedPathname ? 'header__container_authorized' : 'header__container_landing'}`}>
                        <Logo />
                        <nav className="header__nav">
                            <Link to="movies" className="header__nav-link">
                                Фильмы
                            </Link>
                            <Link to="saved-movies" className="header__nav-link">
                                Сохранённые фильмы
                            </Link>
                        </nav> 
                        <div className="header__button-containter">
                        <Link to="profile" className="header__profile-button" />
                        {!isBurgerMenuOpen && (
                        <button className="header__burger-button"
                        type="button" 
                        onClick={toggleBurgerMenu}>
                        </button>
                        )}
                        </div>
                        <Navigation isBurgerMenuOpen={isBurgerMenuOpen} toggleBurgerMenu={toggleBurgerMenu} />
                    </div>
                    )
                }
        </header>
    );
};

export default Header;