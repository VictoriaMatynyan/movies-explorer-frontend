import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
  //создаём стейт для проверки пользователя на авторизацию
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  function handleSignUp() {
    navigate('/signin', { replace: true });
  }

  function handleSignIn() {
    setLoggedIn(true);
    navigate('/', { replace: true });
  }

  function handleSignOut() {
    setLoggedIn(false);
    navigate('/', { replace: true });
  }

  return (
    <div className="page">
      <div className="page__container">
      <Header loggedIn={loggedIn}  />
      <Main />
      <Footer />
      </div>
    </div>
  );
}

export default App;
