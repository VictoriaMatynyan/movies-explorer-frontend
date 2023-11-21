import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
    return (
        <section className="about-project" id='aboutProject'>
            <h2 className='about-project__title'>О проекте</h2>
            <article className='about-project__content'>
                <h2 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h2>
                <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <h2 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h2>
                <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </article>
            <article className='about-project__milestones'>
                <p className='about-project__milestone black-text'>1 неделя</p>
                <p className='about-project__milestone white-text'>4 недели</p>
                <p className='about-project__milestone'>Back-end</p>
                <p className='about-project__milestone'>Front-end</p>
            </article>
        </section>
    )
}

export default AboutProject;