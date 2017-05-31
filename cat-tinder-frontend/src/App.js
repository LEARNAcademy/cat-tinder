import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CatAdd from './components/CatAdd'
import UserAdd from './components/UserAdd'
import CatIndex from './components/CatIndex'
import UserLogin from './components/UserLogin'
import catStore from './stores/CatStore'
import userStore from './stores/UserStore'
import {updateCats} from './actions'

class App extends Component {
  constructor(props){
    super(props)
    updateCats()
    this.state = {
      message: catStore.getMessage()
    }
  }

  updateMessage(){
    this.setState({
      message: catStore.getMessage()
    })
  }

  updateUserMessage(){
    this.setState({
      message: userStore.getMessage()
    })
  }

  componentWillMount(){
    catStore.on('message', this.updateMessage.bind(this))
    userStore.on('message', this.updateUserMessage.bind(this))
  }

  render() {
    return (
      <div>
        <div className='message'>{this.state.message}</div>
        <Router>
          <div className="App container">
            <div className='navBar'>
              <div className="pull-right">
                <Link to="/">Home</Link> |
                <Link to="/add">Add Cat</Link> |
                <Link to="/register">Register</Link> |
                <Link to="/login">Login</Link>
              </div>
            </div>

            <Route exact path="/" component={CatIndex} />
            <Route exact path="/add" component={CatAdd} />
            <Route exact path="/register" component={UserAdd} />
            <Route exact path="/login" component={UserLogin} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
