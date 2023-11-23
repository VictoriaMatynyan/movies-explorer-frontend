import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__content">
                <li className="portfolio__subtitle">
                    <a
                    href="https://victoriamatynyan.github.io/how-to-learn/" 
                    className="portfolio__link" 
                    target="_blank" 
                    rel="noreferrer">
                        <p className="portfolio__text">Статичный сайт</p>
                        <p className="portfolio__arrow">↗</p>
                    </a>
                </li>
                <li className="portfolio__subtitle">
                    <a
                    href="https://victoriamatynyan.github.io/russian-travel/" 
                    className="portfolio__link" 
                    target="_blank" 
                    rel="noreferrer">
                        <p className="portfolio__text">Адаптивный сайт</p>
                        <p className="portfolio__arrow">↗</p>
                    </a>
                </li>    
                <li className="portfolio__subtitle">
                <a
                    href="https://victoriamatynyan.github.io/react-mesto-auth/" 
                    className="portfolio__link" 
                    target="_blank" 
                    rel="noreferrer">
                        <p className="portfolio__text">Одностраничное приложение</p>
                        <p className="portfolio__arrow">↗</p>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;