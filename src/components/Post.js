import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';  
import * as actions from '../actions/post';
import PostDetail from './PostDetail';
import CommentListing from './CommentListing';
import NoMatch from './NoMatch';

class Post extends Component {
	
	render() {
    const { posts, isSingle, isValidCategory } = this.props;
    if( (!isValidCategory) || (isSingle && posts.length === 0) ) {
      return(<NoMatch />);
    } else {
  		return (
  			<div>
  				<PostDetail {...this.props} />
  		    <CommentListing {...this.props}  />
  			</div>
  		)
    }
	}
}

function mapStateToProps({ categories, posts }, ownProps) {
  let isSingle = false;
  let isValidCategory = (categories.filter(category => category.path === ownProps.match.params.category)).length === 1;
  if(ownProps.match.params.post) {
    isSingle = true;
  	posts = posts.filter((post) => {
    	return post.id === ownProps.match.params.post;
    });
  }
  return {
    categories,
    posts,
    isSingle,
    isValidCategory
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);