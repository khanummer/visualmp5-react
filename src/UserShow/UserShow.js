import React, { Component } from 'react';
import './UserShow.css';
import { Link, withRouter } from 'react-router-dom';

class UserShow extends Component {
    state = {
        user: {},
        mashups: [],
        userMashups: []
    }

    componentDidMount(){
        this.getUser(this.props.match.params.id)
        this.getMashups()
        // this.getUser('5c82c49667442776546210f5')
        // this.setState({
        //     user: this.props.loggedUser
        // })
    }
    getUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/users/${id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            });

            if (!response.ok) {
                throw Error(response.statusText)
            }

            const userParsed = await response.json();
            this.setState({
                user: userParsed.data
            });

        } catch (err) {
            console.log(err);
            return err
        }
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
              this.getUserMashups()

        } catch (err) {
          console.log(err)
            return err
        }
      }

   getUserMashups = () => {
        //    if ( this.state.mashups[i].song.userId == this.state.user._id) {
            this.state.mashups.forEach(mashup => {
            
            if (this.state.user._id == mashup.song.userId ) {
            this.setState({
                userMashups: [...this.state.userMashups, mashup]
            })

            console.log(mashup, 'this is get user mashups')
            };

        })
   }
    
   

    // do a turnary for if user is logged in and if logged user.id(pass from app.js) = this user.id then show delete button if not dont show delete button
    // nvm add delete button and edit button on settings page
  render() {
      console.log(this.state)
      
    return (
      <div className="UserShow">
            <img className="UserShow-profilePic" src={`${this.state.user.profilePic}`}/>
            <div className="UserShow-username">{this.state.user.username}</div>
            <div className="UserShow-email">{this.state.user.email}</div>

            <div className="UserShow-mashups">
                { this.state.userMashups.map((mashup, i) =>  <div className="Home-items" key={i}> <div className="home-song"> <div className="home-name">{mashup.song.name}</div> <div className="home-artist">{mashup.song.artist}</div> <a href={`${mashup.song.url}`}><button className="home-buttons">PLAY ON LASTFM</button></a> <Link key={i} to={`/mashups/${mashup._id}`}><button className="home-buttons">SHOW</button></Link> </div> <div className="gif"><iframe src={`${mashup.GIF}`} width="480" height="360" frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>  </div>)} 

            </div>

      </div>
    );
  }
}

export default withRouter(UserShow);