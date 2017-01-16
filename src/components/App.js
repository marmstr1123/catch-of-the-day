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
      //bind updatedFish
      this.updateFish = this.updateFish.bind(this);
      //bind removeFish
      this.removeFish = this.removeFish.bind(this);

      //getInitialState //i believe we will call this the store and that it will grow
      this.state = {
         fishes: {},
         order: {}
      }
   }

   componentWillMount(){
      //runs before <app> is rendered
      this.ref = base.syncState(`${this.props.params.storeId}/fishes`
         , {
            context: this,
            state: 'fishes'
         });

      //check if anything is in local storage
      const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
      if(localStorageRef){
         //update app component's state
         this.setState({
            order: JSON.parse(localStorageRef)
         })
      }
   }

   componentWillUnmount(){
      base.removeBinding(this.ref);
   }

   componentWillUpdate(nextProps, nextState) {
      localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
   }

   addFish(fish){
      //copy of state inorder to updateState at end
      const fishes = {...this.state.fishes};//originState
      //addNewFish
      const timeStamp = Date.now();
      fishes[`fish-${timeStamp}`] = fish;
      //setState
      this.setState({ fishes:fishes }) // ({ fishes }) -also Okay

   }

   updateFish(key, updatedFish) {
      const fishes = {...this.state.fishes};
      fishes[key] = updatedFish;
      this.setState({fishes});
   }

   removeFish(key){
      const fishes = {...this.state.fishes}
      fishes[key] = null;
      this.setState({fishes})
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
            <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params}/>
            <Inventory
               addFish={this.addFish}
               loadSamples={this.loadSamples}
               fishes={this.state.fishes}
               updateFish={this.updateFish}
               removeFish={this.removeFish}/>
         </div>
      )
   }
}

module.exports= App
