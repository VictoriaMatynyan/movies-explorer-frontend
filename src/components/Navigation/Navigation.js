import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import './Navigation.css';

const Navigation = ({ isBurgerMenuOpen, toggleBurgerMenu }) => {
    const location = useLocation();

    return (isBurgerMenuOpen &&
        <section className={`navigation ${isBurgerMenuOpen && "navigation_opened"}`}>
            <div className={`navigation__container ${location.pathname === '/' && "navigation__container_landing"}`}>
                <button 
                className="navigation__burger-button_opened"
                onClick={toggleBurgerMenu} />
                <ul className={`navigation__burger-menu ${isBurgerMenuOpen && "navigation__burger-menu_opened" }`}>
                    <li className="navigation__burger-item">
                        <NavLink to="/" className="navigation__burger-link">
                            Главная
                        </NavLink>
                    </li>
                    <li className="navigation__burger-item">
                        <NavLink to="/movies" className="navigation__burger-link">
                            Фильмы
                        </NavLink>
                    </li>
                    <li className="navigation__burger-item">
                        <NavLink to="/saved-movies" className="navigation__burger-link">
                            Сохранённые фильмы
                        </NavLink>
                    </li>
                </ul>
                <Link to="/profile" className={`navigation__profile-button ${location.pathname === '/' ? "navigation__profile-button_landing" : "navigation__profile-button_movies"}`} />
            </div>
        </section>
    )
}

export default Navigation;