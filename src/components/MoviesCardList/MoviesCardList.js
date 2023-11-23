import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies }) => {
    return (
        <section className="movies-elements" aria-label="Карточки с фильмами">
            {movies.map((movie) => (
                <MoviesCard
                    key={movie.id}
                    movieCard={movie}
                />
            ))}
        </section>
    )
}

export default MoviesCardList;