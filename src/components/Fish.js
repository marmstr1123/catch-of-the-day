import React from 'react';
import {formatPrice} from '../helpers'

class Fish extends React.Component{
   render(){
      ////i could make it cleaner with a bit of data message loadSamples
      // const deets = this.props.details          then use deets.<<attribute>>
      ////Or i could destructure it
      // const {details} = this.props             then use details.<<attribute>>
      const isAvailable = this.props.details.status === 'available';
      const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
      return(
         <li className="menu-fish">
            <img src={this.props.details.image} alt={this.props.details.name}/>
            <h3>{this.props.details.name}<span className="price">{formatPrice(this.props.details.price)}</span></h3>
            <p>{this.props.details.desc}</p>
            <button onClick={() => this.props.addToOrder(this.props.index)} disabled={!isAvailable}>{buttonText}</button>
         </li>
      )
   }
}

Fish.propTypes = {
   details: React.PropTypes.object.isRequired,
   index: React.PropTypes.string.isRequired,
   addToOrder: React.PropTypes.func.isRequired
}

module.exports=Fish
