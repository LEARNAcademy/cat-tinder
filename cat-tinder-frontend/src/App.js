import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      cat: {
        color: '',
        breed: '',
        gender: '',
        habitat: '',
        personality: '',
        age: 1
      },
      message: ''
    }
  }
  handleChange(e){
    let target = e.target
    this.state.cat[target.name] = target.value
    this.setState({
      cat: this.state.cat
    })
  }

  handleSubmit(e){
    // submit the state to localhost:4000/create_cat as a post
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    }
    fetch('http://localhost:4000/create_cat', params).then((response)=>{
      if(response.ok){
        this.setState({
          message: "hurray!"
        })
        // response.json().then((body)=>{
        //   updateUser(body.user)
        // })
      }else{
        this.setState({
          message: "awwwww"
        })
        // response.json().then((body)=>{
        //   registrationFail(body.errors)
        // })
      }
    })
    e.preventDefault()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Add A Cat</h2>
        </div>
        {this.state.message}

        <form className='form' onSubmit={this.handleSubmit.bind(this)}>
          <div className='formGroup'>
            <label htmlFor='color'>Color</label>
            <input type='text' name='color' id='color' value={this.state.cat.color} onChange={this.handleChange.bind(this)}></input>
          </div>
          <div className='formGroup'>
          <label htmlFor='breed'>Breed</label>
          <input type='text' name='breed' id='breed' value={this.state.cat.breed} onChange={this.handleChange.bind(this)}></input>
          </div>
          <div className='formGroup'>
            <label htmlFor='gender'>Gender</label>
            <select name='gender' id='gender' value={this.state.cat.gender} onChange={this.handleChange.bind(this)}>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>
          <div className='formGroup'>
            <label htmlFor='habitat'>Habitat</label>
            <select name='habitat' id='habitat' value={this.state.cat.habitat} onChange={this.handleChange.bind(this)}>
              <option>Indoor</option>
              <option>Outdoor</option>
              <option>Feral</option>
            </select>
          </div>
          <div className='formGroup'>
            <label htmlFor='personality'>Personality</label>
            <input type='text' name='personality' id='personality' value={this.state.cat.personality} onChange={this.handleChange.bind(this)}></input>
          </div>
          <div className='formGroup'>
            <label htmlFor='age'>Age</label>
            <input type='number' name='age' id='age' value={this.state.cat.age} onChange={this.handleChange.bind(this)}></input>
          </div>
          <div className='formGroup'>
            <input type='submit' value='Save' className='btn btn-primary'></input>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
