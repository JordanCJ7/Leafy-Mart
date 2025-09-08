
// API service for backend communication
const API_BASE = 'http://localhost:5000/api';

export async function registerUser(data) {
	const res = await fetch(`${API_BASE}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function loginUser(data) {
	const res = await fetch(`${API_BASE}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return res.json();
}


export async function getUserProfile(id, token) {
	const res = await fetch(`${API_BASE}/users/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export default API_BASE;
