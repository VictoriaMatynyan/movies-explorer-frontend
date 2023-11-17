import React from "react";
import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import AuthForm from "../AuthForm/AuthForm";
import AuthNav from "../AuthNav/AuthNav";
import './Login.css';

const Login = ({ onFormSubmit }) => {
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

    const onSubmit = ({ loginEmail, loginPassword }) => {
        onFormSubmit(loginEmail, loginPassword);
        reset();
    }

    return (
        <section className="login">
            <div className="login__container">
            <Logo />
            <GreetingTitle greetingText="Рады видеть!" />
            <AuthForm onSubmit={handleSubmit(onSubmit)} buttonText={"Войти"}>
            <label className="login__label">
                E-mail
                <input
                className={`login__input ${errors?.loginEmail && "login__input_type_error"}`}
                type="email"
                {...register('loginEmail', {
                    required: true,
                    pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Некорректный формат E-mail.',
                    },
                })}
                autoComplete="off"
                />
            </label>
            <span className={`auth__error-span ${errors?.loginEmail && "auth__error-span_active"}`}>{errors?.loginEmail?.message}</span>
            <label className="login__label">
                Пароль
                <input
                className={`login__input ${errors?.loginPassword && "login__input_type_error"}`}
                type="password"
                {...register('loginPassword', {
                    required: true,
                    minLength: {
                        value: 6,
                        message: 'Пароль должен содержать минимум 8 символов.',
                    },
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: 'Пароль должен содержать минимум 1 букву и 1 цифру',
                    },
                    })}
                    autoComplete="off"
                />
            </label>
            <span className={`auth__error-span ${errors?.loginPassword && "auth__error-span_active"}`}>{errors?.loginPassword?.message}</span>
            </AuthForm>
            <AuthNav authText={"Ещё не зарегистрированы?"} linkText={"Регистрация"} />
            </div>
        </section>
    )
}

export default Login;