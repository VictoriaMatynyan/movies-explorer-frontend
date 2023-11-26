import React from "react";
// import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import Form from "../Form/Form";
import AuthNav from "../AuthNav/AuthNav";
import useFormValidation from "../../hooks/useFormValidation";
import './Register.css';

const Register = ({ onRegiser }) => {
    const { values, errors, formValid, handleInputChange } = useFormValidation();
    
    function handleSubmit (e) {
        e.preventDefault();
        onRegiser(values.name, values.email, values.password);
    }

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
            buttonText={"Зарегистрироваться"}
            disabled={!formValid}
            buttonClassName={`register__submit-button ${!formValid ? "register__submit-button_disabled" : ""}`}>
                <label className="register__form-label">
                    Имя
                    <input
                    className={`register__form-input ${errors.name ? "register__form-input_type_error": ""}`}
                    type="text"
                    value={values.name || ''}
                    onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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