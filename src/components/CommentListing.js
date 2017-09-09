import React, { Component } from 'react';

class CommentListing extends Component {
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	isEditing: false,
	    	editCommentId: null,
	    	body: '',
	    	author: ''
	    };
	    this.toggleEdit = this.toggleEdit.bind(this);
	    this.updateBodyState = this.updateBodyState.bind(this);
	    this.saveComment = this.saveComment.bind(this);
	}

	toggleEdit(id, body) {
		this.setState({
			isEditing: !this.state.isEditing,
			editCommentId: id,
			body: body
		});
	}

	updateBodyState(body) {
	    this.setState({body});
	}

	saveComment(event) {
		event.preventDefault();
    	this.props.commentActions.updateComment(this.state.editCommentId, this.state.body);
    	this.setState({
    		isEditing: !this.state.isEditing,
			editCommentId: null,
			body: ''
    	});
	}

	render() {
		const { comments } = this.props;
		const { isEditing, body } = this.state;
		if( isEditing ) {
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
	                  	</div> 
	                   	<div className="comments-list">
	                   	{comments.map(comment => (
	                		<div className="media" key={ comment.id }>
	                        	<p className="pull-right"><small>{ comment.timestamp }</small></p>
	                        	<div className="media-body">
									<h4 className="media-heading user_name">{ comment.author }</h4>
		                            { comment.body }
		                            <p><small><span>{ comment.voteScore } Votes</span> - <a href="#">Up Vote</a> - <a href="#">Down Vote</a>
		                             - <button className="btn" onClick={(event) => this.toggleEdit(event.target.value, comment.body)} value={ comment.id }>edit</button></small></p>
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
