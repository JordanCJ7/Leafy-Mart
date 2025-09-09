// API service for Plant Store Management System
const API_BASE = 'http://localhost:5000/api';

// Customer Authentication
export async function registerCustomer(data) {
	const res = await fetch(`${API_BASE}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function loginCustomer(data) {
	const res = await fetch(`${API_BASE}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function getUserProfile(token) {
	const res = await fetch(`${API_BASE}/auth/profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

// Admin Authentication
export async function adminLogin(data) {
	const res = await fetch(`${API_BASE}/auth/admin/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function verifyAdminToken(token) {
	const res = await fetch(`${API_BASE}/auth/admin/verify`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

// Customer Management
export async function createCustomer(data) {
	const res = await fetch(`${API_BASE}/customers`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function getAllCustomers(params = {}) {
	const queryParams = new URLSearchParams();
	if (params.page) queryParams.append('page', params.page);
	if (params.limit) queryParams.append('limit', params.limit);
	if (params.search) queryParams.append('search', params.search);
	
	const url = `${API_BASE}/customers${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
	const res = await fetch(url);
	return res.json();
}

export async function getCustomerById(id) {
	const res = await fetch(`${API_BASE}/customers/${id}`);
	return res.json();
}

export async function updateCustomer(id, data) {
	const res = await fetch(`${API_BASE}/customers/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function deleteCustomer(id, token) {
	const res = await fetch(`${API_BASE}/customers/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function getCustomerStats(token) {
	const res = await fetch(`${API_BASE}/customers/stats`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

// Order Management
export async function processPurchase(data) {
	const res = await fetch(`${API_BASE}/customers/purchase`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return res.json();
}

// Products (existing functionality)
export async function getAllProducts() {
	const res = await fetch(`${API_BASE}/products`);
	return res.json();
}

export async function getProductById(id) {
	const res = await fetch(`${API_BASE}/products/${id}`);
	return res.json();
}

// Admin Dashboard
export async function getDashboardStats(token) {
	const res = await fetch(`${API_BASE}/admin/dashboard`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export default API_BASE;
