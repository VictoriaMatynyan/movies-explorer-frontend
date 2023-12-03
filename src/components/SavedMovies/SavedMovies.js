import React from "react";
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

  return (
          <>
          <Header loggedIn={loggedIn}  />
          <main className="saved-movies">
            <section className="saved-movies__container">
              <SearchForm
              onSearchSubmit={onSearchSubmit}
              onCheckboxFilter={onCheckboxFilter}
              isLoading={isLoading}
              errorMessage={errorMessage} />
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