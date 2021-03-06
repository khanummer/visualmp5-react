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
        const response = await fetch(`https://localhost:4000/mashups`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://localhost:3000'
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
        <div className="home-header">V/SUAL MP5</div>
          <ul>
              { this.state.mashups.map((mashup, i) =>  <div className="Home-items" key={i}> <div className="home-song"> <div className="home-name">{mashup.song.name}</div> <div className="home-artist">{mashup.song.artist}</div> <a href={`${mashup.song.url}`}><button className="home-buttons">PLAY ON LASTFM</button></a> <Link key={i} to={`/mashups/${mashup._id}`}><button className="home-buttons">SHOW</button></Link> </div> <div className="gif"><iframe src={`${mashup.GIF}`} width="480" height="360" frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>  </div>) }
          </ul>

      </div>
    );
  }
}

export default Home;


