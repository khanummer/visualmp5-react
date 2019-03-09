import React, { Component } from 'react';
import './Settings.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Settings extends Component {

    state = {
        user: {

        }
    }
    componentDidMount(){
        this.setState({
            user: this.props.loggedUser
        })
    }
    handleInput = (e) => {
        this.setState({
            user: {
                ...this.state.user,
            [e.currentTarget.name] : e.currentTarget.value
            }
        });
        // console.log(this.state.register)
    }
    handleEditSubmit = () => {
        axios.put(`http://localhost:4000/users/${this.state.user._id}`, {
            username: this.state.user.username,
            email: this.state.user.email,
            profilePic: this.state.user.profilePic
        })
            .then((updatedUser) => this.props.updateParentState(updatedUser.data.data))
            // redirect home
            .then(this.props.history.push('/home'))
    }
    // add delete button two step verification , bring to page 'are you sure you want to delete your profile?'
    render() {
        return (
            <div>
                SETTINGS PAGE
                <div>EDIT PROFILE</div>
                <form onSubmit={this.handleEditSubmit}>
                    <input value={this.state.user.username} placeholder="username" name='username' onChange={this.handleInput}/>
                    <input value={this.state.user.email} placeholder="email" name='email' onChange={this.handleInput}/>
                    <input value={this.state.user.profilePic} placeholder="profile picture" name='profilePic' onChange={this.handleInput}/>
                    <button type="submit">SUBMIT</button>
                </form>

                <div>DELETE PROFILE</div>
                <button onClick={() => this.props.deleteUser(this.state.user._id)}>Delete Your Profile</button>
            </div>
        )
    }
}
export default Settings;