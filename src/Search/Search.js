import React, { Component } from 'react';
import './Search.css';
import { Link } from "react-router-dom";

class Search extends Component {

  state = {
    search: '',
    songs: [],
    selectedMashup: {
      name: '',
      artist: '',
      url: '',
      userId: ''
    }
  }

//   componentDidMount(){
//     this.postSongs()
//   }

    getSongs = (e) => {
        e.preventDefault();
        this.props.searchlastFM(this.state.search);
    }

    handleSearchInput = (e) => {
        this.setState({
            search: e.currentTarget.value
        });
        console.log(this.state)
        // this.postSongs()
    }


  getSongs = async (e) => {
    e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/lastFM/search/${this.state.search}`, {
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
            console.log(parsedResponse.results.trackmatches.track,  'this is lastFM search')
            this.setState({
                songs: parsedResponse.results.trackmatches.track
            })
        } catch(err) {
            console.log(err);
            return err
        }
}

selectSong = (e) => {
  console.log(this.state.selectedMashup)
  this.props.updateParentMashup(this.state.selectedMashup)
  this.props.history.push('/create-mashup')
}




//figure out hashtag 
// <div key={i}><img src={`${song.image[0].#text}`}/></div>

// <a href="#"><button>CREATE VISUALMP5</button></a>
//<button onClick={() => this.setState({ selectedMashup: {name: `${song.name}`, artist: `${song.artist}`, url: `${song.url}`}})}>SELECT SONG</button> 



  render() {
    return (
      <div className="Search">
        <div className="Search-title">SEARCH FOR A SONG</div>
        <div>(to create a VISUALMP5, click select, then create)</div>
            <form className="Search-Form" onSubmit={this.getSongs}>
              <input className="Search-Input"type="text" onChange={this.handleSearchInput} value={this.state.search}/>
              <br></br><button className="Search-Button" type="submit">Submit</button>

            </form>
    <div>
    { this.state.songs.map((song, i) =>   <div key={i}>{song.name}<div/>  <div name="artist">{song.artist}</div>  <a href={`${song.url}`} name="url" > <button>lastFM URL</button></a> <button onClick={() => this.setState({ selectedMashup: {name: `${song.name}`, artist: `${song.artist}`, url: `${song.url}`, userId: `${this.props.loggedUser._id}`}})}>SELECT SONG</button> <button onClick={(e) => this.selectSong(e)}>CREATE VISUALMP5</button> </div> )}
    </div>
    </div>
    );
  }
}




export default Search;


