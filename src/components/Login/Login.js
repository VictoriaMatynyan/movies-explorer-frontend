import React from "react";
// import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import Form from "../Form/Form";
import AuthNav from "../AuthNav/AuthNav";
import useFormValidation from "../../hooks/useFormValidation";
import './Login.css';

const Login = ({ onLogin }) => {
    const { values, errors, formValid, handleInputChange } = useFormValidation();

    function handleSubmit (e) {
        e.preventDefault();
        onLogin(values.email, values.password);
    }

    return (
        <section className="login">
            <div className="login__container">
            <Logo className="login__logo"/>
            <GreetingTitle
            className="login__greeting-title"
            greetingText="Рады видеть!"
            />
            <Form
            onSubmit={handleSubmit}
            buttonText="Войти"
            disabled={!formValid}
            buttonClassName={`login__submit-button ${!formValid ? "login__submit-button_disabled" : ""}`}>
            <label className="login__form-label">
                E-mail
                <input
                className={`login__form-input ${errors.email ? "login__form-input_type_error" : ""}`}
                value={values.email || ''}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
        </section>
    )
}

export default Login;