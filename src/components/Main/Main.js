import React from "react";
// импорт презентационных компонентов
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from '../Footer/Footer';

import '../Main/Main.css';

const Main = () => {
    return (
        <main className="main">
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Footer />
        </main>
    )
}

export default Main;