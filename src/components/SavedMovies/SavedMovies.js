import React, { useState } from "react";
import { savedMovies } from '../../utils/movies';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import "./SavedMovies.css";

const SavedMovies = ({ loggedIn }) => {
    const [moviesLoading, setMoviesLoading] = useState(false);
    
    function handleMoviesLoading() {
        setMoviesLoading(true);
    }

    return (
        loggedIn ? (
            <section className="saved-movies">
            <SearchForm onClick={handleMoviesLoading} />
            { moviesLoading ? <Preloader /> : '' }
            <MoviesCardList movies={savedMovies} />
            <Footer />
        </section>
        ) : null
    )
}

export default SavedMovies;