import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
var socket = io('http://localhost:3000');  

class App extends Component {
  constructor(props){
    super(props);
    //const socket = openSocket('http://localhost:3000');

    this.subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));
  }

  state = {
    timestamp: ''
  }

  subscribeToTimer = (cb) => {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.timestamp.percent}
        </p>
      </div>
    );
  }
}

export default App;
