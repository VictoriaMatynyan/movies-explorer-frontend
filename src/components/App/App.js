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
  //создаём стейт для проверки пользователя на авторизацию
  const [loggedIn, setLoggedIn] = useState(false);
  // создаём стейт для изменения данных пользователя
  const [currentUser, setCurrentUser] = useState({});
  // создаём пустой массив для всех фильмов с сервера и для сохранённых фильмов
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    loggedIn &&
    mainApi.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData);
      // сохранить в localStorage фильмы
    })
    .catch((err) => {
      console.log(`Ошибка хука на выдачу данных: ${err}`);
    });
  }, [loggedIn]);
  // useEffect(() => {
  //   loggedIn &&
  //   Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
  //   .then(([userData, savedMoviesData]) => {
  //     setCurrentUser(userData);
      
  //     setSavedMovies(savedMoviesData);
  //     // сохранить в localStorage фильмы
  //   })
  //   .catch((err) => {
  //     console.log(`Ошибка хука на выдачу данных: ${err}`);
  //   });
  // }, [loggedIn]);

  const handleRegistration = async (name, email, password) => {
    try {
      if (!name || !email || !password) {
        return;
      }
      const data = await mainApi.register(name, email, password);
      if (data) {
        navigate('/movies', { replace: true });
      }
    } catch(err) {
        console.log(`Ошибка регистрации: ${err}`);
      }
  };

  const handleSignIn = async(email, password) => {
    if (!email || !password) {
      return;
    }
    try {
      const data = await mainApi.login(email, password);
      if (data.message) {
        setLoggedIn(true);
        // setCurrentUser(data);
        navigate('/movies', { replace: true });
      }
    }
    catch (err) {
      console.log(`Ошибка авторизации: ${err}`);
    }
  };

  // const handleLogOut = () => {
  //   mainApi.logout()
  //   .then(() => {
  //     setLoggedIn(false);
  //     // setCurrentUser({});
  //     navigate('/', {replace: true});
  //   })
  //   .catch((err) => {
  //     console.log(`Ошибка при выходе из системы: ${err}`);
  //   })
  // }
  const handleLogOut = async () => {
    try {
      await mainApi.logout();
      setLoggedIn(false);
      setCurrentUser({});
      navigate('/', {replace: true});
    }
    catch (err) {
      console.log(`Ошибка при выходе из системы: ${err}`);
    }
  }

  const handleUpdateUser = async ({name, email}) => {
    try {
      const data = await mainApi.editUserInfo({name, email});
      setCurrentUser(data);
    } catch(err)  {
      console.log(`Ошибка загрузки данных пользователя: ${err}`);
    }
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
            loggedIn={loggedIn} />
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
            onLogOut={handleLogOut} />
          }
        />
        <Route
          path="/signup"
          element={<Register onRegiser={handleRegistration} />}
        />
        <Route
          path="/signin"
          element={<Login onLogin={handleSignIn} />}
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
