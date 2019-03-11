import React, { Component } from 'react';
import './UserShow.css';
import { Link, withRouter } from 'react-router-dom';

class UserShow extends Component {
    state = {
        user: {}
    }

    componentDidMount(){
        this.getUser(this.props.match.params.id)
        // this.getUser('5c82c49667442776546210f5')
        // this.setState({
        //     user: this.props.loggedUser
        // })
    }
    getUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/users/${id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            });

            if (!response.ok) {
                throw Error(response.statusText)
            }

            const userParsed = await response.json();
            this.setState({
                user: userParsed.data
            });

        } catch (err) {
            console.log(err);
            return err
        }
    }
    // do a turnary for if user is logged in and if logged user.id(pass from app.js) = this user.id then show delete button if not dont show delete button
    // nvm add delete button and edit button on settings page
  render() {
    return (
      <div className="UserShow">
            <img className="UserShow-profilePic" src={`${this.state.user.profilePic}`}/>
            <div className="UserShow-username">{this.state.user.username}</div>
            <div className="UserShow-email">{this.state.user.email}</div>
      </div>
    );
  }
}

export default withRouter(UserShow);