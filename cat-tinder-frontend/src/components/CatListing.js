import React, { Component } from 'react';

class CatListing extends Component {
  render(){
    return(
      <div className="col-xs-3">
        <ul>
          <li>
            <img src={this.props.cat.imageUrl} className='cat-image'></img>
          </li>
          <li>
            {this.props.cat.color}
          </li>
          <li>
            {this.props.cat.breed}
          </li>
          <li>
            {this.props.cat.gender}
          </li>
          <li>
            {this.props.cat.habitat}
          </li>
          <li>
            {this.props.cat.personality}
          </li>
          <li>
            {this.props.cat.age}
          </li>
        </ul>
      </div>
    )
  }
}

export default CatListing;
