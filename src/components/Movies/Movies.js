import React from 'react';
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
  isCheckboxChecked
}) => {
  // // создаём стейт для чекбокса
  // const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  
    // const firstTwelveMovies = movies.slice(0, 12);
    
    // const [displayedMovies, setDisplayedMovies] = useState(12); // по умолчанию отображаем 12 карточки

    // useEffect(() => {
    //   const handleInitialResize = () => {
    //     if (window.innerWidth <= 1280 && window.innerWidth > 769) {
    //       setDisplayedMovies(12); // если ширина экрана <= 1280px, отображаем 12 карточек
    //     } else if (window.innerWidth <= 769 && window.innerWidth > 321) {
    //       setDisplayedMovies(8);
    //     } else if (window.innerWidth <= 320) {
    //       setDisplayedMovies(5);
    //     }
    //   };
    //   // инициализируем при загрузке страницы
    //   handleInitialResize();
    //   const handleResize = () => handleInitialResize();
    //   // добавляем слушатель события изменения размера экрана при монтировании компонента
    //   window.addEventListener('resize', handleResize);
    //   // удаляем слушатель при размонтировании компонента
    //   return () => {
    //     window.removeEventListener('resize', handleResize);
    //   };
    // }, []); // вызываем useEffect только при монтировании компонента


    // function handleMoviesLoading() {
    //     setMoviesLoading(true);
    // }

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