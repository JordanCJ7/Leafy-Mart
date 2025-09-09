import React, { useState, useEffect } from 'react';
import { 
	Package, 
	Users, 
	ShoppingCart, 
	TrendingUp, 
	Plus, 
	Edit3, 
	Trash2, 
	Search,
	Filter,
	Eye,
	DollarSign,
	AlertTriangle
} from 'lucide-react';
import { 
	getAllProducts, 
	getAllOrders, 
	getAllUsers, 
	getDashboardStats,
	updateOrderStatus
} from '../services/api';

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState('overview');
	const [products, setProducts] = useState([]);
	const [orders, setOrders] = useState([]);
	const [users, setUsers] = useState([]);
	const [stats, setStats] = useState({});
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			// Fetch all data
			const [productsRes, ordersRes, usersRes, statsRes] = await Promise.all([
				getAllProducts(),
				getAllOrders(),
				getAllUsers(),
				getDashboardStats()
			]);

			setProducts(productsRes.error ? [] : productsRes);
			setOrders(ordersRes.error ? [] : ordersRes);
			setUsers(usersRes.error ? [] : usersRes);
			setStats(statsRes.error ? {} : statsRes);
		} catch (error) {
			console.error('Error fetching admin data:', error);
			// Set mock data as fallback
			setProducts([
				{ id: 1, name: 'Tulsi (Holy Basil)', price: 1200, stock: 24, category: 'Herbs', status: 'active' },
				{ id: 2, name: 'Money Plant', price: 1800, stock: 40, category: 'Indoor Vines', status: 'active' },
				{ id: 3, name: 'Snake Plant', price: 3000, stock: 15, category: 'Air Purifiers', status: 'active' },
				{ id: 4, name: 'Peace Lily', price: 2500, stock: 8, category: 'Flowering', status: 'low-stock' },
			]);
			setOrders([
				{ id: 'ORD001', customer: 'John Doe', total: 4200, status: 'pending', date: '2025-09-08' },
				{ id: 'ORD002', customer: 'Jane Smith', total: 1800, status: 'shipped', date: '2025-09-07' },
				{ id: 'ORD003', customer: 'Bob Johnson', total: 5500, status: 'delivered', date: '2025-09-06' },
			]);
			setUsers([
				{ id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, joined: '2025-01-15' },
				{ id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, joined: '2025-02-20' },
				{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 7, joined: '2024-12-10' },
			]);
			setStats({
				totalUsers: 3,
				totalProducts: 4,
				totalOrders: 3,
				totalRevenue: 11500
			});
		}
		setLoading(false);
	};

	const handleOrderStatusChange = async (orderId, newStatus) => {
		try {
			await updateOrderStatus(orderId, newStatus);
			// Refresh orders
			const ordersRes = await getAllOrders();
			setOrders(ordersRes.error ? orders : ordersRes);
		} catch (error) {
			console.error('Error updating order status:', error);
		}
	};

	const filteredProducts = products.filter(product => 
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const filteredOrders = orders.filter(order => 
		(order.id || order._id).toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		(order.customer || order.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
	);

	const filteredUsers = users.filter(user => 
		user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
				<div style={{ color: '#388e3c', fontSize: '1.2rem' }}>Loading dashboard...</div>
			</div>
		);
	}

	return (
		<div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
			{/* Dashboard Header */}
			<div style={{ marginBottom: '2rem' }}>
				<h1 style={{ color: '#388e3c', fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
					Admin Dashboard
				</h1>
				<p style={{ color: '#666', fontSize: '1.1rem' }}>
					Manage your plant store efficiently
				</p>
			</div>

			{/* Quick Stats */}
			<div style={{ 
				display: 'grid', 
				gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
				gap: '1.5rem', 
				marginBottom: '2rem' 
			}}>
				<div style={{
					background: '#fff',
					padding: '1.5rem',
					borderRadius: '1rem',
					boxShadow: '0 2px 16px rgba(56, 142, 60, 0.1)',
					border: '1px solid #e8f5e8'
				}}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<div>
							<h3 style={{ color: '#388e3c', margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
								{stats.totalProducts || products.length}
							</h3>
							<p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Total Products</p>
						</div>
						<Package size={32} style={{ color: '#388e3c' }} />
					</div>
				</div>

				<div style={{
					background: '#fff',
					padding: '1.5rem',
					borderRadius: '1rem',
					boxShadow: '0 2px 16px rgba(56, 142, 60, 0.1)',
					border: '1px solid #e8f5e8'
				}}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<div>
							<h3 style={{ color: '#388e3c', margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
								{stats.totalOrders || orders.length}
							</h3>
							<p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Total Orders</p>
						</div>
						<ShoppingCart size={32} style={{ color: '#388e3c' }} />
					</div>
				</div>

				<div style={{
					background: '#fff',
					padding: '1.5rem',
					borderRadius: '1rem',
					boxShadow: '0 2px 16px rgba(56, 142, 60, 0.1)',
					border: '1px solid #e8f5e8'
				}}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<div>
							<h3 style={{ color: '#388e3c', margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
								{stats.totalUsers || users.length}
							</h3>
							<p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Total Customers</p>
						</div>
						<Users size={32} style={{ color: '#388e3c' }} />
					</div>
				</div>

				<div style={{
					background: '#fff',
					padding: '1.5rem',
					borderRadius: '1rem',
					boxShadow: '0 2px 16px rgba(56, 142, 60, 0.1)',
					border: '1px solid #e8f5e8'
				}}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<div>
							<h3 style={{ color: '#388e3c', margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
								LKR {(stats.totalRevenue || orders.reduce((sum, order) => sum + (order.total || 0), 0)).toLocaleString()}
							</h3>
							<p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Total Revenue</p>
						</div>
						<DollarSign size={32} style={{ color: '#388e3c' }} />
					</div>
				</div>
			</div>

			{/* Navigation Tabs */}
			<div style={{ 
				borderBottom: '2px solid #e8f5e8', 
				marginBottom: '2rem',
				display: 'flex',
				gap: '2rem'
			}}>
				{[
					{ key: 'overview', label: 'Overview', icon: TrendingUp },
					{ key: 'products', label: 'Products', icon: Package },
					{ key: 'orders', label: 'Orders', icon: ShoppingCart },
					{ key: 'customers', label: 'Customers', icon: Users }
				].map(tab => {
					const Icon = tab.icon;
					return (
						<button
							key={tab.key}
							onClick={() => setActiveTab(tab.key)}
							style={{
								background: 'none',
								border: 'none',
								padding: '1rem 0',
								color: activeTab === tab.key ? '#388e3c' : '#666',
								borderBottom: activeTab === tab.key ? '3px solid #388e3c' : '3px solid transparent',
								fontWeight: activeTab === tab.key ? 'bold' : 'normal',
								fontSize: '1rem',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								transition: 'all 0.3s ease'
							}}
						>
							<Icon size={18} />
							{tab.label}
						</button>
					);
				})}
			</div>

			{/* Tab Content */}
			{activeTab !== 'overview' && (
				<div style={{ marginBottom: '2rem' }}>
					<div style={{ 
						display: 'flex', 
						justifyContent: 'space-between', 
						alignItems: 'center',
						gap: '1rem',
						flexWrap: 'wrap'
					}}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '300px' }}>
							<div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
								<Search size={18} style={{ 
									position: 'absolute', 
									left: '0.75rem', 
									top: '50%', 
									transform: 'translateY(-50%)',
									color: '#666'
								}} />
								<input
									type="text"
									placeholder={`Search ${activeTab}...`}
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									style={{
										width: '100%',
										padding: '0.75rem 0.75rem 0.75rem 2.5rem',
										border: '2px solid #e8f5e8',
										borderRadius: '0.5rem',
										fontSize: '1rem',
										outline: 'none',
										transition: 'border-color 0.3s ease'
									}}
									onFocus={(e) => e.target.style.borderColor = '#388e3c'}
									onBlur={(e) => e.target.style.borderColor = '#e8f5e8'}
								/>
							</div>
						</div>
						
						{activeTab === 'products' && (
							<button style={{
								background: '#388e3c',
								color: '#fff',
								border: 'none',
								padding: '0.75rem 1.5rem',
								borderRadius: '0.5rem',
								fontSize: '1rem',
								fontWeight: 'bold',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								transition: 'background-color 0.3s ease'
							}}
							onMouseOver={(e) => e.target.style.backgroundColor = '#2e7d32'}
							onMouseOut={(e) => e.target.style.backgroundColor = '#388e3c'}
							>
								<Plus size={18} />
								Add Product
							</button>
						)}
					</div>
				</div>
			)}

			{/* Tab Content */}
			<div>
				{activeTab === 'overview' && (
					<div style={{ 
						display: 'grid', 
						gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
						gap: '2rem' 
					}}>
						{/* Recent Orders */}
						<div style={{
							background: '#fff',
							padding: '1.5rem',
							borderRadius: '1rem',
							boxShadow: '0 2px 16px rgba(56, 142, 60, 0.1)',
							border: '1px solid #e8f5e8'
						}}>
							<h3 style={{ color: '#388e3c', marginBottom: '1rem', fontSize: '1.3rem' }}>
								Recent Orders
							</h3>
							{(stats.recentOrders || orders.slice(0, 3)).map(order => (
								<div key={order.id || order._id} style={{ 
									padding: '0.75rem 0', 
									borderBottom: '1px solid #f5f5f5',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<div>
										<div style={{ fontWeight: 'bold', color: '#333' }}>{order.id || order._id}</div>
										<div style={{ color: '#666', fontSize: '0.9rem' }}>{order.customer || order.user?.name}</div>
									</div>
									<div style={{ textAlign: 'right' }}>
										<div style={{ fontWeight: 'bold', color: '#388e3c' }}>
											LKR {(order.total || 0).toLocaleString()}
										</div>
										<div style={{ 
											color: order.status === 'delivered' ? '#4caf50' : 
											       order.status === 'shipped' ? '#ff9800' : '#2196f3',
											fontSize: '0.8rem',
											textTransform: 'capitalize'
										}}>
											{order.status}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Low Stock Alert */}
						<div style={{
							background: '#fff',
							padding: '1.5rem',
							borderRadius: '1rem',
							boxShadow: '0 2px 16px rgba(56, 142, 60, 0.1)',
							border: '1px solid #e8f5e8'
						}}>
							<h3 style={{ color: '#ff9800', marginBottom: '1rem', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
								<AlertTriangle size={20} />
								Low Stock Alert
							</h3>
							{(stats.lowStockProducts || products.filter(p => p.stock < 10)).map(product => (
								<div key={product.id || product._id} style={{ 
									padding: '0.75rem 0', 
									borderBottom: '1px solid #f5f5f5',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<div>
										<div style={{ fontWeight: 'bold', color: '#333' }}>{product.name}</div>
										<div style={{ color: '#666', fontSize: '0.9rem' }}>{product.category}</div>
									</div>
									<div style={{ 
										color: '#ff5722',
										fontWeight: 'bold',
										fontSize: '0.9rem'
									}}>
										{product.stock} left
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{activeTab === 'products' && (
					<div style={{
						background: '#fff',
						borderRadius: '1rem',
						boxShadow: '0 2px 16px rgba(56, 142, 60, 0.1)',
						border: '1px solid #e8f5e8',
						overflow: 'hidden'
					}}>
						<div style={{ overflowX: 'auto' }}>
							<table style={{ width: '100%', borderCollapse: 'collapse' }}>
								<thead>
									<tr style={{ backgroundColor: '#f8f9fa' }}>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Product</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Category</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Price</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Stock</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Status</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredProducts.map(product => (
										<tr key={product.id || product._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
											<td style={{ padding: '1rem', fontWeight: 'bold' }}>{product.name}</td>
											<td style={{ padding: '1rem', color: '#666' }}>{product.category}</td>
											<td style={{ padding: '1rem', color: '#388e3c', fontWeight: 'bold' }}>
												LKR {(product.price || 0).toLocaleString()}
											</td>
											<td style={{ padding: '1rem' }}>
												<span style={{ 
													color: product.stock < 10 ? '#ff5722' : '#4caf50',
													fontWeight: 'bold'
												}}>
													{product.stock}
												</span>
											</td>
											<td style={{ padding: '1rem' }}>
												<span style={{
													padding: '0.25rem 0.75rem',
													borderRadius: '1rem',
													fontSize: '0.8rem',
													backgroundColor: (product.status === 'active' || product.stock >= 10) ? '#e8f5e8' : '#fff3e0',
													color: (product.status === 'active' || product.stock >= 10) ? '#388e3c' : '#ff9800',
													textTransform: 'capitalize'
												}}>
													{product.stock < 10 ? 'Low Stock' : (product.status || 'Active')}
												</span>
											</td>
											<td style={{ padding: '1rem' }}>
												<div style={{ display: 'flex', gap: '0.5rem' }}>
													<button style={{
														background: 'none',
														border: '1px solid #2196f3',
														color: '#2196f3',
														padding: '0.5rem',
														borderRadius: '0.25rem',
														cursor: 'pointer',
														display: 'flex',
														alignItems: 'center'
													}}>
														<Eye size={14} />
													</button>
													<button style={{
														background: 'none',
														border: '1px solid #ff9800',
														color: '#ff9800',
														padding: '0.5rem',
														borderRadius: '0.25rem',
														cursor: 'pointer',
														display: 'flex',
														alignItems: 'center'
													}}>
														<Edit3 size={14} />
													</button>
													<button style={{
														background: 'none',
														border: '1px solid #f44336',
														color: '#f44336',
														padding: '0.5rem',
														borderRadius: '0.25rem',
														cursor: 'pointer',
														display: 'flex',
														alignItems: 'center'
													}}>
														<Trash2 size={14} />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{activeTab === 'orders' && (
					<div style={{
						background: '#fff',
						borderRadius: '1rem',
						boxShadow: '0 2px 16px rgba(56, 142, 60, 0.1)',
						border: '1px solid #e8f5e8',
						overflow: 'hidden'
					}}>
						<div style={{ overflowX: 'auto' }}>
							<table style={{ width: '100%', borderCollapse: 'collapse' }}>
								<thead>
									<tr style={{ backgroundColor: '#f8f9fa' }}>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Order ID</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Customer</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Total</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Status</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Date</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredOrders.map(order => (
										<tr key={order.id || order._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
											<td style={{ padding: '1rem', fontWeight: 'bold' }}>{order.id || order._id}</td>
											<td style={{ padding: '1rem' }}>{order.customer || order.user?.name}</td>
											<td style={{ padding: '1rem', color: '#388e3c', fontWeight: 'bold' }}>
												LKR {(order.total || 0).toLocaleString()}
											</td>
											<td style={{ padding: '1rem' }}>
												<span style={{
													padding: '0.25rem 0.75rem',
													borderRadius: '1rem',
													fontSize: '0.8rem',
													backgroundColor: order.status === 'delivered' ? '#e8f5e8' : 
													                 order.status === 'shipped' ? '#fff3e0' : '#e3f2fd',
													color: order.status === 'delivered' ? '#388e3c' : 
													       order.status === 'shipped' ? '#ff9800' : '#2196f3',
													textTransform: 'capitalize'
												}}>
													{order.status}
												</span>
											</td>
											<td style={{ padding: '1rem', color: '#666' }}>
												{order.date || new Date(order.createdAt).toLocaleDateString()}
											</td>
											<td style={{ padding: '1rem' }}>
												<div style={{ display: 'flex', gap: '0.5rem' }}>
													<button style={{
														background: 'none',
														border: '1px solid #2196f3',
														color: '#2196f3',
														padding: '0.5rem',
														borderRadius: '0.25rem',
														cursor: 'pointer',
														display: 'flex',
														alignItems: 'center'
													}}>
														<Eye size={14} />
													</button>
													<select 
														value={order.status}
														onChange={(e) => handleOrderStatusChange(order.id || order._id, e.target.value)}
														style={{
															border: '1px solid #388e3c',
															color: '#388e3c',
															padding: '0.25rem 0.5rem',
															borderRadius: '0.25rem',
															fontSize: '0.8rem'
														}}
													>
														<option value="pending">Pending</option>
														<option value="shipped">Shipped</option>
														<option value="delivered">Delivered</option>
														<option value="cancelled">Cancelled</option>
													</select>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{activeTab === 'customers' && (
					<div style={{
						background: '#fff',
						borderRadius: '1rem',
						boxShadow: '0 2px 16px rgba(56, 142, 60, 0.1)',
						border: '1px solid #e8f5e8',
						overflow: 'hidden'
					}}>
						<div style={{ overflowX: 'auto' }}>
							<table style={{ width: '100%', borderCollapse: 'collapse' }}>
								<thead>
									<tr style={{ backgroundColor: '#f8f9fa' }}>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Name</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Email</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Admin</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Joined</th>
										<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredUsers.map(user => (
										<tr key={user.id || user._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
											<td style={{ padding: '1rem', fontWeight: 'bold' }}>{user.name}</td>
											<td style={{ padding: '1rem', color: '#666' }}>{user.email}</td>
											<td style={{ padding: '1rem' }}>
												<span style={{
													padding: '0.25rem 0.75rem',
													borderRadius: '1rem',
													fontSize: '0.8rem',
													backgroundColor: user.isAdmin ? '#e8f5e8' : '#f5f5f5',
													color: user.isAdmin ? '#388e3c' : '#666'
												}}>
													{user.isAdmin ? 'Yes' : 'No'}
												</span>
											</td>
											<td style={{ padding: '1rem', color: '#666' }}>
												{user.joined || new Date(user.createdAt).toLocaleDateString()}
											</td>
											<td style={{ padding: '1rem' }}>
												<button style={{
													background: 'none',
													border: '1px solid #2196f3',
													color: '#2196f3',
													padding: '0.5rem',
													borderRadius: '0.25rem',
													cursor: 'pointer',
													display: 'flex',
													alignItems: 'center'
												}}>
													<Eye size={14} />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
