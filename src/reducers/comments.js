import * as types from '../actions/actionTypes';

const initialComments = {};

export default function comments(state = initialComments, action) {
	switch(action.type) {
		case types.LOAD_COMMENTS_SUCCESS:
			let { parentId, comments } = action;
			return {
				...state,
				[parentId]: comments
			}
		case types.ADD_COMMENT:
			state[action.parentId].push(action.response);
			return {
				...state
			};
		case types.EDIT_COMMENT:
		case types.VOTE_COMMENT:
			parentId = action.response.parentId;
			let commentIndex = state[parentId].findIndex((comment, index) => comment.id === action.id);
			state[parentId][commentIndex] = action.response;
			return {
				...state
			};
		case types.DELETE_COMMENT:
			parentId = action.parentId;
			commentIndex = state[parentId].findIndex((comment, index) => comment.id === action.id);
			state[parentId].splice(commentIndex, 1);
			return {
				...state
			};
		default:
			return state;
	}
}