import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'
import Header from './Header/Header';
import Footer from './Footer/Footer'
import Contact from './Contact/Contact';
import LoginRegister from './LoginRegister/LoginRegister';

class App extends Component {

  state = {
    users: []
  }

  componentDidMount(){
    this.getUsers()
  }

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
  getUsers = async () => {
    try {
        const response = await fetch(`http://localhost:4000/users`, {
          method: 'GET',
          // credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
          }
        });
          
          if (!response.ok) {
            throw Error(response.statusText)
          }
          console.log(response)
          const userParsed = await response.json();
          console.log(userParsed)
          // this.setState({
          //   user: userParsed.data
          // });
          // console.log(this.state, 'this is state')

    } catch (err) {
      console.log(err)
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
      <Footer/>
      </div>
    );
  }
}

export default withRouter(App);
