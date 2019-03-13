import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'
import axios from 'axios';
import Header from './Header/Header';
import Footer from './Footer/Footer'
import Home from './Home/Home';
import Contact from './Contact/Contact';
import Settings from './Settings/Settings'
import LoginRegister from './LoginRegister/LoginRegister';
import UserShow from './UserShow/UserShow';
import MashupCreate from './MashupCreate/MashupCreate';
import MashupShow from './MashupShow/MashupShow';
import Search from './Search/Search';

class App extends Component {

  state = {
    users: [],
    loggedUser: {},
    loggedIn: false,
    username: '',
    selectedMashup: {}
  }
  
  componentDidMount(){
    // this.getUsers()
  }

  doLoginUser = (user) =>
    axios.post('https://visual-mp5-api.herokuapp.com/users/login', user)
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
        const registerResponse =  await fetch ('https://visual-mp5-api.herokuapp.com/users', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://visual-mp5.herokuapp.com'

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
  try {
    const response = await fetch('https://visual-mp5-api.herokuapp.com/users/logout', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://visual-mp5.herokuapp.com'

      }
    });

    if (!response.ok) {
      throw Error(response.statusText)
    } else {
      console.log(response);
    }
    const deletedSession = await response.json();
    this.setState({
      user: deletedSession.user || {},
      loggedIn: false
    })
    this.props.history.push('/')
  } catch (err) {
    console.log(err);
}
}

  getUsers = async () => {
    try {
        const response = await fetch(`https://visual-mp5-api.herokuapp.com/users`, {
          method: 'GET',
          // credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://visual-mp5.herokuapp.com'
          }
        });
          
          if (!response.ok) {
            throw Error(response.statusText)
          }
          const userParsed = await response.json();
          console.log(userParsed.data, 'ALL USERS')
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
      const deletedUser = await fetch(`https://visual-mp5-api.herokuapp.com/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://visual-mp5.herokuapp.com'
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
  updateParentState = (updatedUser) => {
    this.setState({
      user: updatedUser
    });
  }

  updateParentMashup = (selectedMashup) => {
    this.setState({
      selectedMashup: selectedMashup
    })
  }

  render() {
    return (
      <div className="App">
      <Header loggedIn={this.state.loggedIn} loggedUser={this.state.loggedUser} handleLogout={this.handleLogout}/>
      <Switch>
        <Route exact path="/" component={(...props) => <Home {...props} />}/>
        <Route exact path="/contact" component={(...props) => <Contact {...props} />}/>
        <Route exact path="/login-or-register" component={(...props) => <LoginRegister history={this.props.history} doLoginUser={this.doLoginUser} handleRegister={this.handleRegister}/>}/>
        <Route exact path="/users/:id" component={(...props) => <UserShow {...props} loggedUser={this.state.loggedUser} deleteUser={this.deleteUser}/>}/>
        <Route exact path="/mashups/:id" component={(...props) => <MashupShow {...props}/>}/>
        <Route exact path="/create-mashup" component={(...props) => <MashupCreate {...props} loggedUser={this.state.loggedUser} selectedMashup={this.state.selectedMashup}/>}/>
        <Route exact path="/settings" component={(...props) => <Settings {...props} loggedUser={this.state.loggedUser} deleteUser={this.deleteUser} updateParentState={this.updateParentState}/>}/>
        <Route exact path="/search" component={(...props) => <Search {...props} history={this.props.history} updateParentMashup={this.updateParentMashup} loggedUser={this.state.loggedUser}/>}/>
      </Switch>
      <Footer loggedIn={this.state.loggedIn} loggedUser={this.state.loggedUser}/>
      </div>
    );
  }
}

export default withRouter(App);


// bug on iframe causing a second site to render