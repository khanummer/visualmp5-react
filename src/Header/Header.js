import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
// commit and push
// make mashup show 
// make searchbar for spotify api on home page (mayeb new component)
// mashup delete

class Header extends Component {
  render() {
    if (this.props.loggedIn == true) {
      return (
        <div className="Header">
          <Link to={`/users/${this.props.loggedUser._id}`}><div>PROFILE</div></Link>
          <div>SEARCH</div>
          <Link to="/create-mashup"><div>CREATE</div></Link>
          <Link to="/"><div>HOME</div></Link>
          <Link to="/" onClick={() => this.props.handleLogout}><div>LOGOUT</div></Link>
        </div>
      );

    } else { 
      return (
      <div className="Header">
        <Link to="/"><div>HOME</div></Link>
        <div>SEARCH</div>
        <Link to="/login-or-register"><div>LOGIN / REGISTER</div></Link>
      </div>
      )
    }
  }
}

export default Header;
