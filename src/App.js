import React, { Component } from 'react';
import Header from './components/Header';
import Newsfeeds from './components/Newsfeeds';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Newsfeeds/>
      </div>
    );
  }
}

export default App;
