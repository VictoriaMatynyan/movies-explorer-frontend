import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useMoviesRender } from '../../hooks/useMoviesRender';
import './MoviesCardList.css';

const MoviesCardList = ({
    movies,
    onMovieSave,
    onMovieDelete,
    savedMovies,
    isLoading,
    isSucceeded,
    errorMessage }) => {
    const location = useLocation();
    const { moviesRenderScheme, setMoviesRenderScheme } = useMoviesRender();
    // проверяем, сохранён ли фильм (это влияет на состояние кнопки "Сохранить")
    // savedMovies - массив сохранённых фильмов, movie - объект фильма
    function checkIsSaved(savedMovies, movie) {
        return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
    }
    
    const onShowMoreClick = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1280) {
            setMoviesRenderScheme({
                ...moviesRenderScheme,
                totalAmountOfMovies: moviesRenderScheme.totalAmountOfMovies + 3
            });
        } else if (windowWidth >= 768 && windowWidth < 1280) {
            setMoviesRenderScheme({
                ...moviesRenderScheme,
                totalAmountOfMovies: moviesRenderScheme.totalAmountOfMovies + 2
            });
        } else if (windowWidth <= 568) {
            setMoviesRenderScheme({
                ...moviesRenderScheme,
                totalAmountOfMovies: moviesRenderScheme.totalAmountOfMovies + 1
            });
        }
    }

    return (
        <section className="movies-elements" aria-label="Блок со списком фильмов">
            {isLoading ? (
            <Preloader />
            ) : (
                <>
                {movies.length > 0 ? (
                    <div className="movies-elements__container">
                    {movies.slice(0, moviesRenderScheme.totalAmountOfMovies).map((movie) => (
                        <MoviesCard
                            key={movie.id}
                            movieCard={movie}
                            isSaved={checkIsSaved(savedMovies, movie)}
                            onMovieSave={onMovieSave}
                            onMovieDelete={onMovieDelete}
                        />
                    ))}
                    </div>
                    ) : (
                    <p className="movies-elements__not-found">{isSucceeded ? "Ничего не найдено" : errorMessage}</p>
                )}
                    {movies.length > moviesRenderScheme.totalAmountOfMovies && (
                        <div className="movies-elements__button-container">
                        {location.pathname === '/movies' ? (
                            <button
                            className="movies-elements__button"
                            type="button"
                            onClick={onShowMoreClick}
                            >
                            Еще
                            </button>
                            ) : ''}
                        </div>)}
                    </> 
            )}
        </section>
    )
}

export default MoviesCardList;