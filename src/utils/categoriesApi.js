import { API_URL, AUTHORIZATION_PARAM } from './';

class categoriesApi {

	static getCategories() {
		return fetch(`${API_URL}/categories`, { 
			headers: { 
				'Authorization': `${AUTHORIZATION_PARAM}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.catch(error => {
			console.log(error);
			return error;
		});
	}

}

export default categoriesApi;