import React from 'react';
import { useLocation } from 'react-router-dom';
import './Form.css';

const Form = ({
    children,
    buttonText,
    disabled,
    buttonClassName,
    onSubmit,
    errorMessage,
    cleanError
 }) => {

    const location = useLocation();

    return (
        <form
        className={`form ${location.pathname === "/signup" ? "register__form" : "login__form"}`}
        name={location.pathname === "/signup" ? "register__form" : "login__form"}
        onSubmit={onSubmit}>
            {children}
            <span 
            className={`form__error ${location.pathname === "/signup" ? "form__error_register" : "form__error_login"}`}>
                {errorMessage}
            </span>
            <button
                className={buttonClassName}
                type="submit"
                disabled={disabled}
                onClick={cleanError}>
                    {buttonText}
            </button>
        </form>   
        );
    }
       

export default Form;