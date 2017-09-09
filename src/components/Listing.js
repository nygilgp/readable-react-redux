import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Listing extends Component {
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

export default Listing;
