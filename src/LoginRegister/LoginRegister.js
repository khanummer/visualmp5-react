import React, { Component } from 'react';
import { Link } from 'react-router-dom'



class LoginRegister extends Component {
  state = {
    register: {
        username: '',
        email: '',
        password: '',
        profilePic: ''
    },
    login: {
        username: '',
        email: '',
        password: '',
        profilePic: ''        
    }
  }
  handleRegisterSave = async (e) => {

    e.preventDefault();

    const { username, email, password, profilePic } = this.state.register;
    console.log(username, email, password, profilePic, 'registered')
    
      try{
          const registerResponse =  await fetch ('http://localhost:4000/users', {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify(this.state.register),
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
              console.log(parsedResponse.user)
          }

      } catch (err) {
          console.log(err);
      }
  

  }
    handleRegisterInput = (e) => {
        this.setState({
            register: {
                ...this.state.register,
            [e.currentTarget.name] : e.currentTarget.value
            }
        });
        console.log(this.state)
    }


  render(){
    return (
        <div>
            <div>Register</div>
            <form onSubmit={this.handleRegisterSave}>
                <input value={this.state.register.username} placeholder="username" name='username' onChange={this.handleRegisterInput}/>
                <input value={this.state.register.password} placeholder="password" name='password' onChange={this.handleRegisterInput}/>
                <input value={this.state.register.email} placeholder="email" name='email' onChange={this.handleRegisterInput}/>
                <input value={this.state.register.profilePic} placeholder="profile picture" name='profilePic' onChange={this.handleRegisterInput}/>
                <button type="submit">Register</button>
            </form>

            <div>Login</div>
            <form onSubmit={this.handleRegisterSave}>
                <input value={this.state.register.username} placeholder="username" name='username' onChange={this.handleRegisterInput}/>
                <input value={this.state.register.password} placeholder="password" name='password' onChange={this.handleRegisterInput}/>
                <input value={this.state.register.email} placeholder="email" name='email' onChange={this.handleRegisterInput}/>
                <input value={this.state.register.profilePic} placeholder="profile picture" name='profilePic' onChange={this.handleRegisterInput}/>
                <button type="submit">Register</button>
            </form>

        </div>
      )
  }

}


export default LoginRegister;