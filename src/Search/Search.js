import React, { Component } from 'react';
import './Search.css';
import { Link } from "react-router-dom";

class Search extends Component {

  state = {
    search: '',
    songs: []
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
//figure out hashtag 
// <div key={i}><img src={`${song.image[0].#text}`}/></div>

// <a href="#"><button>CREATE VISUALMP5</button></a>

  render() {
    return (
      <div className="Search">
        <div className="Search-title">SEARCH FOR A SONG</div>
            <form className="Search-Form" onSubmit={this.getSongs}>
              <input className="Search-Input"type="text" onChange={this.handleSearchInput} value={this.state.search}/>
              <br></br><button className="Search-Button" type="submit">Submit</button>

            </form>
    <div>
    { this.state.songs.map((song, i) => <div> <a href={`${song.url}`}><div key={i}>{song.name} - {song.artist}</div></a>  </div>)}
    </div>
      </div>
    );
  }
}

export default Search;


