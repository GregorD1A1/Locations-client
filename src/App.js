import React, { useState, Component } from 'react';

class App extends Component {
  const userData = {
    login: 'dzik',
    password: 'okon',
  }

  const [user, setUser] = useState({name: "", login: "e"});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);
  }

  const Logout = details => {
    console.log("logout");
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount()  {
    fetch('https://v2.jokeapi.dev/joke/Any')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json,
          isLoaded: true,
        })
      });
  }

  render() {
    (user.login != "") ? (
      <div className="welcome">
        <h2>Welcome {user.name}
      </div>
    )

    var { isLoaded, items } = this.state;

    if (!isLoaded){
      return <div>Loading data</div>;
    }
    else {
      return (
        <div className="App">
          Start: {items.setup}
          {items.delivery}
        </div>
    );
    }

  };
}

export default App;
