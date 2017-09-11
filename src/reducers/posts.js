import * as types from '../actions/actionTypes';

const initialPosts = [];

export default function posts(state = initialPosts, action) {
	switch(action.type) {
		case types.LOAD_POSTS_SUCCESS:
			return action.posts.filter(post => post.deleted === false);
		case types.ADD_POST:
			state.push(action.response);
			return [
				...state
			];
		case types.DELETE_POST:
			let postIndex = state.findIndex((post) => post.id === action.id);
			state.splice(postIndex, 1);
			return [
				...state
			];
		case types.EDIT_POST:
		case types.VOTE_POST:
			postIndex = state.findIndex((post) => post.id === action.id);
			state[postIndex] = action.response;
			return [
				...state
			];
		case types.SORT_POST_BY:
			return action.posts.filter(post => post.deleted === false);
		default:
			return state;
	}
}