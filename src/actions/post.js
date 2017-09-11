import postsApi from '../utils/postsApi';
import * as types from './actionTypes';

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
		type: types.LOAD_POSTS_SUCCESS,
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
		type: types.ADD_POST,
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
		type: types.EDIT_POST,
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
		type: types.DELETE_POST,
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
		type: types.VOTE_POST,
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
		type: types.SORT_POST_BY,
		posts
	}
}