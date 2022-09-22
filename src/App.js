import React, { useState, Component } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import MainForm from './components/MainForm';

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState("");

  const signupRedirect = () =>
  {
    setPage("signUp");
  }

  const loginRedirect = () =>
  {
    setPage("login");
  }

  const mainPageRedirect = () =>
  {
    setPage("main");
  }

  return (
    <div className="App">
    {(page == "login") ?
    (<LoginForm setToken={setToken} mainPageRedirect={mainPageRedirect} signupRedirect={signupRedirect}/>)
    : (page == "main") ?
    (<MainForm token={token} loginRedirect={loginRedirect}/>)
    : (page == "signUp") ?
    (<RegistrationForm loginRedirect={loginRedirect}/>)
    : <div></div>}
    </div>
  );
}

export default App;
