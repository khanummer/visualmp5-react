import React, { Component } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <Link to="/contact"><div>CONTACT</div></Link>
      </div>
    );
  }
}

export default Footer;