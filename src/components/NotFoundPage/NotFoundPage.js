import React from "react";
import { useNavigate } from "react-router-dom";
import './NotFoundPage.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <section className="not-found-page">
            <h2 className="not-found-page__title">404</h2>
            <p className="not-found-page__text">Страница не найдена</p>
            <button className="not-found-page__button" onClick={() => navigate(-1)}>Назад</button>
        </section>
    )
}

export default NotFoundPage;