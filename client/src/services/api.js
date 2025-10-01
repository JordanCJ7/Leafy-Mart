// API service for Leafy Mart Management System
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
	const res = await fetch(`${API_BASE}/users/profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function updateUserProfile(data, token) {
	const res = await fetch(`${API_BASE}/users/profile`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function changePassword(data, token) {
	const res = await fetch(`${API_BASE}/users/profile/change-password`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function deleteUserProfile(token) {
	const res = await fetch(`${API_BASE}/users/profile`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function getUserOrderHistory(token, params = {}) {
	const queryParams = new URLSearchParams();
	if (params.page) queryParams.append('page', params.page);
	if (params.limit) queryParams.append('limit', params.limit);
	
	const url = `${API_BASE}/users/profile/orders${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

// Admin User Management
export async function getAllUsers(token, params = {}) {
	const queryParams = new URLSearchParams();
	if (params.page) queryParams.append('page', params.page);
	if (params.limit) queryParams.append('limit', params.limit);
	if (params.search) queryParams.append('search', params.search);
	if (params.role) queryParams.append('role', params.role);
	if (params.membershipLevel) queryParams.append('membershipLevel', params.membershipLevel);
	if (params.sortBy) queryParams.append('sortBy', params.sortBy);
	if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
	
	const url = `${API_BASE}/users/admin/users${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function getUserById(id, token) {
	const res = await fetch(`${API_BASE}/users/admin/users/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function updateUser(id, data, token) {
	const res = await fetch(`${API_BASE}/users/admin/users/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function deleteUser(id, token) {
	const res = await fetch(`${API_BASE}/users/admin/users/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function reactivateUser(id, token) {
	const res = await fetch(`${API_BASE}/users/admin/users/${id}/reactivate`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function resetUserPassword(id, data, token) {
	const res = await fetch(`${API_BASE}/users/admin/users/${id}/reset-password`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(data)
	});
	return res.json();
}

export async function getUserStats(token) {
	const res = await fetch(`${API_BASE}/users/admin/users/stats`, {
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

// Upload product image
export async function uploadProductImage(imageFile, token) {
	const formData = new FormData();
	// If imageFile is a Blob (no name), provide a filename derived from its MIME type so multer's fileFilter
	// can validate the extension. If the file has a name (File object), preserve it.
	let filename = undefined;
	if (imageFile && typeof imageFile === 'object' && 'name' in imageFile && imageFile.name) {
		filename = imageFile.name;
	} else if (imageFile && imageFile.type) {
		// map common mime types to extensions
		switch (imageFile.type) {
			case 'image/jpeg':
				filename = `upload.jpg`;
				break;
			case 'image/png':
				filename = `upload.png`;
				break;
			case 'image/gif':
				filename = `upload.gif`;
				break;
			case 'image/webp':
				filename = `upload.webp`;
				break;
			default:
				filename = `upload`;
		}
	}
	if (filename) {
		formData.append('image', imageFile, filename);
	} else {
		formData.append('image', imageFile);
	}
	
	const res = await fetch(`${API_BASE}/products/upload`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`
		},
		body: formData
	});
	return res.json();
}

// Order Management
export async function createOrder(orderData, token) {
	const res = await fetch(`${API_BASE}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(orderData)
	});
	return res.json();
}

export async function getUserOrders(token, params = {}) {
	const queryParams = new URLSearchParams();
	if (params.page) queryParams.append('page', params.page);
	if (params.limit) queryParams.append('limit', params.limit);
	if (params.status) queryParams.append('status', params.status);
	
	const url = `${API_BASE}/orders/user${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function getOrderById(orderId, token) {
	const res = await fetch(`${API_BASE}/orders/${orderId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function updateOrderStatus(orderId, status, token) {
	const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({ status })
	});
	return res.json();
}

export async function cancelOrder(orderId, token) {
	const res = await fetch(`${API_BASE}/orders/${orderId}/cancel`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

// Admin Order Management
export async function getAllOrders(token, params = {}) {
	const queryParams = new URLSearchParams();
	if (params.page) queryParams.append('page', params.page);
	if (params.limit) queryParams.append('limit', params.limit);
	if (params.status) queryParams.append('status', params.status);
	if (params.paymentStatus) queryParams.append('paymentStatus', params.paymentStatus);
	if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
	if (params.dateTo) queryParams.append('dateTo', params.dateTo);
	
	const url = `${API_BASE}/orders${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function getOrderStats(token) {
	const res = await fetch(`${API_BASE}/orders/stats`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function updateOrderStatusAdmin(orderId, statusData, token) {
	const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(statusData)
	});
	return res.json();
}

export async function updatePaymentStatus(orderId, paymentData, token) {
	const res = await fetch(`${API_BASE}/orders/${orderId}/payment`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(paymentData)
	});
	return res.json();
}

export async function requestOrderFeedback(orderId, token) {
	const res = await fetch(`${API_BASE}/orders/${orderId}/feedback-request`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function bulkUpdateOrderStatus(orderIds, statusData, token) {
	const res = await fetch(`${API_BASE}/orders/bulk/status`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({ orderIds, ...statusData })
	});
	return res.json();
}

// Feedback Management
export async function createFeedback(orderId, feedbackData, token) {
	const res = await fetch(`${API_BASE}/feedback/order/${orderId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(feedbackData)
	});
	return res.json();
}

export async function getFeedbackByOrder(orderId, token) {
	const res = await fetch(`${API_BASE}/feedback/order/${orderId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function getCustomerFeedback(token, params = {}) {
	const queryParams = new URLSearchParams();
	if (params.page) queryParams.append('page', params.page);
	if (params.limit) queryParams.append('limit', params.limit);
	
	const url = `${API_BASE}/feedback/customer${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function getProductFeedback(productId, params = {}) {
	const queryParams = new URLSearchParams();
	if (params.page) queryParams.append('page', params.page);
	if (params.limit) queryParams.append('limit', params.limit);
	
	const url = `${API_BASE}/feedback/product/${productId}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
	const res = await fetch(url, {
		method: 'GET'
	});
	return res.json();
}

export async function getAllFeedback(token, params = {}) {
	const queryParams = new URLSearchParams();
	if (params.page) queryParams.append('page', params.page);
	if (params.limit) queryParams.append('limit', params.limit);
	if (params.status) queryParams.append('status', params.status);
	if (params.rating) queryParams.append('rating', params.rating);
	if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
	if (params.dateTo) queryParams.append('dateTo', params.dateTo);
	
	const url = `${API_BASE}/feedback${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function getFeedbackStats(token) {
	const res = await fetch(`${API_BASE}/feedback/stats`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function updateFeedbackStatus(feedbackId, statusData, token) {
	const res = await fetch(`${API_BASE}/feedback/${feedbackId}/status`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(statusData)
	});
	return res.json();
}

export async function voteFeedbackHelpful(feedbackId) {
	const res = await fetch(`${API_BASE}/feedback/${feedbackId}/helpful`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return res.json();
}

// Admin feedback functions
export async function getAllFeedbackAdmin(token, params = {}) {
	const queryString = new URLSearchParams(params).toString();
	const res = await fetch(`${API_BASE}/feedback/admin${queryString ? `?${queryString}` : ''}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function getFeedbackStatsAdmin(token) {
	const res = await fetch(`${API_BASE}/feedback/admin/stats`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

// Cart Management (if you want server-side cart persistence)
export async function saveCartToServer(cartData, token) {
	const res = await fetch(`${API_BASE}/cart`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({ items: cartData })
	});
	return res.json();
}

export async function getCartFromServer(token) {
	const res = await fetch(`${API_BASE}/cart`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function clearCartOnServer(token) {
	const res = await fetch(`${API_BASE}/cart`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

// Wishlist Management (if you want server-side wishlist persistence)
export async function saveWishlistToServer(wishlistData, token) {
	const res = await fetch(`${API_BASE}/wishlist`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({ items: wishlistData })
	});
	return res.json();
}

export async function getWishlistFromServer(token) {
	const res = await fetch(`${API_BASE}/wishlist`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return res.json();
}

export async function clearWishlistOnServer(token) {
	const res = await fetch(`${API_BASE}/wishlist`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
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
