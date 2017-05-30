import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CatAdd from './components/CatAdd'
import CatIndex from './components/CatIndex'
import {updateCats} from './actions'

class App extends Component {
  constructor(props){
    super(props)
    updateCats()
  }

  render() {
    return (
      <Router>
        <div className="App container">
          <Route exact path="/" component={CatIndex} />
          <Route exact path="/add" component={CatAdd} />
        </div>
      </Router>
    );
  }
}

export default App;
