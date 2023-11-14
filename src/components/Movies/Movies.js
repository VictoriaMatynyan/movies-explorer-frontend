import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies } from '../../utils/movies';
import Footer from '../Footer/Footer';
import './Movies.css';

const Movies = ({ loggedIn }) => {
    const [moviesLoading, setMoviesLoading] = useState(false);
    
    function handleMoviesLoading() {
        setMoviesLoading(true);
    }

    const location = useLocation();

    return (
            loggedIn ? (
            <section className="movies">
            <SearchForm onClick={handleMoviesLoading} />
             { moviesLoading ? <Preloader /> : '' }
            <MoviesCardList movies={movies} />
            <div className="movies__button-container">
                {location.pathname === '/movies' ?
                    (<button
                    className="movies__button"
                    type="button"
                >
                    Еще
                </button>) : ''}
            </div>
            <Footer />
        </section> ) : null
    )
}

export default Movies;