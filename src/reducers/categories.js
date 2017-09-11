import * as types from '../actions/actionTypes';

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

export default function categories(state = initialCategories, action) {
	switch(action.type) {
		case types.LOAD_CATEGORIES_SUCCESS:
			return action.categories;
		default: 
			return initialCategories;
	}
}