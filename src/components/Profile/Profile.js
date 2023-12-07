import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
import Header from "../Header/Header";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import './Profile.css';

const Profile = ({
    loggedIn,
    handleUpdateUser,
    onLogOut,
    errorMessage,
    onCleanError,
    isLoading,
    isLogginOut,
    isOpen,
    onClose,
    isSucceeded
}) => {
    const { values, errors, formValid, handleInputChange, resetFormValues } = useFormValidation();

    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        resetFormValues({
            email: currentUser.email,
            name: currentUser.name
        }, {}, false)
    }, [currentUser, resetFormValues]);

    function handleSubmit(e) {
        e.preventDefault();
        handleUpdateUser({
            name: values.name,
            email: values.email
        });
    }

    function handleInputChangeWithLoading(e) {
        handleInputChange(e);
        if (errorMessage) {
            onCleanError();
        }
    }

    // проверяем на несовпадение введённых в форму данных с текущими
    const isDataChanged = values.name !== currentUser.name || values.email !== currentUser.email;

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
                            onChange={handleInputChangeWithLoading}
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
                            onChange={handleInputChangeWithLoading}
                            name="email"
                            required
                            autoComplete="off"
                        />
                    </label>
                    <span className="profile__error-span profile__error-span_active">{errors.email}</span>
                    <span className="profile__form-error">{errorMessage}</span>
                    <button
                        className={`profile__edit-button ${!formValid || !isDataChanged || isLoading ? "profile__edit-button_disabled" : ""}`}
                        type="submit"
                        disabled={!formValid || !isDataChanged || isLoading}
                    >
                        {isLoading ? "Сохранение..." : "Редактировать"}
                    </button>
                </form>
                <button className="profile__logout-button" onClick={onLogOut}>
                    {isLogginOut ? "Выход..." : "Выйти из аккаунта"}
                </button>
                </section>
                <InfoTooltip
                isOpen={isOpen}
                onClose={onClose}
                isSucceeded={isSucceeded}
                successMessage='Изменение данных прошло успешно'
                failMessage='Что-то пошло не так, повторите попытку'
                />
            </main>
        </>
    )
}

export default Profile;

// в lvl-4 заменить валидацию на useForm