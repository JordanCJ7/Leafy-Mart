
// API service for backend communication
const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = () => {
	const token = localStorage.getItem('token');
	return {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
};

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

// Admin API functions
export async function getAllProducts() {
	const res = await fetch(`${API_BASE}/products`, {
		method: 'GET',
		headers: getAuthHeaders()
	});
	return res.json();
}

export async function addProduct(data) {
	const res = await fetch(`${API_BASE}/products`, {
		method: 'POST',
		headers: getAuthHeaders(),
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function updateProduct(id, data) {
	const res = await fetch(`${API_BASE}/products/${id}`, {
		method: 'PUT',
		headers: getAuthHeaders(),
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function deleteProduct(id) {
	const res = await fetch(`${API_BASE}/products/${id}`, {
		method: 'DELETE',
		headers: getAuthHeaders()
	});
	return res.json();
}

export async function getAllOrders() {
	const res = await fetch(`${API_BASE}/orders`, {
		method: 'GET',
		headers: getAuthHeaders()
	});
	return res.json();
}

export async function updateOrderStatus(id, status) {
	const res = await fetch(`${API_BASE}/orders/${id}/status`, {
		method: 'PATCH',
		headers: getAuthHeaders(),
		body: JSON.stringify({ status })
	});
	return res.json();
}

export async function getAllUsers() {
	const res = await fetch(`${API_BASE}/users`, {
		method: 'GET',
		headers: getAuthHeaders()
	});
	return res.json();
}

export async function getDashboardStats() {
	const res = await fetch(`${API_BASE}/admin/stats`, {
		method: 'GET',
		headers: getAuthHeaders()
	});
	return res.json();
}

export default API_BASE;
