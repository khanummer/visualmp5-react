import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div>PROFILE</div>
        <div>SEARCH</div>
        <Link to="/register"><div>CREATE</div></Link>
        <Link to="/"><div>HOME</div></Link>
        <div>SETTINGS</div>
      </div>
    );
  }
}

export default Header;
