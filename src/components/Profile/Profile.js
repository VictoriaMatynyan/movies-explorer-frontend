import React from "react";
import { Link } from "react-router-dom";
import './Profile.css';

const Profile = () => {
    return (
        <section className="profile">
            <main className="profile__main">
            <h3 className="profile__title">Привет, Виктория!</h3>
                <form className="profile__form">
                    <label className="profile__label" htmlFor="profile-name">
                        Имя
                        <input
                            className="profile__input"
                            id="profile-name"
                            name="name"
                            type="text"
                            placeholder="Виктория"
                            minLength={2}
                            maxLength={30}
                            required
                            autoComplete="off"
                        />
                    </label>
                    <label className="profile__label" htmlFor="profile-email">
                    E-mail
                        <input
                            className="profile__input"
                            id="profile-email"
                            name="email"
                            type="text"
                            placeholder="pochta@yandex.ru"
                            required
                            autoComplete="off"
                        />
                    </label>
                </form>
                <nav className="profile__nav">
                    <button
                        className="profile__button_type_edit"
                        type="submit"
                    >
                        Редактировать
                    </button>
                    <Link to="/signin" className="profile__link">
                        Выйти из аккаунта
                    </Link>
                </nav>
            </main>
        </section>
    )
}

export default Profile;