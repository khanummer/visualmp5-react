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
        axios.put(`https://visual-mp5-api.herokuapp.com/users/${this.state.user._id}`, {
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
            <div className="Settings">
                <div className="Settings-title">SETTINGS</div>

                <img className="Settings-img" src={`${this.state.user.profilePic}`}/>
                <div className="Settings-username">{this.state.user.username}</div>
                <div className="Settings-email">{this.state.user.email}</div>



                <div className="Settings-edit-header">EDIT PROFILE</div>
                <form className="Settings-edit-form" onSubmit={this.handleEditSubmit} >
                    USERNAME<br></br><input className="Settings-edit-form-input"  value={this.state.user.username} placeholder="username" name='username' onChange={this.handleInput}/><br></br>
                    EMAIL<br></br><input className="Settings-edit-form-input"  value={this.state.user.email} placeholder="email" name='email' onChange={this.handleInput}/><br></br>
                    PROFILE PIC<br></br><input className="Settings-edit-form-input" value={this.state.user.profilePic} placeholder="profile picture" name='profilePic' onChange={this.handleInput}/><br></br>
                    <button className="Settings-edit-form-button" type="submit">SUBMIT</button>
                </form>

                <div className="Settings-delete-header">DELETE PROFILE</div>
                <button className="Settings-delete-button" onClick={() => this.props.deleteUser(this.state.user._id)}>Delete Your Profile</button>
            </div>
        )
    }
}
export default Settings;