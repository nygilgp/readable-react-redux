import { combineReducers } from 'redux';
import { LOAD_CATEGORIES_SUCCESS } from '../actions/category'
import { LOAD_POSTS_SUCCESS, ADD_POST, EDIT_POST, DELETE_POST, VOTE_POST } from '../actions/post'
import { LOAD_COMMENTS_SUCCESS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, VOTE_COMMENT } from '../actions/comment'

const initialCategories = [{
      name: 'react',
      path: 'react'
    },
    {
      name: 'redux',
      path: 'redux'
    },
    {
      name: 'udacity',
      path: 'udacity'
    }];

function categories(state = initialCategories, action) {
	switch(action.type) {
		case LOAD_CATEGORIES_SUCCESS:
			return action.categories;
		default: 
			return initialCategories;
	}
}

const initialComments = {};

function comments(state = initialComments, action) {
	switch(action.type) {
		case LOAD_COMMENTS_SUCCESS:
			let { parentId, comments } = action;
			return {
				...state,
				[parentId]: comments
			}
		case ADD_COMMENT:
			state[action.parentId].push(action.response);
			return {
				...state
			};
		case EDIT_COMMENT:
		case VOTE_COMMENT:
			parentId = action.response.parentId;
			let commentIndex = state[parentId].findIndex((comment, index) => comment.id === action.id);
			state[parentId][commentIndex] = action.response;
			return {
				...state
			};
		case DELETE_COMMENT:
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

const initialPosts = [];

function posts(state = initialPosts, action) {
	switch(action.type) {
		case LOAD_POSTS_SUCCESS:
			return action.posts;
		case ADD_POST:
			return state;
		case EDIT_POST:
			return state;
		case DELETE_POST:
			return state;
		case VOTE_POST:
			return state;
		default:
			return state;
	}
}

export default combineReducers({
  categories,
  posts,
  comments
});