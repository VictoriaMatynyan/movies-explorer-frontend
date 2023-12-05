// кастомный хук для настройки отображения карточек с фильмами
import { useState, useEffect, useCallback } from 'react';
import {
    ZERO,
    ONE_CARD,
    TWO_CARDS,
    THREE_CARDS,
    ROWS_NUMBER_FOR_DESKTOP_AND_TABLET,
    ROWS_NUMBER_FOR_MOBILE,
    TOTAL_CARDS_NUMBER_FOR_DESKTOP,
    TOTAL_CARDS_NUMBER_FOR_TABLET,
    TOTAL_CARDS_NUMBER_FOR_MOBILE,
} from '../utils/cardsConfig';
import { DESKTOP_SCREEN_RESOLUTION, TABLET_SCREEN_RESOLUTION } from '../utils/windowWidthConstants';

export const useMoviesRender = () => {
    // создаём объект с параметрами отображения карточек (изначально блок результатов пустой)
    const [moviesRenderScheme, setMoviesRenderScheme] = useState({
        moviesPerRow: ZERO,
        numberOfRows: ZERO,
        totalAmountOfMovies: ZERO,
    });
    // переместила handleResize из useEffect, чтобы не ререндерить компонент при изменении размера окна,
    // и обернула в useCallback, что не требует установки setTimeout
    const handleResize = useCallback(() => {
        // определяем ширину окна браузера (включая панель скролла)
        const windowWidth = window.innerWidth;
        if (windowWidth >= DESKTOP_SCREEN_RESOLUTION) {
            // задаем значения параметров отображения карточек
            setMoviesRenderScheme((prev) => ({
                ...prev,
                moviesPerRow: THREE_CARDS,
                numberOfRows: ROWS_NUMBER_FOR_DESKTOP_AND_TABLET,
                totalAmountOfMovies: TOTAL_CARDS_NUMBER_FOR_DESKTOP,
            }));
            } else if (windowWidth < DESKTOP_SCREEN_RESOLUTION && windowWidth >= TABLET_SCREEN_RESOLUTION) {
            setMoviesRenderScheme((prev) => ({
                ...prev,
                moviesPerRow: TWO_CARDS,
                numberOfRows: ROWS_NUMBER_FOR_DESKTOP_AND_TABLET,
                totalAmountOfMovies: TOTAL_CARDS_NUMBER_FOR_TABLET,
            }));
            } else if (windowWidth < TABLET_SCREEN_RESOLUTION) {
            setMoviesRenderScheme((prev) => ({
                ...prev,
                moviesPerRow: ONE_CARD,
                numberOfRows: ROWS_NUMBER_FOR_MOBILE,
                totalAmountOfMovies: TOTAL_CARDS_NUMBER_FOR_MOBILE,
            }));
        }
    }, []);

    useEffect(() => {    
        handleResize();
        // добавляем обработчик события resize для обновления параметров отображения карточек
        // внутри обработчика определяется ширина экрана и в зависимости от неё устанавливаются параметры для карточек
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    // возвращаем объект с параметрами отображения карточек
    return {moviesRenderScheme, setMoviesRenderScheme};
}