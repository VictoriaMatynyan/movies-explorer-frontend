import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import Form from "../Form/Form";
import AuthNav from "../AuthNav/AuthNav";
import './Login.css';

const Login = ({ onFormSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // добавляем валидацию формы
    // создаём состояния, которые покажут, были мы в инпуте или нет. При касании инпута, он будет true
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    // создаём состояния для отражения ошибки
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    // создаём состояние, которое отвечает за валидность формы в целом
    const [formValid, setFormValid] = useState(false);

    // регулярки для email и пароля
    const regExEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // логика валидации поля Email
    const validateEmail = (e) => {
        setEmail(e.target.value);
        if (!e.target.value.match(regExEmail)) {
            setEmailError('Некорректный формат E-mail.');
        } else {
        setEmailError('');
        }
    }

    // логика валидации поля Пароль
    const validatePassword = (e) => {
        setPassword(e.target.value);
        if (!e.target.value.match(regExPassword)) {
            setPasswordError('Пароль должен содержать минимум 8 символов.');
        } else {
            setPasswordError('');
        }
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
        setEmailDirty(true);
        validateEmail(e);        
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
        setPasswordDirty(true);
        validatePassword(e);
    }

    function handleSubmit (e) {
        e.preventDefault();
        if (!emailError && !passwordError) {
            // передаём значения управляемых компонентов во внешний обработчик,
            // при условии, что валидация формы прошла успешно
            onFormSubmit({
                email,
                password,
            });
        }
    }

    // валидация формы
    useEffect(() => {
        if(emailError || passwordError || !email || !password) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError, email, password]);

    return (
        <section className="login">
            <div className="login__container">
            <Logo className={"login__logo"}/>
            <GreetingTitle
            className="login__greeting-title"
            greetingText="Рады видеть!"
            />
            <Form
            onSubmit={handleSubmit}
            buttonText="Войти"
            disabled={!formValid}
            buttonClassName={`login__submit-button ${!formValid && "login__submit-button_disabled"}`}>
            <label className="login__form-label">
                E-mail
                <input
                className={`login__form-input ${(emailDirty && emailError) && "login__form-input_type_error"}`}
                value={email}
                onChange={handleChangeEmail}
                type="email"
                autoComplete="off"
                />
            </label>
            <span className="login__error-span login__error-span_active">{(emailDirty && emailError) && emailError}</span>
            <label className="login__form-label">
                Пароль
                <input
                className={`login__form-input ${(passwordDirty && passwordError) && "login__form-input_type_error"}`}
                value={password}
                onChange={handleChangePassword}
                type="password"
                autoComplete="off"
                />
            </label>
            <span className="login__error-span login__error-span_active">{(passwordDirty && passwordError) && passwordError}</span>
            </Form>
            <AuthNav authText={"Ещё не зарегистрированы?"} linkText={"Регистрация"} />
            </div>
        </section>
    )
}

export default Login;