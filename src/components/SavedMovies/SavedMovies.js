import React, { useState, useEffect } from "react";
import { savedMovies } from '../../utils/movies';
import Header from "../Header/Header";
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import "./SavedMovies.css";

const SavedMovies = ({ loggedIn }) => {
    const [moviesLoading, setMoviesLoading] = useState(false);
    const [displayedMovies, setDisplayedMovies] = useState(3); // по умолчанию отображаем 3 карточки

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && window.innerWidth > 320) {
        setDisplayedMovies(3); // если ширина экрана <= 768px, отображаем 3 карточки
      } else if (window.innerWidth <= 320) {
        setDisplayedMovies(2); // если ширина экрана <= 320px, отображаем 2 карточки
      }
    };
    // добавляем слушатель события изменения размера экрана при монтировании компонента
    window.addEventListener('resize', handleResize);
    // удаляем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // вызываем useEffect только при монтировании компонента

    function handleMoviesLoading() {
        setMoviesLoading(true);
    }

    return (
        loggedIn ? (
            <section className="saved-movies">
                <Header loggedIn={loggedIn}  />
                <div className="saved-movies__container">
                <SearchForm onClick={handleMoviesLoading} />
                { moviesLoading ? <Preloader /> : '' }
                <MoviesCardList movies={savedMovies.slice(0, displayedMovies)} />
                </div>
            <Footer />
        </section>
        ) : null
    )
}

export default SavedMovies;