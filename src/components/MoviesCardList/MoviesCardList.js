import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useMoviesRender } from '../../hooks/useMoviesRender';
import { ZERO } from '../../utils/cardsConfig';
import { DESKTOP_SCREEN_RESOLUTION } from '../../utils/windowWidthConstants';
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
        return location.pathname === '/movies' ? savedMovies.find((savedMovie) => savedMovie.movieId === movie.id) : false;
    }

    const onShowMoreClick = () => {
        if (location.pathname === '/movies') {
            const windowWidth = window.innerWidth;
        if (windowWidth >= DESKTOP_SCREEN_RESOLUTION) {
            setMoviesRenderScheme({
                ...moviesRenderScheme,
                totalAmountOfMovies: moviesRenderScheme.totalAmountOfMovies + 3
            });
        } else if (windowWidth < DESKTOP_SCREEN_RESOLUTION) {
            setMoviesRenderScheme({
                ...moviesRenderScheme,
                totalAmountOfMovies: moviesRenderScheme.totalAmountOfMovies + 2
            });
        }
        }
        
    }

    return (
        <section className="movies-elements" aria-label="Блок со списком фильмов">
            {isLoading ? (
            <Preloader />
            ) : (
                <>
                {movies.length > ZERO ? (
                    <div className="movies-elements__container">
                    {location.pathname === '/movies' ? (
                     movies.slice(0, moviesRenderScheme.totalAmountOfMovies).map((movie) => (
                        <MoviesCard
                            key={movie.id || movie._id}
                            movieCard={movie}
                            isSaved={checkIsSaved(savedMovies, movie)}
                            onMovieSave={onMovieSave}
                            onMovieDelete={onMovieDelete}
                            savedMovies={savedMovies}
                        />
                        ))
                        ) : (
                        movies.map((movie) => (
                            <MoviesCard
                            key={movie.id || movie._id}
                            movieCard={movie}
                            isSaved={checkIsSaved(savedMovies, movie)}
                            onMovieSave={onMovieSave}
                            onMovieDelete={onMovieDelete}
                            savedMovies={savedMovies}
                        />
                        ))
                    )}
                    </div>
                    ) : (
                        <p className="movies-elements__not-found">{isSucceeded ? "Ничего не найдено" : errorMessage}</p>
                    )}
                    {location.pathname === '/movies' && movies.length > moviesRenderScheme.totalAmountOfMovies && (
                        <div className="movies-elements__button-container">
                            <button
                            className="movies-elements__button"
                            type="button"
                            onClick={onShowMoreClick}
                            >
                            Еще
                            </button>
                        </div>
                        )}
                    </> 
                )}
        </section>
    )
}

export default MoviesCardList;