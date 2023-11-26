import React from 'react';
import { useLocation } from 'react-router-dom';
import './Form.css';

const Form = ({ children, buttonText, disabled, buttonClassName, onSubmit }) => {
    const location = useLocation();

    return (
        <form
        className={`form ${location.pathname === "/signup" ? "register__form" : "login__form"}`}
        name={location.pathname === "/signup" ? "register__form" : "login__form"}
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
       

export default Form;