import commentsApi from '../utils/commentsApi';

export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';


export function loadComments(postId) {
	return function(dispatch) {
		return commentsApi.getPostComments(postId)
		.then(response => {
			dispatch(loadCommentsSuccess(postId, response));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function loadCommentsSuccess(parentId, comments) {
	return {
		type: LOAD_COMMENTS_SUCCESS,
		parentId,
		comments
	}
}

export function addComment({ body, author, parentId }) {
	return {
		type: ADD_COMMENT,
		body,
		author,
		parentId
	}
}

export function updateComment(id, body) {
	return function(dispatch) {
		return commentsApi.updateComment(id, body)
		.then(response => {
			dispatch(editComment(id, response));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function editComment(id, response) {
	return {
		type: EDIT_COMMENT,
		id,
		response
	}
}

export function deleteComment({ id }) {
	return {
		type: DELETE_COMMENT,
		id
	}
}

export function voteComment({ id, option }) {
	return {
		type: VOTE_COMMENT,
		id,
		option
	}
}