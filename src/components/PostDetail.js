import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedDate } from 'react-intl';

class PostDetail extends Component {
	
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	isEditing: false,
	    	isAdding: false,
	    	editPostId: null,
	    	body: '',
	    	title: '',
	    	author: '',
	    	category: ''
	    };
	    
		this.toggleEdit = this.toggleEdit.bind(this);
		this.toggleAdd = this.toggleAdd.bind(this);
	   	this.votePost = this.votePost.bind(this);
	   	this.deletePost = this.deletePost.bind(this);
	   	this.updateBodyState = this.updateBodyState.bind(this);
	   	this.savePost = this.savePost.bind(this);

	}

	toggleEdit(id, title, body) {
		this.setState({
			isEditing: !this.state.isEditing,
			editPostId: id,
			body: body,
			title: title
		});
	}

	toggleAdd() {
		this.setState({
			isAdding: !this.state.isAdding
		});
	}

	savePost(event) {
		event.preventDefault();
		const { title, body, author, category } = this.state;
    	this.props.actions.createPost(title, body, author, category);
    	this.setState({
    		isAdding: !this.state.isAdding,
			editPostId: null,
			body: '',
			title: '',
			author: '',
			category: ''
    	});
	}

	updateBodyState(body) {
	    this.setState({body});
	}

	updateAuthorState(author) {
	    this.setState({author});
	}

	updateTitleState(title) {
	    this.setState({title});
	}

	updateCategoryState(category) {
	    this.setState({category});
	}

	votePost(id, option){
		this.props.actions.updateVote(id, option);
	}

	deletePost(id) {
		this.props.actions.removePost(id);
	}

	sortBy(option) {
		this.props.actions.postSortBy(option);
	}

	render() {
		const { posts, categories } = this.props;
		const { isEditing, isAdding, title, body, author  } = this.state;

		let loadAdd = <button className="btn" onClick={(event) => this.toggleAdd()} >Add Post</button>
		let sortByDate = <button className="btn" onClick={(event) => this.sortBy("date")} >Sort by Date</button>
		let sortByVote = <button className="btn" onClick={(event) => this.sortBy("vote")} >Sort by Vote score</button>
		
		if(this.props.match.params.post) {
			loadAdd = '';
			sortByDate = '';
			sortByVote = '';
		}

		if ( isAdding ) {
			return (
				<div className="row">
	                <div className="col-md-12">
	                	<div className="page-header">
	                    	<h4><small className="pull-right">Add Post</small></h4>
	                  	</div> 
	                   	<form>
	                   		<div className="form-group">
						      <label htmlFor="title">Title:</label>
						      <input type="text" className="form-control" id="title" 
						      value={title} onChange={(event) => this.updateTitleState(event.target.value)} />
						    </div>
	                   		<div className="form-group">
						      <label htmlFor="author">Author:</label>
						      <input type="text" className="form-control" id="author" 
						      value={author} onChange={(event) => this.updateAuthorState(event.target.value)} />
						    </div>
	                   		<div className="form-group">
						      <label htmlFor="category">Category:</label>
						      <select required id="category" onChange={(event) => this.updateCategoryState(event.target.value)}>
						      	<option value='' key='select' >Select</option>
								{categories.map(category => (
									<option value={category.name} key={category.name} >{category.name}</option>
								))}
						      </select>
						    </div>
						    <div className="form-group">
						      <label htmlFor="body">Body:</label>
						      <textarea className="form-control" rows="5" id="body"
						       value={ body } onChange={(event) => this.updateBodyState(event.target.value)} ></textarea>
						    </div>
						    <input
					            type="submit"
					            className="btn btn-primary"
					            onClick={(event) => this.savePost(event)}/> 
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
	                    	<h4><small className="pull-right">Edit Post</small></h4>
	                  	</div> 
	                   	<form>
	                   		<div className="form-group">
						      <label htmlFor="title">Title:</label>
						      <input type="text" className="form-control" id="title" 
						      value={title} onChange={(event) => this.updateTitleState(event.target.value)} />
						    </div>
						    <div className="form-group">
						      <label htmlFor="body">Body:</label>
						      <textarea className="form-control" rows="5" id="body"
						       value={ body } onChange={(event) => this.updateBodyState(event.target.value)} ></textarea>
						    </div>
						    <input
					            type="submit"
					            className="btn btn-primary"
					            onClick={(event) => this.savePost(event)}/> 
					        <button className="btn" onClick={(event) => this.toggleEdit(null, '', '')}>Cancel</button>
						</form>
	                </div>
	            </div>
	        )
		} else {
			return (
				<div>
				{loadAdd} {sortByDate} {sortByVote}
				{posts.map(post => (
					<div className="blog-post" key={post.id}>
						<h2 className="blog-post-title"><Link to={{ pathname: `/`+post.category+`/`+post.id }}>{ post.title }</Link></h2>
		              	<p className="blog-post-meta"><FormattedDate 
		              	  value={ post.timestamp } day="numeric"
						  month="long"
						  year="numeric" /> by { post.author }</p>
						<p>
						<small><span>{ post.voteScore } Votes</span> - 
	                    <button className="btn" onClick={(event) => this.votePost(post.id, 'upVote')} value={ post.id }>Up Vote</button> - 
						<button className="btn" onClick={(event) => this.votePost(post.id, 'downVote')} value={ post.id }>Down Vote</button> - 
						<button className="btn" onClick={(event) => this.toggleEdit(event.target.value, post.title, post.body)} value={ post.id }>Edit</button> -
						<button className="btn" onClick={(event) => this.deletePost(post.id)} value={ post.id }>Delete</button>
	                    </small>
						</p>
						<p>{ post.body }</p>
					</div>
				))}
				</div>
			)
		}
	}
}

export default PostDetail;