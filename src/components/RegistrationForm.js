import React, { useState } from 'react'

function RegistrationForm( {Login, error} )
{
  const [details, setDetails] = useState({login: "", password: ""})

  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  }

  async function signup()
  {
    let result = await fetch("http://192.168.0.34:5000/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
      },
      body: JSON.stringify({
        "login": "uzytkownik2",
        "password": "byk123"
      })
    });
    result = await result.json();
    console.log(result);
  }

  function SignUp(e)
  {
    e.preventDefault(); {/*czy potrzebne?*/}
    useEffect(() => {
      axios.post("http://192.168.0.34:5000/signup", body: JSON.stringify({
        "login": "uzytkownik2",
        "password": "byk123"
      }))
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }, [])
  }

  return(
    <div>
    <form onSubmit={SignUp}>
      <div className="form-inner">
        <h2>SignUp</h2>
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
      <button type="submit">Submit</button>
    </form>
    <button>Login</button>
    </div>
  )
}

export default LoginForm;
