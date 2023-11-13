import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = ({ isBurgerMenuOpen, toggleBurgerMenu }) => {
    return (isBurgerMenuOpen &&
        <div className="navigation navigation_opened">
            <div className="navigation__container">
                <nav className="navigation__burger-menu navigation__burger-menu_opened">
                    <button 
                    className="navigation__burger-button_opened"
                    onClick={toggleBurgerMenu} />
                        <Link to="/" className="navigation__burger-link">
                                Главная
                        </Link>
                        <Link to="movies" className="navigation__burger-link">
                                Фильмы
                        </Link>
                        <Link to="saved-movies" className="navigation__burger-link">
                                Сохранённые фильмы
                        </Link>
                        <Link to="profile" className="navigation__profile-button" />
                </nav>
            </div>
        </div>
    )
}

export default Navigation;