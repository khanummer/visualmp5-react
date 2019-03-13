import React, { Component } from 'react';
import './Contact.css'

class Contact extends Component {
  render() {
    return (
      <div className="Contact">
        <div className="Contact-header">UMMER KHAN</div>
          <div>UMMERNKHAN@GMAIL.COM</div>
          <a href="https://www.linkedin.com/in/khanummer"><div>LINKEDIN</div></a>
          <a href="https://github.com/khanummer"><div>GITHUB</div></a>
      </div>
    );
  }
}

export default Contact;