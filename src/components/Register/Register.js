import React from "react";
import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import AuthForm from "../AuthForm/AuthForm";
import AuthNav from "../AuthNav/AuthNav";
import './Register.css';

const Register = ({ onFormSubmit }) => {
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

    const onSubmit = ({ authName, authEmail, authPassword }) => {
        onFormSubmit(authName, authEmail, authPassword);
        reset();
    }

    return (
        <section className="register">
            <div className="register__container">
            <Logo />
            <GreetingTitle greetingText="Добро пожаловать!" />
            <AuthForm onSubmit={handleSubmit(onSubmit)} buttonText={"Зарегистрироваться"}>
                <label className="auth__label">
                    Имя
                    <input
                    className={`auth__input ${errors?.authName && "auth__input_type_error"}`}
                    type={"text"}
                    {...register('authName', {
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
                        autoComplete="off"
                    />
                    </label>
                    <span className={`auth__error-span ${errors?.authName && "auth__error-span_active"}`}>{errors?.authName?.message}</span>
                    <label className="auth__label">
                        E-mail
                        <input
                            className={`auth__input ${errors?.authEmail && "auth__input_type_error"}`}
                            type="email"
                            {...register('authEmail', {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Некорректный формат E-mail.',
                                }
                            })}
                            autoComplete="off"
                        />
                    </label>
                    <span className={`auth__error-span ${errors?.authEmail && "auth__error-span_active"}`}>{errors?.authEmail?.message}</span>
                    <label className="auth__label">
                        Пароль
                        <input
                            className={`auth__input ${errors?.authPassword && "auth__input_type_error"}`}
                            type="password"
                            {...register('authPassword', {
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: 'Пароль должен содержать минимум 8 символов.',
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: 'Пароль должен содержать минимум 1 букву и 1 цифру.',
                                }
                            })}
                            autoComplete="off"
                        />
                    </label>
                    <span className={`auth__error-span ${errors?.authPassword && "auth__error-span_active"}`}>{errors?.authPassword?.message}</span>
            </AuthForm>
            <AuthNav authText={"Уже зарегистрированы?"} linkText={"Войти"} />
            </div>
        </section>
    )
}

export default Register;