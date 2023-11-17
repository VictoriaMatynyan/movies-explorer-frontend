import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../Header/Header";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import './Profile.css';

const Profile = ({ loggedIn }) => {
    const [name, setName] = useState("Виктория");
    const [email, setEmail] = useState("pochta@yandex.ru");
    
    const onFormSubmit = (profileName, profileEmail) => {
        setName(profileName);
        setEmail(profileEmail);
    }

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = ({ profileName, profileEmail }) => {
        onFormSubmit(profileName, profileEmail);
        reset();
    }

    return (
        loggedIn ? (
            <section className="profile">
            <Header loggedIn={true} />
            <main className="profile__main">
                <GreetingTitle greetingText={`Привет, ${name}!`} />
                <form 
                className="profile__form"
                onSubmit={handleSubmit(onSubmit)}>
                    <label className="profile__label" htmlFor="profileName">
                        Имя
                        <input
                            className="profile__input"
                            type="text"
                            {...register('profileName', {
                                required: true,
                                minLength: {
                                    value: 2,
                                    message: 'Имя должно содержать минимум 2 символа.',
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'Имя должно содержать максимум 30 символов.',
                                },
                                })}
                            placeholder={name || "Виктория"}
                            autoComplete="off"
                        />
                    </label>
                    <span className={`profile__error-span ${errors?.profileName && "profile__error-span_active"}`}>{errors?.profileName?.message}</span>
                    <label className="profile__label" htmlFor="profileEmail">
                    E-mail
                        <input
                            className="profile__input"
                            type="text"
                            {...register('profileEmail', {
                                required: true,
                                pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Некорректный формат E-mail.',
                                },
                            })}
                            placeholder={email || "pochta@yandex.ru"}
                            autoComplete="off"
                        />
                    </label>
                    <span className={`profile__error-span ${errors?.profileEmail && "profile__error-span_active"}`}>{errors?.profileEmail?.message}</span>
                    <button
                        className="profile__button_type_edit"
                        type="submit"
                        disabled={errors?.profileName || errors?.profileEmail}
                    >
                        Редактировать
                    </button>
                </form>
                <Link to="/signin" className="profile__link">
                    Выйти из аккаунта
                </Link>
            </main>
        </section>
        ) : null
    )
}

export default Profile;

// в lvl-3 заменить валидацию на useForm