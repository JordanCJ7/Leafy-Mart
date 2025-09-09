import React, { useState, useEffect } from 'react';
import { 
	Package, 
	Users, 
	TrendingUp, 
	Plus, 
	Edit3, 
	Trash2, 
	Search,
	Eye,
	DollarSign
} from 'lucide-react';
import {
	getAllProducts,
	getAllCustomers,
	getDashboardStats
} from '../services/api';

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState('overview');
	const [products, setProducts] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [stats, setStats] = useState({});
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			const [productsRes, customersRes, statsRes] = await Promise.all([
				getAllProducts(),
				getAllCustomers(),
				getDashboardStats()
			]);

			setProducts(productsRes.error ? [] : productsRes);
			setCustomers(customersRes.error ? [] : customersRes);
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
			setCustomers([
				{ id: 1, name: 'Priya Perera', email: 'priya@example.com', totalPurchases: 5, membershipTier: 'Gold', joinedDate: '2025-01-15' },
				{ id: 2, name: 'Kasun Silva', email: 'kasun@example.com', totalPurchases: 3, membershipTier: 'Silver', joinedDate: '2025-02-20' },
				{ id: 3, name: 'Nethmini Fernando', email: 'nethmini@example.com', totalPurchases: 7, membershipTier: 'Gold', joinedDate: '2024-12-10' },
			]);
			setStats({
				totalCustomers: 3,
				totalProducts: 4,
				totalOrders: 8,
				totalRevenue: 11500
			});
		}
		setLoading(false);
	};

	const filteredProducts = products.filter(product => 
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const filteredCustomers = customers.filter(customer => 
		customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		customer.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (loading) {
		return (
			<div style={{ 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center', 
				height: '200px',
				color: '#388e3c'
			}}>
				Loading...
			</div>
		);
	}

	return (
		<div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
			<div style={{ 
				background: 'linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)',
				color: 'white',
				padding: '2rem',
				borderRadius: '1rem',
				marginBottom: '2rem',
				textAlign: 'center'
			}}>
				<h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>Admin Dashboard</h1>
				<p style={{ margin: 0, opacity: 0.9 }}>Manage your Green Paradise plant store</p>
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
								{stats.totalCustomers || customers.length}
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
								LKR {(stats.totalRevenue || 0).toLocaleString()}
							</h3>
							<p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Total Revenue</p>
						</div>
						<DollarSign size={32} style={{ color: '#388e3c' }} />
					</div>
				</div>
			</div>

			{/* Tab Navigation */}
			<div style={{ 
				display: 'flex', 
				gap: '2rem', 
				marginBottom: '2rem', 
				borderBottom: '1px solid #e0e0e0' 
			}}>
				{[
					{ key: 'overview', label: 'Overview', icon: TrendingUp },
					{ key: 'products', label: 'Products', icon: Package },
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

			{/* Overview Tab Content */}
			{activeTab === 'overview' && (
				<div style={{ 
					background: '#fff',
					padding: '2rem',
					borderRadius: '1rem',
					boxShadow: '0 2px 16px rgba(56, 142, 60, 0.1)',
					border: '1px solid #e8f5e8',
					textAlign: 'center'
				}}>
					<h2 style={{ color: '#388e3c', marginBottom: '1rem' }}>Welcome to Green Paradise Admin</h2>
					<p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
						Manage your plant store efficiently with our comprehensive dashboard. 
						Monitor products, track customers, and grow your green business.
					</p>
					<div style={{ marginTop: '2rem' }}>
						<button 
							onClick={() => setActiveTab('products')}
							style={{
								background: '#388e3c',
								color: 'white',
								border: 'none',
								padding: '1rem 2rem',
								borderRadius: '0.5rem',
								fontSize: '1.1rem',
								cursor: 'pointer',
								marginRight: '1rem',
								fontWeight: 'bold'
							}}
						>
							Manage Products
						</button>
						<button 
							onClick={() => setActiveTab('customers')}
							style={{
								background: '#66bb6a',
								color: 'white',
								border: 'none',
								padding: '1rem 2rem',
								borderRadius: '0.5rem',
								fontSize: '1.1rem',
								cursor: 'pointer',
								fontWeight: 'bold'
							}}
						>
							View Customers
						</button>
					</div>
				</div>
			)}

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
								/>
							</div>
						</div>
						
						<button style={{
							background: '#388e3c',
							color: 'white',
							border: 'none',
							padding: '0.75rem 1.5rem',
							borderRadius: '0.5rem',
							fontSize: '1rem',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
							fontWeight: 'bold',
							transition: 'background 0.3s ease'
						}}>
							<Plus size={18} />
							Add New {activeTab.slice(0, -1)}
						</button>
					</div>
				</div>
			)}

			{/* Products Tab */}
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
												color: product.stock < 10 ? '#f44336' : '#388e3c',
												fontWeight: 'bold'
											}}>
												{product.stock || 0}
											</span>
										</td>
										<td style={{ padding: '1rem' }}>
											<span style={{
												padding: '0.25rem 0.75rem',
												borderRadius: '1rem',
												fontSize: '0.8rem',
												backgroundColor: product.status === 'active' ? '#e8f5e8' : '#fff3e0',
												color: product.status === 'active' ? '#388e3c' : '#ff9800'
											}}>
												{product.status || 'active'}
											</span>
										</td>
										<td style={{ padding: '1rem' }}>
											<div style={{ display: 'flex', gap: '0.5rem' }}>
												<button style={{
													background: 'none',
													border: '1px solid #388e3c',
													color: '#388e3c',
													padding: '0.25rem',
													borderRadius: '0.25rem',
													cursor: 'pointer'
												}}>
													<Eye size={14} />
												</button>
												<button style={{
													background: 'none',
													border: '1px solid #2196f3',
													color: '#2196f3',
													padding: '0.25rem',
													borderRadius: '0.25rem',
													cursor: 'pointer'
												}}>
													<Edit3 size={14} />
												</button>
												<button style={{
													background: 'none',
													border: '1px solid #f44336',
													color: '#f44336',
													padding: '0.25rem',
													borderRadius: '0.25rem',
													cursor: 'pointer'
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

			{/* Customers Tab */}
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
									<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Purchases</th>
									<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Membership</th>
									<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Joined</th>
									<th style={{ padding: '1rem', textAlign: 'left', color: '#388e3c', fontWeight: 'bold' }}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredCustomers.map(customer => (
									<tr key={customer.id || customer._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
										<td style={{ padding: '1rem', fontWeight: 'bold' }}>{customer.name}</td>
										<td style={{ padding: '1rem', color: '#666' }}>{customer.email}</td>
										<td style={{ padding: '1rem', color: '#388e3c', fontWeight: 'bold' }}>
											{customer.totalPurchases || 0}
										</td>
										<td style={{ padding: '1rem' }}>
											<span style={{
												padding: '0.25rem 0.75rem',
												borderRadius: '1rem',
												fontSize: '0.8rem',
												backgroundColor: customer.membershipTier === 'Gold' ? '#ffd700' : 
														customer.membershipTier === 'Silver' ? '#c0c0c0' : '#cd7f32',
												color: '#fff',
												fontWeight: 'bold'
											}}>
												{customer.membershipTier || 'Bronze'}
											</span>
										</td>
										<td style={{ padding: '1rem', color: '#666' }}>
											{new Date(customer.joinedDate || '2025-01-01').toLocaleDateString()}
										</td>
										<td style={{ padding: '1rem' }}>
											<div style={{ display: 'flex', gap: '0.5rem' }}>
												<button style={{
													background: 'none',
													border: '1px solid #388e3c',
													color: '#388e3c',
													padding: '0.25rem',
													borderRadius: '0.25rem',
													cursor: 'pointer'
												}}>
													<Eye size={14} />
												</button>
												<button style={{
													background: 'none',
													border: '1px solid #2196f3',
													color: '#2196f3',
													padding: '0.25rem',
													borderRadius: '0.25rem',
													cursor: 'pointer'
												}}>
													<Edit3 size={14} />
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
		</div>
	);
}
