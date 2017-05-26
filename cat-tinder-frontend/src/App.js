import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CatAdd from './components/CatAdd'
import CatIndex from './components/CatIndex'
class App extends Component {


  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={CatIndex} />
          <Route exact path="/add" component={CatAdd} />
        </div>
      </Router>
    );
  }
}

export default App;
