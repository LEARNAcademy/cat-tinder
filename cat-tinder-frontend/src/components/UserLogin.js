import React, { Component } from 'react';
import {loginUser} from '../actions'
import userStore from '../stores/UserStore'

class UserLogin extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        email: "",
        password: ""
      }
    }
  }

  handleLogin(){
    this.props.history.push("/")
  }

  componentWillMount(){
    userStore.on('login', this.handleLogin.bind(this))
  }


  handleChange(e){
    let target = e.target
    let user = this.state.user
    user[target.name] = target.value
    this.setState({
      user: user
    })
  }

  handleSubmit(e){
    e.preventDefault()
    loginUser(this.state)
  }

  render(){
    return(
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='formGroup'>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' value={this.state.user.username} onChange={this.handleChange.bind(this)}></input>
        </div>
        <div className='formGroup'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' value={this.state.user.password} onChange={this.handleChange.bind(this)}></input>
        </div>
        <div className='formGroup'>
          <input type='submit' value='Save' className='btn btn-primary'></input>
        </div>

        </form>
      </div>
    )
  }
}

export default UserLogin;
