import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ children, buttonText, disabled, buttonClassName, onSubmit }) => {
    const location = useLocation();

    return (
        <form
        className={location.pathname === "/signup" ? "auth__form" : "login__form"}
        name="auth-form"
        onSubmit={onSubmit}>
            {children}
            <button
                className={buttonClassName}
                type="submit"
                disabled={disabled}>
                {buttonText}
            </button>
        </form>   
        );
    }
       

export default AuthForm;