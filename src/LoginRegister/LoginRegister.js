import React, { Component } from 'react';
import { Link } from 'react-router-dom'



class LoginRegister extends Component {
  state = {
    register: {
        username: '',
        password: '',
        email: '',
        profilePic: ''
    },
    login: {
        username: '',
        password: ''
    }
  }

  
  handleRegisterSave = (e) => {
    e.preventDefault();
    this.props.handleRegister(this.state.register);
  }

  handleLoginSave = (e) => {
    e.preventDefault();
    this.props.doLoginUser(this.state.login);
  }

    handleRegisterInput = (e) => {
        this.setState({
            register: {
                ...this.state.register,
            [e.currentTarget.name] : e.currentTarget.value
            }
        });
        // console.log(this.state.register)
    }

    handleLoginInput = (e) => {
      this.setState({
          login: {
              ...this.state.login,
          [e.currentTarget.name] : e.currentTarget.value
          }
      });
      // console.log(this.state.login)
  }
  

  render(){
    // console.log(this.props)
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
            <form onSubmit={this.handleLoginSave}>
                <input value={this.state.login.username} placeholder="username" name='username' onChange={this.handleLoginInput}/>
                <input value={this.state.login.password} placeholder="password" name='password' onChange={this.handleLoginInput}/>
                <button type="submit">Login</button>
            </form>

        </div>
      )
  }

}


export default LoginRegister;