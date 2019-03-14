import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './MashupCreate.css';

class MashupCreate extends Component {
// pass in logged user in component did mount and set the logged user id to the userID on the mashup object
    state = {
        mashup: {
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
        gifResults: [],
        songs: [],
        songsSearch: ''
    }

    // this is where we're attaching the user to the mashup, if we want the whole user object in the 
    // future this is where we will change that from loggedUser._id to loggedUser

    // moved to lower below on handle input

    // componentDidMount(){
    //     this.setState({
    //         loggedUser: this.props.loggedUser,
    //     })
    //     console.log(this.state, 'this is state from mashupcreate')
    // }

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
            const createMashupResponse =  await fetch ('https://visual-mp5-api.herokuapp.com/mashups', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state.mashup),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://visual-mp5.herokuapp.com'
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
                const response = await fetch(`https://visual-mp5-api.herokuapp.com/api/giphy/search/${this.state.search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://visual-mp5.herokuapp.com'
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
    handleSongSearchInput = (e) => {
        this.setState({
            songSearch: e.currentTarget.value,
            loggedUser: this.props.loggedUser
        });
        
        console.log(this.state)
        // this.postSongs()
    }

    getSongs = async (e) => {
        e.preventDefault();
            try {
                const response = await fetch(`https://visual-mp5-api.herokuapp.com/api/lastFM/search/${this.state.songSearch}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://visual-mp5.herokuapp.com'
                }
                });
                if(!response.ok){
                    throw Error(response.statusText)
                }
                const parsedResponse = await response.json();
                console.log(parsedResponse.results.trackmatches.track,  'this is lastFM search')
                this.setState({
                    songs: parsedResponse.results.trackmatches.track
                })
            } catch(err) {
                console.log(err);
                return err
            }
    }

    changeGIFstate = (selectedGIF) => {
        this.setState({
            mashup:{GIF: selectedGIF
        }})

    }




// gif update state

// onClick={this.changeGIFstate(`${gif.embed_url}`)} 


    render(){
        return(
            <div className="MashupCreate" >

                <div className="MashupCreate-Header">CREATE A VISUALMP5</div><br></br>




                <div className="Gif-Search-title">SEARCH FOR A SONG</div>
                <form className="Gif-Search-Form" onSubmit={this.getSongs}>
                    <input className="Gif-Search-Input"type="text" onChange={this.handleSongSearchInput} value={this.state.songSearch}/>
                    <br></br><button className="MashupCreate-Button" type="submit">SUBMIT</button>

                </form>


                <div>
                    { this.state.songs.map((song, i) =>   <div key={i} className="song-show-name">{song.name}<div/>  <div className="song-show-artist" name="artist">{song.artist}</div>  <a href={`${song.url}`} name="url" > <button className="song-show-button">PLAY ON LASTFM</button></a> <button className="song-show-button" onClick={() => this.setState({ mashup:{ song: {name: `${song.name}`, artist: `${song.artist}`, url: `${song.url}`, userId: `${this.props.loggedUser._id}`}}})}>SELECT SONG</button> </div> )}
                </div>



                <div>

                    <div className="Gif-Search-title" id="GIF">SEARCH FOR A GIF</div>
                    <form className="Gif-Search-Form" onSubmit={this.getGIFS}>
                        <input className="Gif-Search-Input"type="text" onChange={this.handleSearchInput} value={this.state.search}/>
                        <br></br><button className="MashupCreate-Button" type="submit">SUBMIT</button>

                    </form>


                <div>
                    { this.state.gifResults.map((gif, i) => <div> <iframe src={`${gif.embed_url}`} width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> <br></br><button className="song-show-button" onClick={() => this.setState({ mashup: {...this.state.mashup, GIF:`${gif.embed_url}`} })}>SELECT</button></div> )}
                </div>

                    <form onSubmit={() => this.handleSubmit()}>
                        <button className="MashupCreate-Button" type="submit">CREATE V/SUAL MP5</button>
                    </form>

                    <div className="coming-soon">----COMING SOON----</div>
                    <div className="Gif-Search-title">ADD A IMAGE OR VIDEO AS WELL?</div>
                    <form className="MashupCreate-Form">
                        IMAGE<br></br><input className="MashupCreate-Input"/><br></br>
                        VIDEO<br></br><input className="MashupCreate-Input"/><br></br>
                        <button className="MashupCreate-Button">SUBMIT</button>
                    </form>
                </div>
                
            </div>
        )
    }

}

export default MashupCreate