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

const initialComments = {};

function comments(state = initialComments, action) {
	switch(action.type) {
		case LOAD_COMMENTS_SUCCESS:
			const { parentId, comments } = action;
			return {
				...state,
				[parentId]: comments
			}
		case ADD_COMMENT:
			return state;
		case EDIT_COMMENT:
			return state;
			/*{
		        ...state.filter(comment => comment.id !== action.comment.id),
		        Object.assign({}, action.comment)
		      }*/
		case DELETE_COMMENT:
			return state;
		case VOTE_COMMENT:
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