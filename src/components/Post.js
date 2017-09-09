import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';  
import * as actions from '../actions/post';
import CommentListing from './CommentListing';
import { FormattedDate } from 'react-intl';


class Post extends Component {
	
	render() {
		const { posts } = this.props;
		return (
			<div>
			{posts.map(post => (
				<div className="blog-post" key={post.id}>
					<h2 className="blog-post-title">{post.title}</h2>
	              	<p className="blog-post-meta"><FormattedDate 
	              	  value={ post.timestamp } day="numeric"
					  month="long"
					  year="numeric" /> by { post.author }</p>
					<p>{ post.body }</p>
				</div>
			))}

	        <CommentListing {...this.props}  />

			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    posts: state.posts.filter((post) => {
    	return post.id === ownProps.match.params.post;
    })
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);