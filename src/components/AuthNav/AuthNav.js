import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthNav.css';

const AuthNav = ({ authText, linkText }) => {
    const location = useLocation();
    return (
        <nav className="auth-nav">
            <div className="auth-nav__line">
                <p className="auth-nav__text">{authText}</p>
                <Link 
                to={location.pathname === '/signup' ? '/signin' : '/signup'}
                className="auth-nav__link">
                    {linkText}
                </Link>
            </div>
        </nav>
    );
};

export default AuthNav;