import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

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

  // function handleSignOut() {
  //   setLoggedIn(false);
  //   navigate('/', { replace: true });
  // }

  return (
    <div className="page">
      <div className="page__container">
      <Header loggedIn={loggedIn}  />
      <Routes>
      <Route
        path="/"
        element={<Main />}
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
        element={<Profile />}
      />
      </Routes>
      </div>
    </div>
  );
}

export default App;
