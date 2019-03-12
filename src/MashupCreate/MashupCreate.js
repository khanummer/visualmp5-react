import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './MashupCreate.css';

class MashupCreate extends Component {
// pass in logged user in component did mount and set the logged user id to the userID on the mashup object
    state = {
        mashup: {
            userId: '',
            song: {
                name: '',
                artist: '',
                url: '',
                userId: ''
            },
            Image: '',
            Video: '',
            GIF: '',
            Votes: 0
        },
        loggedUser: {},
        search: '',
        gifResults: []
    }

    // this is where we're attaching the user to the mashup, if we want the whole user object in the 
    // future this is where we will change that from loggedUser._id to loggedUser
    componentDidMount(){
        this.setState({
            loggedUser: this.props.loggedUser,
            mashup: {song: this.props.selectedMashup}
        })
        console.log(this.state, 'this is state from mashupcreate')
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

    handleSearchInput = (e) => {
        this.setState({
            search: e.currentTarget.value
        });
        console.log(this.state)
        // this.postSongs()
    }

    getGIFS = async (e) => {
        e.preventDefault();
            try {
                const response = await fetch(`http://localhost:4000/api/giphy/search/${this.state.search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
                });
                if(!response.ok){
                    throw Error(response.statusText)
                }
                const parsedResponse = await response.json();
                console.log(parsedResponse.data,  'this is giphy search')
                this.setState({
                    gifResults: parsedResponse.data
                })
            } catch(err) {
                console.log(err);
                return err
            }
    }

    render(){
        return(
            <div className="MashupCreate" >
                <div>
                    <div className="MashupCreate-Header">CREATE A VISUALMP5</div><br></br>

                    <div className="Gif-Search-title">SEARCH FOR A GIF</div>
                    <form className="Gif-Search-Form" onSubmit={this.getGIFS}>
                        <input className="Gif-Search-Input"type="text" onChange={this.handleSearchInput} value={this.state.search}/>
                        <br></br><button className="MashupCreate-Button" type="submit">Submit</button>

                    </form>


                <div>
                    { this.state.gifResults.map((gif, i) => <div> <iframe src={`${gif.embed_url}`} width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> </div> )}
                </div>


                    <div className="Gif-Search-title">ADD A IMAGE OR VIDEO AS WELL?</div>
                    <form className="MashupCreate-Form" onSubmit={this.handleSubmit}>
                        IMAGE<br></br><input className="MashupCreate-Input" value={this.state.mashup.Image} name='Image' onChange={this.handleInput}/><br></br>
                        VIDEO<br></br><input className="MashupCreate-Input" value={this.state.mashup.Video} name='Video' onChange={this.handleInput}/><br></br>
                        <button className="MashupCreate-Button" type="submit">SUBMIT</button>
                    </form>
                </div>
                
            </div>
        )
    }

}

export default MashupCreate