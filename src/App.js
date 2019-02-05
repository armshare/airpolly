import React, { Component } from 'react';
import NavBar from './components/NavBar'
import LocationList from './components/LocationList'
class App extends Component {
  
  render() {
    return (
      <div className="">
        <NavBar/>
        <LocationList/>
      </div>
    );
  }
}

export default App;
