import React, { Component } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
      if (this.props.loggedIn == true) {
        return (
      <div className="Footer">
        <Link to="/contact"><div>CONTACT</div></Link>
        <Link to="/settings"><div>SETTINGS</div></Link>
      </div>
        )
      } else {
        return (
            <div className="Footer">
            <Link to="/contact"><div>CONTACT</div></Link>
          </div>
        )
      }
  }
}

export default Footer;