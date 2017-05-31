import React, { Component } from 'react';
import CatListing from './CatListing'
import catStore from '../stores/CatStore'

class CatIndex extends Component {
  constructor(props){
    super(props)
    this.state = {
      cats: catStore.getCats()
    }
  }

  updateCats(){
    this.setState({
      cats: catStore.getCats()
    })
  }

  componentWillMount(){
    catStore.on('change', this.updateCats.bind(this))
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
        </div>
        <div className="cat-list row">
          {this.renderCats()}
        </div>
      </div>
    )
  }
}
export default CatIndex;
