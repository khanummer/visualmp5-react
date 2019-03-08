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
  handleRegisterSave = (e) => {

    e.preventDefault();

    const { username, email, password, profilePic } = this.state.register;
    console.log(username, email, password, profilePic, 'registered')

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