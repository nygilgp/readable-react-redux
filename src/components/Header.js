import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <div className="blog-header">
          <div className="container">
            <h1 className="blog-title"><Link to="/">The Readable App</Link></h1>
            <p className="lead blog-description">An example react-redux app.</p>
          </div>
        </div>
    );
  }
}

export default Header;  
