import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish'

class App extends React.Component{
   constructor(){
      super();
      //bind addFish Method
      this.addFish = this.addFish.bind(this);
      //bind loadSamples
      this.loadSamples = this.loadSamples.bind(this);

      //getInitialState //i believe we will call this the store and that it will grow
      this.state = {
         fishes: {},
         order: {}
      }
   }

   addFish(fish){
      //updateState
      const fishes = {...this.state.fishes};//originState
      //addNewFish
      const timeStamp = Date.now();
      fishes[`fish-${timeStamp}`] = fish;
      //setState
      this.setState({ fishes:fishes }) // ({ fishes }) -also Okay

   }

   loadSamples(){
      this.setState({
         fishes: sampleFishes
      })
   }

   render(){
      return(
         <div className="catch-of-the-day">
            <div className="menue">
            <Header tagline='Fresh Seafood Market'/>
            <ul className="list-of-fishes">
               { Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]}/>)}
            </ul>
            </div>
            <Order/>
            <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
         </div>
      )
   }
}

module.exports= App
