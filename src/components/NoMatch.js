import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoMatch extends Component {
  render() {
    return (
    	<div>
	    	<h4>404</h4>
	        <p>No content was found for the url, please go back to <Link to="/">home page</Link></p>
       	</div>
    );
  }
}

export default NoMatch;