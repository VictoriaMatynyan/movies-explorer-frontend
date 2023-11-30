import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
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
}) => {
  // создаём стейт для чекбокса
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // устанавливаем значения для поиска и чекбокса из LocalStorage каждый раз при монтировании компонента
  useEffect(() => {
    setIsCheckboxChecked(JSON.parse(localStorage.getItem('filterCheckBoxState')));
    // получаем фильмы либо из LS, либо пустой массив, если их там нет
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies')) || [];
    // фильтруем сохранённые фильмы в зависимости от состояния чекбокса
    const checkboxState = localStorage.getItem('checkboxState');
    const filterFoundMovies = foundMovies.filter((movie) => checkboxState === 'true' ? movie.duration <= 40 : []); // false вместо []

    setFilteredMovies(filterFoundMovies);
  }, [movies, isCheckboxChecked]);

    return (
      <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <section className="movies__container">
          <SearchForm
          onSearchSubmit={onSearchSubmit}
          onCheckboxChange={onCheckboxFilter}
          isLoading={isLoading}
          isChecked={isCheckboxChecked} />
          <MoviesCardList
          // movies={filteredMovies}
          movies={movies}
          onMovieSave={onMovieSave}
          onMovieDelete={onMovieDelete}
          savedMovies={savedMovies}
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