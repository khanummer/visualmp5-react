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
        } catch(err) {
            console.log(err);
            return err
        }
}
// postSongs = () => this.state.songs.map((song, i) => <li key={i}> {song.image[0]} {song.name} {song.artist} {song.url} </li>)

  render() {
    return (
      <div className="Search">
        <div>SEARCH PAGE </div>
            <form onSubmit={this.getSongs}>
              <input type="text" onChange={this.handleSearchInput} value={this.state.search}/>
              <br></br><button type="submit">Submit</button>

            </form>
    <ul>
    { this.state.songs.map((song, i) => <li key={i}> {song.image[0]} {song.name} {song.artist} {song.url} </li>)}
    </ul>
      </div>
    );
  }
}

export default Search;


