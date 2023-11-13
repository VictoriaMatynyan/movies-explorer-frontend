import React from 'react';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

const AboutMe = () => {
    return (
        <section className="about-me" id='aboutMe'>
            <h2 className="about-me__title">Студент</h2>
            <div className='about-me__containter'>
                <article className="about-me__content">
                    <h3 className="about-me__name">Виктория</h3>
                    <p className="about-me__about">Фронтенд-разработчица, 28 лет</p>
                    <p className="about-me__text">Я родилась в Тольятти, живу в Москве, закончила факультет лингвистики ТГУ. 
                    Я увлекаюсь игрой на гитаре и немного шитьём. Недавно начала кодить. С 2018 года работала в сфере автомобильной
                    промышленности в департаменте закупок. Затем решила попробовать себя в том, что мне по душе. Так я начала изучать веб-разработку.</p>
                    <a className="about-me__link" href="https://github.com/VictoriaMatynyan" target="_blank" rel="noreferrer">Github</a>
                </article>
                <div className="about-me__avatar"></div>
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;