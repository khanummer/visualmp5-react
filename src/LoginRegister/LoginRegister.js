import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './LoginRegister.css';


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
        <div className="LoginRegister">
          <div className="Register">
              <div className="Register-Header" >Register</div><br></br>
              <form className="Register-Form"onSubmit={this.handleRegisterSave}>
                  USERNAME<br></br><input className="Register-Input" value={this.state.register.username} name='username' onChange={this.handleRegisterInput}/><br></br>
                  PASSWORD<br></br><input className="Register-Input" value={this.state.register.password} name='password' onChange={this.handleRegisterInput}/><br></br>
                  E-MAIL<br></br><input className="Register-Input" value={this.state.register.email}  name='email' onChange={this.handleRegisterInput}/><br></br>
                  PROFILE PIC URL<br></br><input className="Register-Input" value={this.state.register.profilePic} name='profilePic' onChange={this.handleRegisterInput}/><br></br>
                  <button className="Login-Register-Button" type="submit">Register</button>
              </form>
          </div>

          <div className="Login">
            <div className="Login-Header">Login</div><br></br>
            <form className="Login-Form" onSubmit={this.handleLoginSave}>
                USERNAME<br></br><input className="Login-Input" value={this.state.login.username} name='username' onChange={this.handleLoginInput}/><br></br>
                PASSWORD<br></br><input className="Login-Input" value={this.state.login.password} name='password' onChange={this.handleLoginInput}/><br></br>
                <button className="Login-Register-Button" type="submit">Login</button>
            </form>
          </div>

        </div>
      )
  }

}


export default LoginRegister;