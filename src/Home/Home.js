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

  render() {
    return (
      <div className="Home">
        <div>HOME PAGE / MASHUPS SHOW PAGE</div>
          <ul>
              { this.state.mashups.map((mashup, i) => <Link key={i} to={`/mashups/${mashup._id}`}><li key={i}>{mashup.userId} {mashup.spotifySong} {mashup.Image} {mashup.Video} {mashup.GIF} {mashup.Votes}</li></Link>) }
          </ul>
      </div>
    );
  }
}

export default Home;


