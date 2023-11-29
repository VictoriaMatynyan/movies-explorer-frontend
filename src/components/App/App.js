import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
  // // создаём стейт для чекбокса
  // const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  // стейт для сохранения фильмов
  const [isSaved, setIsSaved] = useState(false);
  // стейт для серверных ошибок
  const [errorMessage, setErrorMessage] = useState('');
  // стейт для индикаторов загрузки запросов, в т.ч. фильмов
  const [isLoading, setIsLoading] = useState(false);
  // стейт для статусов запросов
  const [isSucceeded, setIsSucceeded] = useState(false);
  
  const navigate = useNavigate();

  // useEffect(() => {
  //   loggedIn &&
  //   mainApi.getUserInfo()
  //   .then((userData) => {
  //     setCurrentUser(userData);
  //   })
  //   .catch((err) => {
  //     console.log(`Ошибка хука на выдачу данных: ${err}`);
  //   });
  // }, [loggedIn]);
  useEffect(() => {
    loggedIn &&
    Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
    .then(([userData, savedMoviesData]) => {
      setCurrentUser(userData);
      setSavedMovies(savedMoviesData);
      // сохраняем в localStorage фильмы
      localStorage.setItem('savedMovies', JSON.stringify(savedMoviesData));
    })
    .catch((err) => {
      console.log(`Ошибка хука на выдачу данных: ${err}`);
    });
  }, [loggedIn]);

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
  const handleSearchAndFindMovies = async () => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const data = await moviesApi.getMovies();
      setMovies(data);
    } catch(err) {
      console.log(`Ошибка получения фильмов: ${err}`);
      setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  const handleFilterMovies = () => {
    
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
            movies={movies}
            onSearchSubmit={handleSearchAndFindMovies}
            onMovieSave
            onMovieDelete
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
            loggedIn={loggedIn} />
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
