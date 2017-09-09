import postsApi from '../utils/postsApi';

export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const SORT_POST_BY = 'SORT_POST_BY';

export function loadPosts() {
	return function(dispatch) {
		return postsApi.getPosts()
		.then(response => {
			dispatch(loadPostsSuccess(response));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function loadPostsSuccess(posts) {
	return {
		type: LOAD_POSTS_SUCCESS,
		posts
	}
}

export function createPost(title, body, author, category) {
	return function(dispatch) {
		return postsApi.addPost(title, body, author, category)
		.then(response => {
			dispatch(addPost(response));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function addPost(response) {
	return {
		type: ADD_POST,
		response
	}
}

export function updatePost(id, title, body) {
	return function(dispatch) {
		return postsApi.updatePost(id, title, body)
		.then(response => {
			dispatch(editPost(id, response));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function editPost(id, response) {
	return {
		type: EDIT_POST,
		id,
		response
	}
}

export function removePost(id) {
	return function(dispatch) {
		return postsApi.deletePost(id)
		.then(response => {
			dispatch(deletePost(id, response));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function deletePost(id) {
	return {
		type: DELETE_POST,
		id
	}
}

export function updateVote(id, option) {
	return function(dispatch) {
		return postsApi.votePost(id, option)
		.then(response => {
			dispatch(votePost(id, response));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function votePost(id, response) {
	return {
		type: VOTE_POST,
		id,
		response
	}
}

export function postSortBy(option) {
	return function(dispatch) {
		return postsApi.getPosts()
		.then(response => {
			let posts;
			response = response.filter(post => post.deleted === false);
			if(option === 'vote') {
				posts = response.sort((postA, postB) => parseInt(postB.voteScore, 10) > parseInt(postA.voteScore, 10) );
			} else if(option === 'date') {
				posts = response.sort((postA, postB) => postB.timestamp > postA.timestamp );
			}
			dispatch(sortBy(posts));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function sortBy(posts) {
	return {
		type: SORT_POST_BY,
		posts
	}
}