import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthNav.css';

const AuthNav = ({ authText, linkText }) => {
    const location = useLocation();
    return (
        <nav className={location.pathname === '/signup' ? "register__nav" : "login__nav"}>
            <div className={location.pathname === '/signup' ? "register__nav-line" : "login__nav-line"}>
                <p className={location.pathname === '/signup' ? "register__nav-text" : "login__nav-text"}>{authText}</p>
                <Link 
                to={location.pathname === '/signup' ? '/signin' : '/signup'}
                className={location.pathname === '/signup' ? "register__nav-link" : "login__nav-link"}>
                    {linkText}
                </Link>
            </div>
        </nav>
    );
};

export default AuthNav;