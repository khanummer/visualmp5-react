import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'
import Header from './Header/Header';
import Contact from './Contact/Contact';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/" component={() => <Home/>}/>
        <Route exact path="/contact" component={() => <Contact/>}/>
      </Switch>
        HELLO I AM VISUAL.MP5 
      
      </div>
    );
  }
}

export default App;
