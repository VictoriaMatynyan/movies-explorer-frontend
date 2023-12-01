import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import "./SavedMovies.css";

const SavedMovies = ({ 
  loggedIn,
  movies,
  onSearchSubmit,
  onMovieDelete,
  isLoading,
  isSucceeded,
  errorMessage,
  onCheckboxFilter,
 }) => {
  // const [moviesLoading, setMoviesLoading] = useState(false);
  // const [displayedMovies, setDisplayedMovies] = useState(6); // по умолчанию отображаем 6 карточек

  // useEffect(() => {
  //   const handleInitialResize = () => {
  //     if (window.innerWidth <= 768 && window.innerWidth > 320) {
  //       setDisplayedMovies(6); // если ширина экрана <= 768px, отображаем 6 карточек
  //     } else if (window.innerWidth <= 320) {
  //       setDisplayedMovies(2); // если ширина экрана <= 320px, отображаем 2 карточки
  //     }
  //   };
  //   handleInitialResize();
  //   const handleResize = () => handleInitialResize();
  //   // добавляем слушатель события изменения размера экрана при монтировании компонента
  //   window.addEventListener('resize', handleResize);
  //   // удаляем слушатель при размонтировании компонента
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []); // вызываем useEffect только при монтировании компонента


    return (
          <>
          <Header loggedIn={loggedIn}  />
          <main className="saved-movies">
            <section className="saved-movies__container">
              <SearchForm
              onSearchSubmit={onSearchSubmit}
              onCheckboxFilter={onCheckboxFilter}
              isLoading={isLoading} />
              <MoviesCardList
              movies={movies}
              onMovieDelete={onMovieDelete}
              isLoading={isLoading}
              isSucceeded={isSucceeded}
              errorMessage={errorMessage} />
            </section>
          </main>
          <Footer />
          </>
    )
}

export default SavedMovies;