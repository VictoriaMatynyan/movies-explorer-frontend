import React, { useState } from "react";
import { savedMovies } from '../../utils/movies';
import Header from "../Header/Header";
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
                <Header loggedIn={loggedIn}  />
                <div className="saved-movies__container">
                <SearchForm onClick={handleMoviesLoading} />
                { moviesLoading ? <Preloader /> : '' }
                <MoviesCardList movies={savedMovies.slice(0, 3)} />
                </div>
            <Footer />
        </section>
        ) : null
    )
}

export default SavedMovies;