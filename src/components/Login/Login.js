import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
// import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import Form from "../Form/Form";
import AuthNav from "../AuthNav/AuthNav";
import useFormValidation from "../../hooks/useFormValidation";
import './Login.css';

const Login = ({ onLogin, errorMessage, onCleanError, isLoading, loggedIn }) => {
    const { values, errors, formValid, handleInputChange } = useFormValidation();
    const navigate = useNavigate();

    function handleSubmit (e) {
        e.preventDefault();
        onLogin(values.email, values.password);
    }

    // отслеживаем изменения в инпутах
    // если висит серверная ошибка, очищаем её через onCleanError
    function handleInputChangeWithLoading(e) {
        handleInputChange(e);
        if (errorMessage) {
            onCleanError();
        }
    }

    // запрещаем авторизованному пользователю переходить на логин
    useEffect(() => {
        loggedIn && navigate('/movies', { replace: true });
    })

    return (
        <main className="login">
            <div className="login__container">
            <Logo className="login__logo"/>
            <GreetingTitle
            className="login__greeting-title"
            greetingText="Рады видеть!"
            />
            <Form
            onSubmit={handleSubmit}
            buttonText={isLoading ? "Вход в систему..." : "Войти"}
            disabled={!formValid || isLoading}
            buttonClassName={`login__submit-button ${!formValid || isLoading ? "login__submit-button_disabled" : ""}`}
            errorMessage={errorMessage}
            onCleanError={onCleanError}
            isLoading={isLoading}
            >
            <label className="login__form-label">
                E-mail
                <input
                className={`login__form-input ${errors.email ? "login__form-input_type_error" : ""}`}
                value={values.email || ''}
                onChange={handleInputChangeWithLoading}
                type="email"
                name="email"
                required
                autoComplete="off"
                />
            </label>
            <span className="login__error-span login__error-span_active">{errors.email || ""}</span>
            <label className="login__form-label">
                Пароль
                <input
                className={`login__form-input ${errors.password ? "login__form-input_type_error" : ""}`}
                value={values.password || ''}
                onChange={handleInputChangeWithLoading}
                type="password"
                name="password"
                required
                autoComplete="off"
                />
            </label>
            <span className="login__error-span login__error-span_active">{errors.password || ""}</span>
            </Form>
            <AuthNav authText={"Ещё не зарегистрированы?"} linkText={"Регистрация"} />
            </div>
        </main>
    )
}

export default Login;