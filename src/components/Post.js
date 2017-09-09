import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';  
import * as actions from '../actions/post';
import PostDetail from './PostDetail';
import CommentListing from './CommentListing';

class Post extends Component {
	
	render() {
		return (
			<div>
				<PostDetail {...this.props} />
		        <CommentListing {...this.props}  />
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
  let posts = state.posts;
  if(ownProps.match.params.post) {
  	posts = state.posts.filter((post) => {
    	return post.id === ownProps.match.params.post;
    });
  }
  return {
    categories: state.categories,
    posts: posts
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);