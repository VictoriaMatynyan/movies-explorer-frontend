import React from "react";
// импорт презентационных компонентов
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from '../Footer/Footer';

import '../Main/Main.css';

const Main = ({ loggedIn }) => {
    return (
        <>
        <Header loggedIn={loggedIn} />
        <main className="main">
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
        </main>
        <Footer />
        </>
    )
}

export default Main;