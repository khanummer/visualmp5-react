import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'
import Header from './Header/Header';
import Footer from './Footer/Footer'
import Contact from './Contact/Contact';
import LoginRegister from './LoginRegister/LoginRegister';

class App extends Component {
  searchSpotify = async () => {
    try {
        const response = await fetch(`/spotify/search`);
        if(!response.ok){
            throw Error(response.statusText)
        }
        const parsedResponse = await response.json();
        console.log(parsedResponse,  'this is spotify search')
    } catch(err) {
        console.log(err);
        return err
    }
}
  render() {
    return (
      <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/" component={() => <LoginRegister/>}/>
        <Route exact path="/contact" component={() => <Contact/>}/>
        <Route exact path="/register" component={() => <LoginRegister/>}/>
      </Switch>
        HELLO I AM VISUAL.MP5 
      <Footer/>
      </div>
    );
  }
}

export default withRouter(App);
