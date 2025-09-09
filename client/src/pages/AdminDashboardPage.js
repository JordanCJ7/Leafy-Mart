
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserManagement from '../components/UserManagement';

export default function AdminDashboardPage() {
	const [activeTab, setActiveTab] = useState('dashboard');

	const renderContent = () => {
		switch (activeTab) {
			case 'users':
				return <UserManagement />;
			case 'products':
				return <div>Products Management - Coming Soon</div>;
			case 'orders':
				return <div>Orders Management - Coming Soon</div>;
			default:
				return (
					<div style={{ padding: '2rem', textAlign: 'center' }}>
						<h2 style={{ color: '#2e7d32', marginBottom: '1rem' }}>
							Welcome to Admin Dashboard
						</h2>
						<p style={{ color: '#666', marginBottom: '2rem' }}>
							Manage your plant store from this central dashboard
						</p>
						
						<div style={{ 
							display: 'grid', 
							gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
							gap: '1rem',
							maxWidth: '800px',
							margin: '0 auto'
						}}>
							<div style={{
								background: 'white',
								padding: '1.5rem',
								borderRadius: '12px',
								boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
								cursor: 'pointer'
							}} onClick={() => setActiveTab('users')}>
								<h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>User Management</h3>
								<p style={{ color: '#666' }}>Manage customer accounts and user data</p>
							</div>
							
							<div style={{
								background: 'white',
								padding: '1.5rem',
								borderRadius: '12px',
								boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
								cursor: 'pointer',
								opacity: 0.6
							}}>
								<h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Product Management</h3>
								<p style={{ color: '#666' }}>Add, edit, and manage plant inventory</p>
							</div>
							
							<div style={{
								background: 'white',
								padding: '1.5rem',
								borderRadius: '12px',
								boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
								cursor: 'pointer',
								opacity: 0.6
							}}>
								<h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Order Management</h3>
								<p style={{ color: '#666' }}>Process and track customer orders</p>
							</div>
						</div>
					</div>
				);
		}
	};

	return (
		<div style={{ 
			background: '#f1faee', 
			minHeight: '100vh', 
			fontFamily: 'Segoe UI, Arial, sans-serif', 
			display: 'flex', 
			flexDirection: 'column' 
		}}>
			<Navbar />
			
			{/* Admin Navigation */}
			<div style={{
				background: 'white',
				padding: '1rem 2rem',
				boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
				borderBottom: '1px solid #e0e0e0'
			}}>
				<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
					<nav style={{ display: 'flex', gap: '2rem' }}>
						<button
							style={{
								background: 'none',
								border: 'none',
								padding: '0.5rem 1rem',
								cursor: 'pointer',
								color: activeTab === 'dashboard' ? '#2e7d32' : '#666',
								fontWeight: activeTab === 'dashboard' ? 'bold' : 'normal',
								borderBottom: activeTab === 'dashboard' ? '2px solid #2e7d32' : 'none'
							}}
							onClick={() => setActiveTab('dashboard')}
						>
							Dashboard
						</button>
						<button
							style={{
								background: 'none',
								border: 'none',
								padding: '0.5rem 1rem',
								cursor: 'pointer',
								color: activeTab === 'users' ? '#2e7d32' : '#666',
								fontWeight: activeTab === 'users' ? 'bold' : 'normal',
								borderBottom: activeTab === 'users' ? '2px solid #2e7d32' : 'none'
							}}
							onClick={() => setActiveTab('users')}
						>
							User Management
						</button>
						<button
							style={{
								background: 'none',
								border: 'none',
								padding: '0.5rem 1rem',
								cursor: 'pointer',
								color: '#ccc',
								fontWeight: 'normal'
							}}
							disabled
						>
							Products (Coming Soon)
						</button>
						<button
							style={{
								background: 'none',
								border: 'none',
								padding: '0.5rem 1rem',
								cursor: 'pointer',
								color: '#ccc',
								fontWeight: 'normal'
							}}
							disabled
						>
							Orders (Coming Soon)
						</button>
					</nav>
				</div>
			</div>
			
			<main style={{ flex: 1, paddingTop: '2rem', paddingBottom: '2rem' }}>
				{renderContent()}
			</main>
			<Footer />
		</div>
	);
}
