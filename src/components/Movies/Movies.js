import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies } from '../../utils/movies';
import Footer from '../Footer/Footer';
import './Movies.css';

const Movies = ({ loggedIn }) => {
    // const [moviesLoading, setMoviesLoading] = useState(false);
    // const firstTwelveMovies = movies.slice(0, 12);
    
    const [displayedMovies, setDisplayedMovies] = useState(12); // по умолчанию отображаем 12 карточки

    useEffect(() => {
      const handleInitialResize = () => {
        if (window.innerWidth <= 1280 && window.innerWidth > 769) {
          setDisplayedMovies(12); // если ширина экрана <= 1280px, отображаем 12 карточек
        } else if (window.innerWidth <= 769 && window.innerWidth > 321) {
          setDisplayedMovies(8);
        } else if (window.innerWidth <= 320) {
          setDisplayedMovies(5);
        }
      };
      // инициализируем при загрузке страницы
      handleInitialResize();
      const handleResize = () => handleInitialResize();
      // добавляем слушатель события изменения размера экрана при монтировании компонента
      window.addEventListener('resize', handleResize);
      // удаляем слушатель при размонтировании компонента
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // вызываем useEffect только при монтировании компонента


    // function handleMoviesLoading() {
    //     setMoviesLoading(true);
    // }

    const location = useLocation();

    return (
            loggedIn ? (
                <section className="movies">
                    <Header loggedIn={loggedIn} />
                    <div className="movies__container">
                    <SearchForm />
                    {/* { moviesLoading ? <Preloader /> : '' } */}
                    <MoviesCardList movies={movies.slice(0, displayedMovies)} />
                    <div className="movies__button-container">
                        {location.pathname === '/movies' ?
                            (<button
                            className="movies__button"
                            type="button"
                        >
                            Еще
                        </button>) : ''}
                    </div>
                </div>
                <Footer />
        </section> ) : null
    )
}

export default Movies;