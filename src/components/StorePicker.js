import React from 'react';
import { getFunName } from '../helpers';


class StorePicker extends React.Component{
   //1st way to bind is the constructor
   // constructor(){
   //    super();
   //    this.goToStore = this.goToStore.bind(this);
   // }
   //second way to bind is being used
   //3rd way to bind >> onSubmit={(e)=> this.goToStore(e)}

   goToStore(e){
      // console.log(e)
      e.preventDefault();
      // console.log('you changed URL')
   //grab text from box
      const storeId = this.storeInput.value;
      console.log(`going to ${storeId}`)
   //transition from / to /store/:<<storeId>>
      this.context.router.transitionTo(`/store/${storeId}`)
   }
   render(){
      return(
         <form action="" className="store-selector" onSubmit={this.goToStore.bind(this)}>
            <h2>Please Enter A Store</h2>
            <input type="text" required placeholder='Store Name'defaultValue={getFunName()} ref={(input)=> {this.storeInput = input}}/>
            <button type='submit'>Visit Store -> </button>

         </form>
      )
   }
}

StorePicker.contextTypes = {
   router: React.PropTypes.object
}

module.exports = StorePicker
