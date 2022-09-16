import React, { useState, Component } from 'react';
import LoginForm from './components/LoginForm';
import MainForm from './components/MainForm';

function App() {
  const [error, setError] = useState("");
  const [page, setPage] = useState("login");
  const [token, setToken] = useState("");

  async function Login(details) {
    // encoding algorithm
    let base64 = require('base-64');
    // sending request
    let response = await fetch("http://192.168.0.34:5000/login", {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + base64.encode(details.login + ":" + details.password),
      },
    }).then(response => response.json());
    if (response.response == "")
      {
        setToken(response.token);
        // redirect
        setPage("main");
      }
    else {
      setError(response.response);
    }
  };

  async function RequestLocationsData()
  {
    let isLoaded = false;
    let response = await fetch("http://192.168.0.34:5000/location",
    {
      method: 'GET',
      headers: {'x-access-token': token,},
    }).then(response => response.json()).then(isLoaded=true);
    console.log({response, isLoaded})
    return {response, isLoaded};
  }

  const Logout = details => {
    console.log("logout");
  }

  return (
    <div className="App">
    {(page == "login") ?
    (<LoginForm Login={Login} error={error}/>)
    : (page == "main") ?
    (<MainForm token={token}/>)
    : <div></div>}
    </div>
  );
}

export default App;
