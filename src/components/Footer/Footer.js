import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className="footer__copyright">&#169; 2023</p>
                <ul className="footer__links">
                    <li className="footer__link-item">
                        <a
                            href="https://practicum.yandex.ru/"
                            className="footer__link"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className="footer__link-item">
                        <a
                            href="https://github.com/VictoriaMatynyan"
                            className="footer__link"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Github
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;