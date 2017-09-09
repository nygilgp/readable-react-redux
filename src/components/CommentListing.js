import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';  
import * as actions from '../actions/comment';
import { FormattedRelative } from 'react-intl';

class CommentListing extends Component {
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	isEditing: false,
	    	isAdding: false,
	    	editCommentId: null,
	    	body: '',
	    	author: ''
	    };
	    this.toggleEdit = this.toggleEdit.bind(this);
	    this.toggleAdd = this.toggleAdd.bind(this);
	    this.updateBodyState = this.updateBodyState.bind(this);
	    this.saveComment = this.saveComment.bind(this);
	    this.voteComment = this.voteComment.bind(this);
	    this.deleteComment = this.deleteComment.bind(this);
	    //this.addComment = this.addComment.bind(this);
	}

	componentDidMount() {
		this.props.actions.loadComments(this.props.match.params.post);
	}

	toggleEdit(id, body) {
		this.setState({
			isEditing: !this.state.isEditing,
			editCommentId: id,
			body: body
		});
	}

	toggleAdd() {
		this.setState({
			isAdding: !this.state.isAdding
		});
	}

	updateBodyState(body) {
	    this.setState({body});
	}

	updateAuthorState(author) {
	    this.setState({author});
	}

	saveComment(event) {
		event.preventDefault();
    	this.props.actions.updateComment(this.state.editCommentId, this.state.body);
    	this.setState({
    		isEditing: !this.state.isEditing,
			editCommentId: null,
			body: ''
    	});
	}

	addComment(event) {
		event.preventDefault();
    	this.props.actions.createComment(this.state.body, this.state.author, this.props.match.params.post);
    	this.setState({
    		isAdding: !this.state.isAdding
    	});
	}

	voteComment(id, option){
		this.props.actions.updateVote(id, option);
	}

	deleteComment(id, parentId) {
		this.props.actions.removeComment(id, parentId);
	}



	render() {
		const { comments } = this.props;
		const { isEditing, isAdding, body, author } = this.state;
		if ( isAdding ) {
			return (
				<div className="row">
	                <div className="col-md-12">
	                	<div className="page-header">
	                    	<h4><small className="pull-right">Comments</small></h4>
	                  	</div> 
	                   	<form>
	                   		<div className="form-group">
						      <label htmlFor="author">Author:</label>
						      <input type="text" className="form-control" id="author" 
						      value={author} onChange={(event) => this.updateAuthorState(event.target.value)} />
						    </div>
						    <div className="form-group">
						      <label htmlFor="body">Comment:</label>
						      <textarea className="form-control" rows="5" id="body"
						       value={ body } onChange={(event) => this.updateBodyState(event.target.value)} ></textarea>
						    </div>
						    <input
					            type="submit"
					            className="btn btn-primary"
					            onClick={(event) => this.addComment(event)}/> 
					        <button className="btn" onClick={(event) => this.toggleAdd()}>Cancel</button>
						</form>
	                </div>
	            </div>
	        )
		} else if( isEditing ) {
			return (
				<div className="row">
	                <div className="col-md-12">
	                	<div className="page-header">
	                    	<h4><small className="pull-right">Comments</small></h4>
	                  	</div> 
	                   	<form>
						    <div className="form-group">
						      <label htmlFor="body">Comment:</label>
						      <textarea className="form-control" rows="5" id="body"
						       value={ body } onChange={(event) => this.updateBodyState(event.target.value)} ></textarea>
						    </div>
						    <input
					            type="submit"
					            className="btn btn-primary"
					            onClick={(event) => this.saveComment(event)}/> 
					        <button className="btn" onClick={(event) => this.toggleEdit(null, '')}>Cancel</button>
						</form>
	                </div>
	            </div>
	        )
		} else {
			return(
	            <div className="row">
	                <div className="col-md-12">
	                	<div className="page-header">
	                    	<h4><small className="pull-right">Comments</small></h4> 
	                    	<button className="btn" onClick={(event) => this.toggleAdd()} >Add Comment</button>
	                  	</div> 
	                   	<div className="comments-list">
	                   	{comments.map(comment => (
	                		<div className="media" key={ comment.id }>
	                        	<p className="pull-right"><small><FormattedRelative value={ comment.timestamp } /></small></p>
	                        	<div className="media-body">
									<h4 className="media-heading user_name">{ comment.author }</h4>
		                            { comment.body }
		                            <p><small><span>{ comment.voteScore } Votes</span> - 
		                            <button className="btn" onClick={(event) => this.voteComment(comment.id, 'upVote')} value={ comment.id }>Up Vote</button> - 
		                            <button className="btn" onClick={(event) => this.voteComment(comment.id, 'downVote')} value={ comment.id }>Down Vote</button> - 
		                            <button className="btn" onClick={(event) => this.toggleEdit(event.target.value, comment.body)} value={ comment.id }>Edit</button> -
		                            <button className="btn" onClick={(event) => this.deleteComment(comment.id, comment.parentId)} value={ comment.id }>Delete</button>
		                            </small></p>
	                            </div>
	                        </div>
	                    ))}
	                   	</div>
	                </div>
	            </div>
	        )
	    }
	}
}

function mapStateToProps(state, ownProps) {
  let checkComments = [];  
  if(ownProps.match.params.post in state.comments) {
  	checkComments = state.comments[ownProps.match.params.post];
  }
  return {
    comments: checkComments
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListing);   
