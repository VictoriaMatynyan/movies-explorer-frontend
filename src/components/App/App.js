import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// импортируем компоненты
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { BEATFILM_BASE_URL } from '../../utils/urls';
// импортируем все API
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';

import './App.css';

function App() {
  // стейт для проверки пользователя на авторизацию
  const [loggedIn, setLoggedIn] = useState(false);
  // стейт для изменения данных пользователя
  const [currentUser, setCurrentUser] = useState({});
  // пустой массив для всех фильмов с сервера и для сохранённых фильмов
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  // стейт для серверных ошибок
  const [errorMessage, setErrorMessage] = useState('');
  // стейт для индикаторов загрузки запросов, в т.ч. фильмов
  const [isLoading, setIsLoading] = useState(false);
  // стейт для статусов запросов
  const [isSucceeded, setIsSucceeded] = useState(false);

  const location = useLocation();
  
  const navigate = useNavigate();

  const checkToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            // остаёмся в профиле после перезагрузки страницы на Localhost:3000
            localStorage.setItem('loggedIn', 'true');
          }
        })
        .catch((err) => {
          console.log(`Ошибка проверки токена: ${err}`);
        });
    }
  }, []);

  useEffect(() => {
    checkToken();
    loggedIn &&
    Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
    .then(([userData, savedMoviesData]) => {
      setLoggedIn(true);
      setCurrentUser(userData);
      setSavedMovies(savedMoviesData);
      localStorage.setItem('savedMovies', JSON.stringify(savedMoviesData));
    })
    .catch((err) => {
      console.log(`Ошибка хука на выдачу данных: ${err}`);
    });
  }, [loggedIn, checkToken]);

  // помещаем фильмы в savedMovies
  useEffect(() => {
    const savedMoviesData = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMoviesData && location.pathname === '/saved-movies') {
      setSavedMovies(savedMoviesData);
    }
  }, [location.pathname]);

  const handleRegistration = async (name, email, password) => {
    setErrorMessage('');
    try {
      if (!name || !email || !password) {
        return;
      }
      setIsLoading(true); // устанавливаем состояние isLoading в true при отправке данных на сервер
      const data = await mainApi.register(name, email, password);
      if (data) {
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      }
    } catch(err) {
        console.log(`Ошибка регистрации: ${err}`);
        setErrorMessage('Пожалуйста, убедитесь, что регистрируетесь впервые, или введите новые данные');
      } finally {
        setIsLoading(false);
      }
  };

  const handleSignIn = async(email, password) => {
    setErrorMessage('');
    if (!email || !password) {
      return;
    }
    setIsLoading(true); 
    try {
      const data = await mainApi.login(email, password);
      if (data.message) {
        setLoggedIn(true);
        localStorage.setItem('token', 'true');
        navigate('/movies', { replace: true });
      }
    } catch (err) {
      console.log(`Ошибка авторизации: ${err}`);
      setErrorMessage('Пожалуйста, введите корректные данные или зарегистрируйтесь');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await mainApi.logout();
      localStorage.clear();
      setLoggedIn(false);
      setCurrentUser({});
      navigate('/', {replace: true});
    } catch (err) {
      console.log(`Ошибка при выходе из системы: ${err}`);
    }
  }

  const handleUpdateUser = async ({name, email}) => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const data = await mainApi.editUserInfo({name, email});
      setCurrentUser(data);
    } catch(err)  {
      console.log(`Ошибка загрузки данных пользователя: ${err}`);
      setErrorMessage('Пользователь с указанными данными уже существует');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  // получаем доступ ко всем фильмам
  const handleSearchAllMovies = async (movieSearchQuery) => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      if (!JSON.parse(localStorage.getItem('allMoviesGallery'))) {
        const allMoviesGallery = await moviesApi.getMovies();
        localStorage.setItem('allMoviesGallery', JSON.stringify(allMoviesGallery));
      }
      localStorage.setItem('movieSearchQuery', movieSearchQuery);
      // убираем зависимость от регистра и лишние пробелы
      const movieQuery = movieSearchQuery.toLowerCase().trim();
      const foundMovies = JSON.parse(localStorage.getItem('allMoviesGallery')).filter((movie) => {
        const movieNameRUToLowerCase = movie.nameRU.toLowerCase().trim();
        const movieNameENToLowerCase = movie.nameEN.toLowerCase().trim();
        return (
          movieNameRUToLowerCase.includes(movieQuery.toLowerCase().trim()) ||
          movieNameENToLowerCase.includes(movieQuery.toLowerCase().trim())
        )
      })
      localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
      setFoundMovies(foundMovies);
      const checkboxState = localStorage.getItem('checkboxState');
      if (checkboxState === 'true') {
        const filteredFoundMovies = foundMovies.filter((movie) => movie.duration <= 40);
        setMovies(filteredFoundMovies);
      } else {
        setMovies(foundMovies);
      }
      setIsSucceeded(true);
    } catch(err) {
      console.log(`Ошибка получения фильмов: ${err}`);
      setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      setIsSucceeded(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  const handleFilterMovies = (isChecked) => {
    localStorage.setItem('checkboxState', JSON.stringify(isChecked));
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const filteredFoundMovies = isChecked ? foundMovies.filter((movie) => movie.duration <= 40) : foundMovies;
    setMovies(filteredFoundMovies);
  }

  const handleSearchSavedMovies = (movieQuery) => {
    setIsLoading(true);
    const savedMoviesFromLocalStorage = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMoviesFromLocalStorage && savedMoviesFromLocalStorage.length > 0) {
      const foundSavedMovies = savedMoviesFromLocalStorage.filter((savedMovie) => {
        // убираем зависимость от регистра и лишние пробелы
        const movieNameRUToLowerCase = savedMovie.nameRU.toLowerCase().trim();
        const movieNameENToLowerCase = savedMovie.nameEN.toLowerCase().trim();
        return (
          movieNameRUToLowerCase.includes(movieQuery.toLowerCase().trim()) ||
          movieNameENToLowerCase.includes(movieQuery.toLowerCase().trim())
        )
      })
      setSavedMovies(foundSavedMovies);
      const checkboxState = localStorage.getItem('checkboxState');
      if (checkboxState === 'true') {
        const filteredFoundSavedMovies = foundSavedMovies.filter((movie) => movie.duration <= 40);
        localStorage.setItem('movies', JSON.stringify(filteredFoundSavedMovies));
        setSavedMovies(filteredFoundSavedMovies);
      } else {
        setSavedMovies(foundSavedMovies);
      }
    }
    setIsSucceeded(true);
    setIsLoading(false);
  }

  const handleFilterSavedMovies = (isChecked) => {
    localStorage.setItem('checkboxState', JSON.stringify(isChecked));
    const savedMoviesFromLocalStorage = JSON.parse(localStorage.getItem('savedMovies'));
    const filteredSavedMovies = isChecked ? savedMoviesFromLocalStorage.filter((movie) => movie.duration <= 40) : savedMoviesFromLocalStorage;
    setSavedMovies(filteredSavedMovies);
  }

    const handleSaveMovie = async (movie) => {
      try {
          const isSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
          if (!isSaved) {
            const savedMovie = await mainApi.addMovie({
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
              country: movie.country,
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: `${BEATFILM_BASE_URL}${movie.image.url}`,
              trailerLink: movie.trailerLink,
              thumbnail: `${BEATFILM_BASE_URL}${movie.image.formats.thumbnail.url}`,
              movieId: movie.id
            });
            const savedMoviesList = [...savedMovies, savedMovie];
            setSavedMovies(savedMoviesList);
            localStorage.setItem('savedMovies', JSON.stringify(savedMoviesList));
          }
        } catch (err) {
          console.log(`Ошибка сохранения фильма: ${err}`);
        }
    }

 
  const handleDeleteMovie = async (movieId) => {
    try {
      await mainApi.deleteMovie(movieId);
      // создаём новый массив сохранённых фильмов за исключением фильма с переданным movieId
      const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== movieId);
      localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
      setSavedMovies(updatedSavedMovies);
    } catch (err) {
      console.log(`Ошибка удаления фильма: ${err}`);
    }
  }

  function handleCleanServerError() {
    setErrorMessage('');
  }

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
        <Routes>
        <Route
          path="/"
          element={<Main loggedIn={loggedIn} />}
        />
        <Route
          path="/movies"
          element={<ProtectedRouteElement
            element={Movies}
            loggedIn={loggedIn}
            movies={foundMovies}
            onSearchSubmit={handleSearchAllMovies}
            onMovieSave={handleSaveMovie}
            onMovieDelete={handleDeleteMovie}
            savedMovies={savedMovies}
            isLoading={isLoading}
            isSucceeded={isSucceeded}
            errorMessage={errorMessage}
            onCheckboxFilter={handleFilterMovies} />
          }
        />
        <Route
          path="/saved-movies"
          element={<ProtectedRouteElement
            element={SavedMovies}
            loggedIn={loggedIn}
            movies={savedMovies}
            onSearchSubmit={handleSearchSavedMovies}
            onMovieDelete={handleDeleteMovie}
            isLoading={isLoading}
            isSucceeded={isSucceeded}
            errorMessage={errorMessage}
            onCheckboxFilter={handleFilterSavedMovies} />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement
            element={Profile}
            loggedIn={loggedIn}
            handleUpdateUser={handleUpdateUser}
            onLogOut={handleLogOut}
            errorMessage={errorMessage}
            onCleanError={handleCleanServerError}
            isLoading={isLoading} />
          }
        />
        <Route
          path="/signup"
          element={<Register
            onRegiser={handleRegistration}
            errorMessage={errorMessage}
            onCleanError={handleCleanServerError}
            isLoading={isLoading} />}
        />
        <Route
          path="/signin"
          element={<Login
            onLogin={handleSignIn}
            errorMessage={errorMessage}
            onCleanError={handleCleanServerError}
            isLoading={isLoading} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
        </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
    </>
  );
}

export default App;
