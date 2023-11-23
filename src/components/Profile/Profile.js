import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
import Header from "../Header/Header";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import './Profile.css';

const Profile = ({ loggedIn }) => {
    const [name, setName] = useState("Виктория");
    const [email, setEmail] = useState("pochta@yandex.ru");
    
    const [profileName, setProfileName] = useState("");
    const [profileEmail, setProfileEmail] = useState("");

    const [profileNameDirty, setProfileNameDirty] = useState(false);
    const [profileEmailDirty, setProfileEmailDirty] = useState(false);
    const [profileNameError, setProfileNameError] = useState("");
    const [profileEmailError, setProfileEmailError] = useState("");

    const [formValid, setFormValid] = useState(false);

    const regExEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const validateProfileName = (e) => {
        setProfileName(e.target.value);
        if (!e.target.value) {
            setProfileNameError("Поле не может быть пустым");
        } else if (e.target.value.length < 2) {
            setProfileNameError("Имя должно содержать минимум 2 символа");
        } else if (e.target.value.length > 30) {
            setProfileNameError("Имя должно содержать максимум 30 символов");
        } else {
            setProfileNameError("");
        }
    }

    const validateProfileEmail = (e) => {
        setProfileEmail(e.target.value);
        if (!e.target.value.match(regExEmail)) {
            setProfileEmailError("Некорректный формат E-mail");
        } else if (!e.target.value) {
            setProfileEmailError("Поле не может быть пустым");
        }else {
            setProfileEmailError("");
        }
    }

    function handleChangeProfileName (e) {
        setProfileName(e.target.value);
        setProfileNameDirty(true);
        validateProfileName(e);
    }

    function handleChangeProfileEmail (e) {
        setProfileEmail(e.target.value);
        setProfileEmailDirty(true);
        validateProfileEmail(e);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!profileNameError && !profileEmailError) {
            setFormValid(true);
            setName(profileName);
        setEmail(profileEmail);
        } 
    }

    useEffect(() => {
        if (profileNameError || profileEmailError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    },
    [profileNameError, profileEmailError]);

    return (
        loggedIn ? (
            <>
            <Header loggedIn={loggedIn} />
            <main className="profile">
                <section className="profile__container">
                <GreetingTitle
                className="profile__greeting-title"
                greetingText={`Привет, ${name}!`} />
                <form 
                className="profile__form"
                onSubmit={handleSubmit}>
                    <label className="profile__label">
                        Имя
                        <input
                            className="profile__input"
                            type="text"
                            value={profileName || "Виктория"}
                            onChange={handleChangeProfileName}
                            autoComplete="off"
                        />
                    </label>
                    <span className="profile__error-span profile__error-span_active">{(profileNameDirty && profileNameError) && profileNameError}</span>
                    <label className="profile__label">
                    E-mail
                        <input
                            className="profile__input"
                            type="text"
                            value={profileEmail || "pochta@yandex.ru"}
                            onChange={handleChangeProfileEmail}
                            placeholder={email || "pochta@yandex.ru"}
                            autoComplete="off"
                        />
                    </label>
                    <span className="profile__error-span profile__error-span_active">{(profileEmailDirty && profileEmailError) && profileEmailError}</span>
                    <button
                        className={`profile__edit-button ${!formValid && "profile__edit-button_disabled"}`}
                        type="submit"
                        disabled={!formValid}
                    >
                        Редактировать
                    </button>
                </form>
                <Link to="/signin" className="profile__link">
                    Выйти из аккаунта
                </Link>
                </section>
            </main>
        </>
        ) : null
    )
}

export default Profile;

// в lvl-4 заменить валидацию на useForm