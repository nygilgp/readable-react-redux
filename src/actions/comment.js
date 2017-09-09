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

export function createComment(body, author, parentId) {
	return function(dispatch) {
		return commentsApi.addComment(parentId, body, author)
		.then(response => {
			dispatch(addComment(parentId, response));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function addComment(parentId, response) {
	return {
		type: ADD_COMMENT,
		parentId,
		response
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

export function removeComment(id, parentId) {
	return function(dispatch) {
		return commentsApi.deleteComment(id)
		.then(response => {
			dispatch(deleteComment(id, parentId, response));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function deleteComment(id, parentId, response) {
	return {
		type: DELETE_COMMENT,
		id,
		parentId,
		response
	}
}

export function updateVote(id, option) {
	return function(dispatch) {
		return commentsApi.voteComment(id, option)
		.then(response => {
			dispatch(voteComment(id, response));
		})
		.catch(error => {
			throw(error)
		});
	}
}

export function voteComment(id, response) {
	return {
		type: VOTE_COMMENT,
		id,
		response
	}
}