import React, { Component } from 'react';

class CommentListing extends Component {
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	isEditing: false,
	    	comments: this.props.comments
	    };
	    this.toggleEdit = this.toggleEdit.bind(this);
	    this.updateCommentState = this.updateCommentState.bind(this);
	    this.saveComment = this.saveComment.bind(this);
	}

	toggleEdit() {
		this.setState({isEditing: !this.state.isEditing});
	}

	updateCommentState(event) {
	    const field = event.target.name;
	    const comments = this.state.comments;
	    console.log(comments);
	    console.log(field);
	    //return this.setState({comments: comments});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.comments.length !== nextProps.comments.length) {
      		this.setState({comments: nextProps.comments});
    	}
	}

	saveComment() {
		//event.preventDefault();
    	//this.props.actions.updateComment(this.state.comments);
	}

	render() {
		const { comments } = this.props;
		const { isEditing } = this.state;
		if( isEditing ) {
			return (
				<div className="row">
	                <div className="col-md-12">
	                	<div className="page-header">
	                    	<h4><small className="pull-right">Comments</small></h4>
	                  	</div> 
	                   	<form>
						    <div className="form-group">
						      <label htmlFor="comment">Comment:</label>
						      <textarea className="form-control" rows="5" id="comment"></textarea>
						    </div>
						    <input
					            type="submit"
					            className="btn btn-primary"
					            onClick={this.saveComment}/> 
					        <button className="btn" onClick={this.toggleEdit}>Cancel</button>
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
	                  	</div> 
	                   	<div className="comments-list">
	                   	{comments.map(comment => (
	                		<div className="media" key={ comment.id }>
	                        	<p className="pull-right"><small>{ comment.timestamp }</small></p>
	                        	<div className="media-body">
									<h4 className="media-heading user_name">{ comment.author }</h4>
		                            { comment.body }
		                            <p><small><span>{ comment.voteScore } Votes</span> - <a href="#">Up Vote</a> - <a href="#">Down Vote</a>
		                             - <button onClick={this.toggleEdit}>edit</button></small></p>
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

/*

<div className="form-group">
						      <label htmlFor="usr">Name:</label>
						      <input type="text" className="form-control" id="usr" />
						    </div>
*/

export default CommentListing;  
