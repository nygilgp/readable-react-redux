import { API_URL, AUTHORIZATION_PARAM, generateQuickGuid } from './';

class postsApi {
	
	static getPosts(category = null) {
		const urlParam = category === null ? 'posts' : `${category}/posts`;
		return fetch(`${API_URL}/${urlParam}`, { 
			headers: { 
				'Authorization': `${AUTHORIZATION_PARAM}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.catch(err => console.log(err));
	}

	static votePost(id, option) {
		return fetch(`${API_URL}/posts/${id}`, { 
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

	static addPost(title, body, author, category) {
		const uuid = generateQuickGuid();
		const timestamp = Date.now();
		return fetch(`${API_URL}/posts/`, { 
			headers: { 
				'Authorization': `${AUTHORIZATION_PARAM}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},  
			method: 'POST',
			body: `{ 
				"id": "${uuid}",
				"timestamp": ${timestamp},
				"title": "${title}",
				"body": "${body}",
				"author": "${author}",
				"category": "${category}"
			}`
		})
		.then(res => res.json())
		.catch(err => console.log(err));
	}


	static updatePost(id, title, body) {
		return fetch(`${API_URL}/posts/${id}`, { 
			headers: { 
				'Authorization': `${AUTHORIZATION_PARAM}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},  
			method: 'PUT',
			body: `{ 
				"title": "${title}",
				"body": "${body}"
			}`
		})
		.then(res => res.json())
		.catch(err => console.log(err));
	}


	static deletePost(id) {
		return fetch(`${API_URL}/posts/${id}`, { 
			headers: { 
				'Authorization': `${AUTHORIZATION_PARAM}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'DELETE'
		})
		//.then(res => res)
		.catch(err => console.log(err));
	}
}

export default postsApi;

	

