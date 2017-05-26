import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import CatListing from './CatListing'
class CatIndex extends Component {
  constructor(props){
    super(props)
    this.state = {
      cats: [
        // {
        //   color: 'blue',
        //   breed: 'siamiese',
        //   gender: 'Male',
        //   habitat: 'Outdoor',
        //   personality: 'smug',
        //   age: '8'
        // },
        // {
        //   color: 'green',
        //   breed: 'minx',
        //   gender: 'Male',
        //   habitat: 'Outdoor',
        //   personality: 'smart',
        //   age: '4'
        // }
      ]
    }
  }

  componentWillMount(){
    let catIndexState = this
    const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }
    fetch("http://localhost:4000/cats", params).then(function(response){
      if(response.status === 200){
        response.json().then(function(body){
          catIndexState.setState({
            cats: body.cats
          })
        })
      }
    }).catch(function(error){
      catIndexState.setState({
        message: 'there was an error: ' + error.message
      })
    })


  }

  renderCats(){
    let catRender = []
    for(var i=0; i<this.state.cats.length; i++){
      let catId = "cat-" + i
      catRender.push(
        <CatListing key={catId} cat={this.state.cats[i]}></CatListing>
      )
    }
    return catRender
  }

  render(){
    return(
      <div>
        <div className="App-header">
          <h2>Cat List</h2>
          <div className="pull-right">
            <Link to="/add">Add</Link>
          </div>
        </div>
        <div className="cat-list row">
          {this.renderCats()}
        </div>
      </div>
    )
  }
}
export default CatIndex;
