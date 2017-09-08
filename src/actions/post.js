import postsApi from '../utils/postsApi';

export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';

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

export function addPost({ title, body, author, category }) {
	return {
		type: ADD_POST,
		title,
		body,
		author,
		category
	}
}

export function editPost({ id, title, body }) {
	return {
		type: EDIT_POST,
		id,
		title,
		body
	}
}

export function deletePost({ id }) {
	return {
		type: DELETE_POST,
		id
	}
}

export function votePost({ id, option }) {
	return {
		type: VOTE_POST,
		id,
		option
	}
}