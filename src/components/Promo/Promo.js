// import NavTab from '../NavTab/NavTab';
import './Promo.css';

const Promo = () => {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className='promo__title'>Учебный проект студента факультета Веб&nbsp;-&nbsp;разработки.</h1>
                <p className='promo__text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                {/* <NavTab /> */}
                <a href="#aboutProject" className="promo__link">Узнать&nbsp;больше</a>
                <div className='promo__logo'></div>
            </div>
        </section>
    )
}

export default Promo;

// NavTav добавить вместо <a> на последнем этапе для улучшенной навигации