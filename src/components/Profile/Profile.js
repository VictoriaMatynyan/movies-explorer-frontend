import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
import Header from "../Header/Header";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";
import './Profile.css';

const Profile = ({ loggedIn, handleChangeProfileData }) => {
    const { values, errors, formValid, handleInputChange, resetFormValues } = useFormValidation();

    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        resetFormValues({
            name: currentUser.name,
            email: currentUser.email
        }, {}, false)
    }, [currentUser, resetFormValues]);

    function handleSubmit(e) {
        e.preventDefault();
        handleChangeProfileData();
    }

    //!!!!!!! сделать проверку (useEffect) на несовпадение введённых данных с текущими

    return (
            <>
            <Header loggedIn={loggedIn} />
            <main className="profile">
                <section className="profile__container">
                <GreetingTitle
                className="profile__greeting-title"
                greetingText={`Привет, ${currentUser.name || ""}!`} />
                <form 
                className="form profile__form"
                onSubmit={handleSubmit}>
                    <label className="profile__label">
                        Имя
                        <input
                            className="profile__input"
                            type="text"
                            value={values.name || ""}
                            onChange={handleInputChange}
                            name="name"
                            autoComplete="off"
                        />
                    </label>
                    <span className="profile__error-span profile__error-span_active">{errors.name || ""}</span>
                    <label className="profile__label">
                    E-mail
                        <input
                            className="profile__input"
                            type="email"
                            value={values.email || ""}
                            onChange={handleInputChange}
                            name="email"
                            required
                            autoComplete="off"
                        />
                    </label>
                    <span className="profile__error-span profile__error-span_active">{errors.email}</span>
                    {/* <span className="profile__error-span profile__error-span_active">{(profileEmailDirty && profileEmailError) && profileEmailError}</span> */}
                    <button
                        className={`profile__edit-button ${!formValid ? "profile__edit-button_disabled" : ""}`}
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
    )
}

export default Profile;

// в lvl-4 заменить валидацию на useForm