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
    // do a turnary for if user is logged in and if logged user.id(pass from app.js) = this user.id then show delete button if not dont show delete button
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
      </div>
    );
  }
}

export default withRouter(MashupShow);