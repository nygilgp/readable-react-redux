import categoriesApi from '../utils/categoriesApi';
import * as types from './actionTypes';

export function loadCategoriesSuccess(categories) {
	return {
		type: types.LOAD_CATEGORIES_SUCCESS,
		categories
	}
}


export function loadCategories() {  
  return function(dispatch) {
    return categoriesApi.getCategories().then(res => {
    	dispatch(loadCategoriesSuccess(res.categories));
    }).catch(error => {
    	throw(error);
    });
  };
}