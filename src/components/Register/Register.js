import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import Form from "../Form/Form";
import AuthNav from "../AuthNav/AuthNav";
import useFormValidation from "../../hooks/useFormValidation";
import './Register.css';

const Register = ({ onRegiser, errorMessage, onCleanError, isLoading, loggedIn }) => {
    const { values, errors, formValid, handleInputChange } = useFormValidation();
    const navigate = useNavigate();
    
    function handleSubmit (e) {
        e.preventDefault();
        onRegiser(values.name, values.email, values.password);
    }

    // отслеживаем изменения в инпутах
    // если висит серверная ошибка, очищаем её через onCleanError
    function handleInputChangeWithLoading(e) {
        handleInputChange(e);
        if (errorMessage) {
            onCleanError();
        }
    }

    // запрещаем авторизованному пользователю переходить на страницу регистрации
    useEffect(() => {
        loggedIn && navigate('/movies', { replace: true });
    })

    return (
        <section className="register">
            <div className="register__container">
            <Logo className="register__logo" />
            <GreetingTitle
            className="register__greeting-title"
            greetingText="Добро пожаловать!"
            />
            <Form
            onSubmit={handleSubmit}
            buttonText={isLoading ? "Регистрация..." : "Зарегистрироваться"}
            disabled={!formValid || isLoading}
            buttonClassName={`register__submit-button ${!formValid || isLoading ? "register__submit-button_disabled" : ""}`}
            errorMessage={errorMessage}
            onCleanError={onCleanError}
            isLoading={isLoading}>
                <label className="register__form-label">
                    Имя
                    <input
                    className={`register__form-input ${errors.name ? "register__form-input_type_error": ""}`}
                    type="text"
                    value={values.name || ''}
                    onChange={handleInputChangeWithLoading}
                    // onChange={handleInputChange}
                    required
                    name="name"
                    autoComplete="off"
                    />
                    </label>
                    <span className="register__error-span register__error-span_active">{errors.name || ""}</span>
                    <label className="register__form-label">
                        E-mail
                        <input
                            className={`register__form-input ${errors.email ? "register__form-input_type_error" : ""}`}
                            type="email"
                            value={values.email || ''}
                            onChange={handleInputChangeWithLoading}
                            // onChange={handleInputChange}
                            required
                            name="email"
                            autoComplete="off"
                        />
                    </label>
                    <span className="register__error-span register__error-span_active">{errors.email || ""}</span>
                    <label className="register__form-label">
                        Пароль
                        <input
                            className={`register__form-input ${errors.password ? "register__form-input_type_error" : ""}`}
                            type="password"
                            value={values.password || ''}
                            onChange={handleInputChangeWithLoading}
                            // onChange={handleInputChange}
                            required
                            name="password"
                            autoComplete="off"
                        />
                    </label>
                    <span className="register__error-span register__error-span_active">{errors.password || ""}</span>
            </Form>
            <AuthNav authText={"Уже зарегистрированы?"} linkText={"Войти"} />
            </div>
        </section>
    )
}

export default Register;