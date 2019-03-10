import React, { Component } from 'react';
import './Home.css';

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
              { this.state.mashups.map((mashup, i) => <li key={i}>{mashup.userId} {mashup.spotifySong} {mashup.Image} {mashup.Video} {mashup.GIF} {mashup.Votes}</li>) }
          </ul>
      </div>
    );
  }
}

export default Home;


