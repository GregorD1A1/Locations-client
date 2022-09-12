import React, { Component } from 'react';

class App extends Component {

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
