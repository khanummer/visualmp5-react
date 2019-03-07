import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom'
import { usersListQuery } from '../Home/Home'



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
    console.log(username, email, password, profilePic)
    this.props.mutate({
      variables: {input: {username, email, password, profilePic}},
      update: (store, {data: { createUser }}) => {
        const data = store.readQuery({query: usersListQuery});
        data.getUsers.push(createUser);
        store.writeQuery({ query: usersListQuery, data });
      }
    })

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

        </div>
      )
  }

}

export const createUser = gql `
  mutation createUser($input: UserInput){
    createUser(input: $input){
      id
      username
      password
      email
      profilePic
    }
  }
`

export default graphql(createUser)(LoginRegister);