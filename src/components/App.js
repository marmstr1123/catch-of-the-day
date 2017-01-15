import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component{
   constructor(){
      super();
      //bind addFish Method
      this.addFish = this.addFish.bind(this);
      //bind loadSamples
      this.loadSamples = this.loadSamples.bind(this);
      //bind addToOrder
      this.addToOrder = this.addToOrder.bind(this);

      //getInitialState //i believe we will call this the store and that it will grow
      this.state = {
         fishes: {},
         order: {}
      }
   }

   componentWillMount(){
      this.ref = base.syncState(`${this.props.params.storeId}/fishes`
         , {
            context: this,
            state: 'fishes'
         });
   }

   componentWillUnmount(){
      base.removeBinding(this.ref);
   }

   addFish(fish){
      //copy of state so you can updateState at end
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

   addToOrder(key){
      //snapshot of state
      const order = {...this.state.order}
      //update order# of fish
      order[key] = order[key] +1 || 1;
      //updateState
      this.setState({order});
   }
      // .map note: key={key} is for react index={key} is for you! to get key vals
   render(){
      return(
         <div className="catch-of-the-day">
            <div className="menue">
            <Header tagline='Fresh Seafood Market'/>
            <ul className="list-of-fishes">
               { Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
            </ul>
            </div>
            <Order fishes={this.state.fishes} order={this.state.order}/>
            <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
         </div>
      )
   }
}

module.exports= App
