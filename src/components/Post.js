import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { loadComments, editComment } from '../actions/comment';
import {bindActionCreators} from 'redux';  
import * as commentActions from '../actions/comment';
import CommentListing from './CommentListing';

class Post extends Component {
	componentDidMount() {
		this.props.commentActions.loadComments(this.props.match.params.post);
	}
	render() {
		const { posts, comments, commentActions } = this.props;
		return (
			<div>
			{posts.map(post => (
				<div className="blog-post" key={post.id}>
					<h2 className="blog-post-title">{post.title}</h2>
	              	<p className="blog-post-meta">{ post.timestamp } by { post.author }</p>
					<p>{ post.body }</p>
				</div>
			))}

	        <CommentListing comments={ comments } commentActions={ commentActions }   />

			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
  let checkComments = [];  
  if(ownProps.match.params.post in state.comments) {
  	checkComments = state.comments[ownProps.match.params.post];
  }
  return {
    categories: state.categories,
    posts: state.posts.filter((post) => {
    	return post.id === ownProps.match.params.post;
    }),
    comments: checkComments
  };
} 

function mapDispatchToProps(dispatch) {
  /*return {
    fetchComments: (data) => dispatch(loadComments(data)),
    callUpdateCommment: (id, body) => dispatch(editComment(id, body))
  }*/
  return {
    commentActions: bindActionCreators(commentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);  