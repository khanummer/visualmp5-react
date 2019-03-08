import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'
import axios from 'axios';
import Header from './Header/Header';
import Footer from './Footer/Footer'
import Home from './Home/Home';
import Contact from './Contact/Contact';
import LoginRegister from './LoginRegister/LoginRegister';
import UserShow from './UserShow/UserShow';

class App extends Component {

  state = {
    users: [],
    loggedUser: {},
    loggedIn: false,
    username: ''
  }

  componentDidMount(){
    this.getUsers()
  }

  doLoginUser = (user) =>
    axios.post('http://localhost:4000/users/login', user)
      .then(res => {
        console.log(res)
        this.setState({
          loggedUser: res.data.loggedUser
        })
        // console.log(this.state)
        res.data.isLoggedIn ? this.setState({loggedIn: true}) : this.setState({loggedIn: false})
      })
// res.data.isLoggedIn ? this.props.history.push('/home') : this.props.history.push('/')

handleRegister = async (data) => {
    try{
        const registerResponse =  await fetch ('http://localhost:4000/users', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'

            }
        });

        if(!registerResponse.ok) {
            throw Error(registerResponse.statusText)
        }

        const parsedResponse = await registerResponse.json();

        if (parsedResponse.data === 'login successful'){
          this.setState({
            loggedIn: true,
            loggedUser: parsedResponse.user
          })
          console.log(parsedResponse.user,'user registered')
        }
    } catch (err) {
        console.log(err);
    }
}

handleLogout = async () => {
  // try {
  //   const response = await fetch('/users/logout');

  //   if (!response.ok) {
  //     throw Error(response.statusText)
  //   } else {
  //     console.log(response);
  //   }
  //   const deletedSession = await response.json();
    this.setState({
      user: {},
      loggedIn: false
    })
//     this.props.history.push('/')
//   } catch (err) {
//     console.log(err);
// }
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

  deleteUser = async (id) => {
    try {
      const deletedUser = await fetch(`http://localhost:4000/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
      });
      if (!deletedUser.ok) {
        throw Error(deletedUser.statusText);
      }
      const parsedDeletedUser = await deletedUser.json();
      this.setState({
        logged: false,
        username: '',
        user: {}
      });

      this.props.history.push('/');
    } catch (err) {
      return err
    }
  }

  render() {
    return (
      <div className="App">
      <Header loggedIn={this.state.loggedIn} loggedUser={this.state.loggedUser} handleLogout={this.handleLogout}/>
      <Switch>
        <Route exact path="/" component={() => <Home/>}/>
        <Route exact path="/contact" component={() => <Contact/>}/>
        <Route exact path="/login-or-register" component={(...props) => <LoginRegister doLoginUser={this.doLoginUser} handleRegister={this.handleRegister}/>}/>
        <Route exact path="/users/:id" component={(...props) => <UserShow {...props} loggedUser={this.state.loggedUser} deleteUser={this.deleteUser}/>}/>
      </Switch>
      <Footer loggedIn={this.state.loggedIn} loggedUser={this.state.loggedUser}/>
      </div>
    );
  }
}

export default withRouter(App);
