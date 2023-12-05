import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { SHORT_MOVIE_LENGTH } from '../../utils/cardsConfig';
import './Movies.css';

const Movies = ({
  loggedIn,
  movies,
  onSearchSubmit,
  onMovieSave,
  onMovieDelete,
  savedMovies,
  isLoading,
  isSucceeded,
  errorMessage,
  onCheckboxFilter,
  // isMovieInSaved,
}) => {
  // локальный стейт с фильмами для отображения.
  // будет обновляться при изменении данных о фильмах из localStorage или результатов поиска
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  // const [isMovieInSaved, setIsMovieInSaved] = useState(false);

  // // делаем кнопку сохранения фильма активной всегда, если фильм уже сохранён
  //   const isMovieInSaved = (movie) => {
  //     // if (!savedMovies) {
  //     //   return false;
  //     // }
  //     if (localStorage.getItem('savedMovies')) {
  //       const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  //       return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  //     }
  //     return false;
  //     // savedMovies.some((savedMovie) => savedMovie.movieId === movie._id);
  // };
  

  useEffect(() => {
    setIsCheckboxChecked(localStorage.getItem('checkboxState') === 'true');
    const checkboxState = localStorage.getItem('checkboxState');
    // избегаем бесконечного цикла, обновляя состояние чекбокса только при изменении
    if (checkboxState === 'true' && !isCheckboxChecked) {
      onCheckboxFilter(true);
    } else if (checkboxState !== 'true' && isCheckboxChecked) {
      onCheckboxFilter(false);
    }

    const updateDisplayedMovies = () => {
      const foundMovies = JSON.parse(localStorage.getItem('foundMovies')) || [];
      const filterFoundMovies = foundMovies.filter((movie) =>
        checkboxState === 'true' ? movie.duration <= SHORT_MOVIE_LENGTH : true
      );
      setDisplayedMovies(filterFoundMovies);
    };

    const handleStorageChange = () => {
      updateDisplayedMovies();
    };

    window.addEventListener('storage', handleStorageChange);
    updateDisplayedMovies();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [onCheckboxFilter, isCheckboxChecked]);

  useEffect(() => {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies')) || [];
    const checkboxState = localStorage.getItem('checkboxState');
    if (movies) {
      const filteredFoundMovies = checkboxState === 'true' ? foundMovies.filter((movie) => movie.duration <= SHORT_MOVIE_LENGTH) : foundMovies;
      setDisplayedMovies(filteredFoundMovies);
    }
  }, [movies]);

    return (
      <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <section className="movies__container">
          <SearchForm
          onSearchSubmit={onSearchSubmit}
          onCheckboxFilter={onCheckboxFilter}
          isLoading={isLoading} />
          <MoviesCardList
          movies={displayedMovies}
          onMovieSave={onMovieSave}
          onMovieDelete={onMovieDelete}
          savedMovies={savedMovies}
          // isMovieInSaved={isMovieInSaved}
          isLoading={isLoading}
          isSucceeded={isSucceeded}
          errorMessage={errorMessage} />
        </section>
      </main>
      <Footer />
      </>
    )
}

export default Movies;