import React from "react";
import Logo from "../Logo/Logo";
import GreetingTitle from "../GreetingTitle/GreetingTitle";
import AuthForm from "../AuthForm/AuthForm";
import AuthNav from "../AuthNav/AuthNav";
import './Register.css';

const Register = () => {
    return (
        <section className="register">
            <div className="register__container">
            <Logo />
            <GreetingTitle greetingText="Добро пожаловать!" />
            <AuthForm />
            <AuthNav buttonText={"Зарегистрироваться"} authText={"Уже зарегистрированы?"} linkText={"Войти"} />
            </div>
        </section>
    )
}

export default Register;