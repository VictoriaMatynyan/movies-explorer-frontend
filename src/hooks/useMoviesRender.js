// кастомный хук для настройки отображения карточек с фильмами
import { useState, useEffect } from 'react';

export const useMoviesRender = () => {
    // создаём объект с параметрами отображения карточек (изначально блок результатов пустой)
    const [moviesRenderScheme, setMoviesRenderScheme] = useState({
        moviesPerRow: 0,
        numberOfRows: 0,
        totalAmountOfMovies: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            // определяем ширину окна браузера (включая панель скролла)
            const windowWidth = window.innerWidth;
            if (windowWidth >= 897) {
                // задаем значения параметров отображения карточек
                setMoviesRenderScheme({
                    moviesPerRow: 3,
                    numberOfRows: 4,
                    totalAmountOfMovies: 12,
                });
            } else if (windowWidth <= 896 && windowWidth >= 568) {
                setMoviesRenderScheme({
                    moviesPerRow: 2,
                    numberOfRows: 4,
                    totalAmountOfMovies: 8,
                });
            } else if (windowWidth <= 567) {
                setMoviesRenderScheme({
                    moviesPerRow: 1,
                    numberOfRows: 5,
                    totalAmountOfMovies: 5,
                });
            }
        };
        handleResize();

        // добавляем обработчик события resize для обновления параметров отображения карточек
        // внутри обработчика определяется ширина экрана и в зависимости от неё устанавливаются параметры для карточек
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // возвращаем объект с параметрами отображения карточек
    return {moviesRenderScheme, setMoviesRenderScheme};
}