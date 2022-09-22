import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function RegistrationForm( {loginRedirect} )
{
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState({login: "", password: ""})

  // set background color (much easer here than with css)
  document.body.style = 'background: antiquewhite;';

  function SignUp(e)
  {
    e.preventDefault();
    axios.post("https://api-sofomo.herokuapp.com/signup", {
      "login": details.login,
      "password": details.password,
    })
      .then(res => {
        setMessage(res.data.response);
      })
      .catch(err => {
        setMessage(err.response.data.response);
      })
  }


  return(
    <div className="formLoginSignup">
    <form onSubmit={SignUp}>
      <div>
        <h2>SignUp</h2>
        <div>{message}</div>
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
      <button type="submit">Submit</button>
    </form>
    <button onClick={loginRedirect}>Login</button>
    </div>
  )
}

export default RegistrationForm;
