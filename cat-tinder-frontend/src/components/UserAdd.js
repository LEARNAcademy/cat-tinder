import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {addUser} from '../actions'

class UserAdd extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        city: '',
        state: ''
      },
      message: ''
    }
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
    addUser(this.state)
  }

  render(){
    return(
      <div>
        <div className="App-header">
          <h2>Register</h2>
          <div className="pull-right">
            <Link to="/">Back</Link>
          </div>
        </div>

        <form className='form' onSubmit={this.handleSubmit.bind(this)}>
          <div className='formGroup'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' id='username' value={this.state.user.username} onChange={this.handleChange.bind(this)}></input>
          </div>
          <div className='formGroup'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' id='email' value={this.state.user.email} onChange={this.handleChange.bind(this)}></input>
          </div>

          <div className='formGroup'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' value={this.state.user.password} onChange={this.handleChange.bind(this)}></input>
          </div>

          <div className='formGroup'>
          <label htmlFor='first_name'>First Name</label>
          <input type='text' name='first_name' id='first_name' value={this.state.user.first_name} onChange={this.handleChange.bind(this)}></input>
          </div>

          <div className='formGroup'>
          <label htmlFor='last_name'>Last Name</label>
          <input type='text' name='last_name' id='last_name' value={this.state.user.last_name} onChange={this.handleChange.bind(this)}></input>
          </div>

          <div className='formGroup'>
          <label htmlFor='city'>City</label>
          <input type='text' name='city' id='city' value={this.state.user.city} onChange={this.handleChange.bind(this)}></input>
          </div>

          <div className='formGroup'>
          <label htmlFor='state'>State</label>
          <input type='text' name='state' id='state' value={this.state.user.state} onChange={this.handleChange.bind(this)}></input>
          </div>


          <div className='formGroup'>
            <input type='submit' value='Save' className='btn btn-primary'></input>
          </div>
        </form>
      </div>
    )
  }
}
export default UserAdd;
