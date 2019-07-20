import React, { Component } from 'react';
import './MashupShow.css';
import { Link, withRouter } from 'react-router-dom';

class MashupShow extends Component {
    state = {
        mashup: {
          GIF: '',
          song: {
            name: '',
            artist: '',
            url: '',
            userId: ''
          }

        }
    }

    componentDidMount(){
        this.getMashup(this.props.match.params.id)
    }

    getMashup = async (id) => {
        try {
            const response = await fetch(`https://localhost:4000/mashups/${id}`, {
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
            this.setState({
                mashup: mashupParsed.data
            });

        } catch (err) {
            console.log(err);
            return err
        }
    }

    deleteMashup = async (id) => {
        try {
            const deletedMashup = await fetch(`https://localhost:4000/mashups/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://localhost:3000'
            }
            });
            if (!deletedMashup.ok) {
            throw Error(deletedMashup.statusText);
            }
            const parsedDeletedMashup = await deletedMashup.json();
            console.log(parsedDeletedMashup, 'deleted Mashup')
        //   this.props.history.push('/');
        } catch (err) {
          return err
        }
      }

    // do a turnary for if mashup belongs to loggedUser, pass in from App.js and store in state, if userId of mashup and loggedUser._id match then show delete button if not dont show delete button
  render() {
    console.log(this.state)
    return (
      <div className="MashupShow">  
            <div className="mashupShow-items">
            <div className="home-song">
            <div className="home-name">{this.state.mashup.song.name}</div> 
            <div className="home-artist">{this.state.mashup.song.artist}</div>  
            <a href={`${this.state.mashup.song.url}`}><button className="home-buttons">PLAY ON LASTFM</button></a> 
            <button className="home-buttons" onClick={() => this.deleteMashup(this.state.mashup._id)}>Delete</button>
            </div>
            <iframe src={`${this.state.mashup.GIF}`} width="480" height="360" frameBorder="0" className="giphy-embed" allowFullScreen></iframe> 
            </div>
      </div>
    );
  }
}

export default withRouter(MashupShow);