import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './MashupCreate.css';

class MashupCreate extends Component {
// pass in logged user in component did mount and set the logged user id to the userID on the mashup object
    state = {
        mashup: {
            userId: '',
            song: {},
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
            mashup: this.props.selectedMashup
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
                <div className="MashupCreate-Header">CREATE A VISUALMP5</div><br></br>
                <form className="MashupCreate-Form" onSubmit={this.handleSubmit}>
                    SONG<br></br><input className="MashupCreate-Input" value={this.state.mashup.name} name='spotifySong' /><br></br>
                    IMAGE<br></br><input className="MashupCreate-Input" value={this.state.mashup.Image} name='Image' onChange={this.handleInput}/><br></br>
                    VIDEO<br></br><input className="MashupCreate-Input" value={this.state.mashup.Video} name='Video' onChange={this.handleInput}/><br></br>
                    GIF<br></br><input className="MashupCreate-Input" value={this.state.mashup.GIF} name='GIF' onChange={this.handleInput}/><br></br>
                    <button className="MashupCreate-Button" type="submit">SUBMIT</button>
                </form>
            </div>
        )
    }

}

export default MashupCreate