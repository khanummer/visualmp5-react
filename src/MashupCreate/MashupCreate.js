import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './MashupCreate.css';

class MashupCreate extends Component {
// pass in logged user in component did mount and set the logged user id to the userID on the mashup object
    state = {
        mashup: {
            userId: '',
            spotifySong: '',
            Image: '',
            Video: '',
            GIF: '',
            Votes: 0
        },
        loggedUser: {}
    }

    // this is where we're attaching the user to the mashup, if we want the whole user object in the 
    // future this is where we will change that from loggedUser._id to loggedUser
    componentDidMount(){
        this.setState({
            loggedUser: this.props.loggedUser,
            mashup: { userId: this.props.loggedUser._id }
        })
    }

    handleInput = (e) => {
        this.setState({
            mashup: {
                ...this.state.mashup,
            [e.currentTarget.name] : e.currentTarget.value
            }
        });
    }

    handleSubmit = async () => {
        try {
            const createMashupResponse =  await fetch ('http://localhost:4000/mashups', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state.mashup),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            });
    
            if(!createMashupResponse.ok) {
                throw Error(createMashupResponse.statusText)
            }
    
            const createMashupParsed = await createMashupResponse.json();
            
            console.log(createMashupParsed.mashup,'mashup created')


        } catch (err) {
            console.log(err);
        }
    }

    render(){
        return(
            <div className="MashupCreate" >
                <div className="MashupCreate-Header">CREATE A NEW MASHUP</div><br></br>
                <form className="MashupCreate-Form" onSubmit={this.handleSubmit}>
                    <input className="MashupCreate-Input" value={this.state.mashup.spotifySong} placeholder="Spotify Song" name='spotifySong' onChange={this.handleInput}/><br></br>
                    <input className="MashupCreate-Input" value={this.state.mashup.Image} placeholder="Image" name='Image' onChange={this.handleInput}/><br></br>
                    <input className="MashupCreate-Input" value={this.state.mashup.Video} placeholder="Video" name='Video' onChange={this.handleInput}/><br></br>
                    <input className="MashupCreate-Input" value={this.state.mashup.GIF} placeholder="GIF" name='GIF' onChange={this.handleInput}/><br></br>
                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        )
    }

}

export default MashupCreate