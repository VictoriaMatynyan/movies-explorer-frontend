import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ children, buttonText, onSubmit }) => {
    const location = useLocation();

    return (
        <form
        className={location.pathname === "/signup" ? "auth__form" : "login__form"}
        name="auth-form"
        onSubmit={onSubmit}>
            {children}
            <button
                className={location.pathname === "/signup" ? "auth__submit-button" : "login__submit-button"}
                type="submit">
                {buttonText}
            </button>
        </form>   
        );
    }
       

export default AuthForm;