import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import AuthForm from "../AuthForm/AuthForm";
import AuthNav from "../AuthNav/AuthNav";
import './Register.css';

const Register = ({ onFormSubmit }) => {
    const [userData, setUserData] = useState({
        authName: '',
        authEmail: '',
        authPassword: '',
    });

    const [dataDirty, setDataDirty] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // создаём состояние, которое отвечает за валидность формы в целом
    const [formValid, setFormValid] = useState(false);

    // регулярки для email и пароля
    const regExEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // логика валидации поля Имени
    const validateName = (e) => {
        setUserData({...userData, authName: e.target.value});
        if (!e.target.value) {
            setNameError('Поле не может быть пустым.');
        } else if (e.target.value.length < 2) {
            setNameError('Имя должно содержать минимум 2 символа.');
        } else if (e.target.value.length > 30) {
            setNameError('Имя должно содержать максимум 30 символов.');
        } else {
            setNameError('');
        }
    }

    const validateEmail = (e) => {
        setUserData({...userData, authEmail: e.target.value});
        if (!e.target.value.match(regExEmail)) {
            setEmailError('Некорректный формат E-mail.');
        } else if (!e.target.value) {
            setEmailError('Поле не может быть пустым.');
        } else {
            setEmailError('');
        }
    }

    const validatePassword = (e) => {
        setUserData({...userData, authPassword: e.target.value});
        if (!e.target.value.match(regExPassword)) {
            setPasswordError('Пароль должен содержать минимум 8 символов.');
        } else if (!e.target.value) {
            setPasswordError('Поле не может быть пустым.');
        } else {
            setPasswordError('');
        }
    }

    function handleChangeName (e) {
        setUserData({...userData, authName: e.target.value});
        setDataDirty(true);
        validateName(e);
    }

    function handleChangeEmail(e) {
        setUserData({...userData, authEmail: e.target.value});
        setDataDirty(true);
        validateEmail(e);
    }

    function handleChangePassword(e) {
        setUserData({...userData, authPassword: e.target.value});
        setDataDirty(true);
        validatePassword(e);
    }
    
    function handleSubmit (e) {
        e.preventDefault();
        if (!nameError && !emailError && !passwordError) {
            // передаём значения управляемых компонентов во внешний обработчик,
            // при условии, что валидация формы прошла успешно
            onFormSubmit(userData);
        }
    }

    // валидация формы
    useEffect(() => {
        if(nameError || emailError || passwordError || !userData.authName || !userData.authEmail || !userData.authPassword) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, emailError, passwordError, userData]);

    return (
        <section className="register">
            <div className="register__container">
            <Logo />
            <GreetingTitle greetingText="Добро пожаловать!" />
            <AuthForm
            onSubmit={handleSubmit}
            buttonText={"Зарегистрироваться"}
            disabled={!formValid}
            buttonClassName={`auth__submit-button ${!formValid && "auth__submit-button_disabled"}`}>
                <label className="auth__label">
                    Имя
                    <input
                    className={`auth__input ${(dataDirty && nameError) && "auth__input_type_error"}`}
                    type={"text"}
                    value={userData.authName}
                    onChange={handleChangeName}
                    autoComplete="off"
                    />
                    </label>
                    <span className="auth__error-span auth__error-span_active">{(dataDirty && nameError) && nameError}</span>
                    <label className="auth__label">
                        E-mail
                        <input
                            className={`auth__input ${(dataDirty && emailError) && "auth__input_type_error"}`}
                            type="email"
                            value={userData.authEmail}
                            onChange={handleChangeEmail}
                            autoComplete="off"
                        />
                    </label>
                    <span className="auth__error-span auth__error-span_active">{(dataDirty && emailError) && emailError}</span>
                    <label className="auth__label">
                        Пароль
                        <input
                            className={`auth__input ${(dataDirty && passwordError) && "auth__input_type_error"}`}
                            type="password"
                            value={userData.authPassword}
                            onChange={handleChangePassword}
                            autoComplete="off"
                        />
                    </label>
                    <span className="auth__error-span auth__error-span_active">{(dataDirty && passwordError) && passwordError}</span>
            </AuthForm>
            <AuthNav authText={"Уже зарегистрированы?"} linkText={"Войти"} />
            </div>
        </section>
    )
}

export default Register;