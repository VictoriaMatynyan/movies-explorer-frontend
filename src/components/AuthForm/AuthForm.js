import React from 'react';
import './AuthForm.css';
import { useLocation } from 'react-router-dom';

const AuthForm = () => {
    const location = useLocation();

    return (
            location.pathname === '/signup' ? (
                <form className="auth__form" name="auth-form">
                    <label className="auth__label" htmlFor="auth-name">
                        Имя
                        <input
                            className="auth__input"
                            id="auth-name"
                            type="text"
                            required
                            autoComplete="off"
                        />
                    </label>
                    <label className="auth__label" htmlFor="auth-email">
                        Email
                        <input
                            className="auth__input"
                            type="email"
                            id="auth-email"
                            required
                            autoComplete="off"
                        />
                    </label>
                    <label className="auth__label" htmlFor="auth-password">
                        Пароль
                        <input
                            className="auth__input"
                            type="password"
                            id="password"
                            required
                            autoComplete="off"
                        />
                    </label>
                </form>
                ) : (
                    <form className="login__form" name="login-form">
                        <label className="login__label" htmlFor="login-email">
                            E-mail
                            <input
                                className="login__input"
                                type="email"
                                id="login-email"
                                required
                                autoComplete="off"
                            />
                        </label>
                        <label className="login__label" htmlFor="login-password">
                            Пароль
                            <input
                                className="login__input"
                                type="password"
                                id="login-password"
                                required
                                autoComplete="off"
                            />
                        </label>
                    </form>
                )
    );
};

export default AuthForm;