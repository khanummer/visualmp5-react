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
  render() {
    return (
      <div className="UserShow">
            <div>USER SHOW PAGE</div>
            <img src={`${this.state.user.profilePic}`}/>
            <div>{this.state.user.username}</div>
            <div>{this.state.user.email}</div>
            
      </div>
    );
  }
}

export default withRouter(UserShow);