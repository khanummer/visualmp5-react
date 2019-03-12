import React, { Component } from 'react';
import './Home.css';
import { Link } from "react-router-dom";

class Home extends Component {

  state = {
    mashups: []
  }

  componentDidMount(){
    this.getMashups()
  }

  getMashups = async () => {
    try {
        const response = await fetch(`http://localhost:4000/mashups`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
          }
        });
          
          if (!response.ok) {
            throw Error(response.statusText)
          }
          const mashupParsed = await response.json();
          console.log(mashupParsed.data, 'ALL MASHUPS')
          this.setState({
            mashups: mashupParsed.data
          });
          // console.log(this.state, 'this is state')
    } catch (err) {
      console.log(err)
        return err
    }
  }
// show image and div of it all
  render() {
    return (
      <div className="Home">
        <div>V/SUAL MP5</div>
          <ul>
              { this.state.mashups.map((mashup, i) =>  <div className="Home-items" key={i}> <div>{mashup.song.name}</div> <div>{mashup.song.artist}</div>  <a href={`${mashup.song.url}`}><button>PLAY ON LASTFM</button></a> <Link key={i} to={`/mashups/${mashup._id}`}><button>SHOW</button></Link> <iframe src={`${mashup.GIF}`} width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>  </div>) }
          </ul>

      </div>
    );
  }
}

export default Home;


