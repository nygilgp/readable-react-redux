import { API_URL, AUTHORIZATION_PARAM, generateQuickGuid } from './';

class commentsApi {

	static getPostComments(id) {
		return fetch(`${API_URL}/posts/${id}/comments`, { 
			headers: { 
				'Authorization': `${AUTHORIZATION_PARAM}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.catch(err => console.log(err));
	}


	static voteComment(id, option) {
		return fetch(`${API_URL}/comments/${id}`, { 
			headers: { 
				'Authorization': `${AUTHORIZATION_PARAM}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},  
			method: 'POST',
			body: `{ "option": "${option}" }`
		})
		.then(res => res.json())
		.catch(err => console.log(err));
	}

	static addComment(parentId, body, author) {
		const uuid = generateQuickGuid();
		const timestamp = Date.now();
		return fetch(`${API_URL}/comments/`, { 
			headers: { 
				'Authorization': `${AUTHORIZATION_PARAM}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},  
			method: 'POST',
			body: `{ 
				"id": "${uuid}",
				"timestamp": ${timestamp},
				"body": "${body}",
				"author": "${author}",
				"parentId": "${parentId}"
			}`
		})
		.then(res => res.json())
		.catch(err => console.log(err));
	}


	static updateComment(id, body) {
		const timestamp = Date.now();
		return fetch(`${API_URL}/comments/${id}`, { 
			headers: { 
				'Authorization': `${AUTHORIZATION_PARAM}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},  
			method: 'PUT',
			body: `{ 
				"timestamp": ${timestamp},
				"body": "${body}"
			}`
		})
		.then(res => res.json())
		.catch(err => console.log(err));
	}

	static deleteComment(id) {
		return fetch(`${API_URL}/comments/${id}`, { 
			headers: { 
				'Authorization': `${AUTHORIZATION_PARAM}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'DELETE'
		})
		.then(res => res)
		.catch(err => console.log(err));
	}
}

export default commentsApi;

