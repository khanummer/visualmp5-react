import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom'
import { usersListQuery } from '../Home/Home'



class LoginRegister extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    profilePic: ''
  }
  handleSave = (e) => {

    e.preventDefault();

    const { username, email, password, profilePic } = this.state;
    this.props.mutate({
      variables: {input: {username, email, password, profilePic}},
      update: (store, {data: { createUser }}) => {
        const data = store.readQuery({query: usersListQuery});
        data.getUsers.push(createUser);
        store.writeQuery({ query: usersListQuery, data });
      }
    })

  }
  handleInput = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value});
  }
  render(){
    return (
        <div>
            <div>Register</div>
            <form onSubmit={this.handleSave}>
                <input value={this.state.username} placeholder="username" name='username' onChange={this.handleInput}/>
                <input value={this.state.password} placeholder="password" name='password' onChange={this.handleInput}/>
                <input value={this.state.email} placeholder="email" name='email' onChange={this.handleInput}/>
                <input value={this.state.profilePic} placeholder="profile picture" name='profilePic' onChange={this.handleInput}/>
                <button type="submit">create a user</button>
            </form>
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