import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import './App.css';

function App() {
  //создаём стейт для проверки пользователя на авторизацию
  const [loggedIn, setLoggedIn] = useState(true); // false

  const navigate = useNavigate();

  function handleSignUp() {
    navigate('/signin', { replace: true });
  }

  function handleSignIn() {
    setLoggedIn(true);
    navigate('/', { replace: true });
  }

  return (
    <div className="page">
      <div className="page__container">
      <Routes>
      <Route
        path="/"
        element={<Main loggedIn={loggedIn} />}
      />
      <Route
        path="/movies"
        element={<Movies
          loggedIn={loggedIn} />}
      />
      <Route
        path="/saved-movies"
        element={<SavedMovies loggedIn={loggedIn} />}
      />
      <Route
        path="/profile"
        element={<Profile loggedIn={loggedIn} />}
      />
      <Route
        path="/signup"
        element={<Register onFormSubmit={handleSignUp} />}
      />
      <Route
        path="/signin"
        element={<Login onFormSubmit={handleSignIn} />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
      </Routes>
      </div>
    </div>
  );
}

export default App;
