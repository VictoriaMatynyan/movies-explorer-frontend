import React from "react";
import Logo from "../Logo/Logo";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import AuthForm from "../AuthForm/AuthForm";
import AuthNav from "../AuthNav/AuthNav";
import './Login.css';

const Login = () => {
    return (
        <section className="login">
            <div className="login__container">
            <Logo />
            <GreetingTitle greetingText="Рады видеть!" />
            <AuthForm />
            <AuthNav buttonText={"Войти"} authText={"Ещё не зарегистрированы?"} linkText={"Регистрация"} />
            </div>
        </section>
    )
}

export default Login;