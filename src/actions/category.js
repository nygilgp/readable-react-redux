import categoriesApi from '../utils/categoriesApi';

export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';

export function loadCategoriesSuccess(categories) {
	return {
		type: LOAD_CATEGORIES_SUCCESS,
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