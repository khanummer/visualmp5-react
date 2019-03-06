import React, { Component } from 'react';
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <a href="#"><div>PROFILE</div></a>
        <a href="#"><div>SEARCH</div></a>
        <a href="#"><div>CREATE</div></a>
        <a href="#"><div>HOME</div></a>
        <a href="#"><div>SETTINGS</div></a>
      </div>
    );
  }
}

export default Header;
