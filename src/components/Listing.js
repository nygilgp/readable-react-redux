import React, { Component } from 'react';
//import Moment from 'react-moment';
import { Link } from 'react-router-dom';

class Listing extends Component {
	// { console.log(this.props.match.params.category) }
	render() {
		const { posts } = this.props;
		return (
			<div className="listing">  
				{ posts.map((post) => (
					<div className="blog-post" key={ post.id }>
		              <h2 className="blog-post-title"><Link to={{ pathname: `/`+post.category+`/`+post.id }}>{ post.title }</Link></h2>
		              <p className="blog-post-meta">{ post.timestamp } by { post.author }</p>
		              <p>{ post.body }</p>
		            </div>
				))}
	        </div>
		)
	}
}

// <Moment format="MMMM DD, YYYY">{ post.timestamp }</Moment>

export default Listing;
