import React, { useState } from 'react'
import './App.css'

function LoginForm( {setToken, mainPageRedirect, signupRedirect} )
{
  const [details, setDetails] = useState({login: "", password: ""})
  const [error, setError] = useState("");

  document.body.style = 'background: antiquewhite;';

  async function Login(details) {
    // encoding algorithm
    let base64 = require('base-64');
    // sending request
    let response = await fetch("https://api-sofomo.herokuapp.com/login", {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + base64.encode(details.login + ":" + details.password),
      },
    }).then(response => response.json());
    if (response.response == "")
      {
        setToken(response.token);
        mainPageRedirect();
      }
    else {
      setError(response.response);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  }

  return(
    <div className="formLoginSignup">
    <form onSubmit={submitHandler}>
      <div>
        <h2>Login</h2>
        {(error != "") ? (<div className="error">{error}</div>) : ""}
        <div className="form-group">
          <label htmlFor="login">Login:</label>
          {/* Name is defaultvalue, written in the field */}
          <input type="text" name="login" id="login" onChange={e => setDetails(
            {...details, login: e.target.value})} placeholder="login"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={e => setDetails(
            {...details, password: e.target.value})} placeholder="password"/>
        </div>
      </div>
      <button type="submit" value="LOGIN">Submit</button>
    </form>
    <button onClick={signupRedirect}>SignUp</button>
    </div>
  )
}

export default LoginForm;
