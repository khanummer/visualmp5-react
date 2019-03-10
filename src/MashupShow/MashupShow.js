import React, { Component } from 'react';
import './MashupShow.css';
import { Link, withRouter } from 'react-router-dom';

class MashupShow extends Component {
    state = {
        mashup: {}
    }

    componentDidMount(){
        this.getMashup(this.props.match.params.id)
    }

    getMashup = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/mashups/${id}`, {
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
            const deletedMashup = await fetch(`http://localhost:4000/mashups/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
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
    return (
      <div className="MashupShow">
            <div>MASHUP SHOW PAGE</div>
            <div>{this.state.mashup.userId}</div>
            <div>{this.state.mashup.spotifySong}</div>
            <img src={`${this.state.mashup.Image}`}/>
            <div>{this.state.mashup.Video}</div>
            <div>{this.state.mashup.GIF}</div>
            <div>{this.state.mashup.Votes}</div>
            <button onClick={() => this.deleteMashup(this.state.mashup._id)}>Delete</button>
      </div>
    );
  }
}

export default withRouter(MashupShow);