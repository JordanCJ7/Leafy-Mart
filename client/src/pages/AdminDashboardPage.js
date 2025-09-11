
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserManagement from '../components/UserManagement';
import ProductManagement from '../components/ProductManagement';
import OrderManagement from '../components/OrderManagement';
import FeedbackManagement from '../components/FeedbackManagement';

export default function AdminDashboardPage() {
	const [activeTab, setActiveTab] = useState('dashboard');

	const location = useLocation();

	// Sync activeTab with ?tab= query param on mount and whenever it changes
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const tab = params.get('tab');
		if (tab) setActiveTab(tab);
	}, [location.search]);

	const renderContent = () => {
		switch (activeTab) {
			case 'users':
				return <UserManagement />;
			case 'products':
				return <ProductManagement />;
			case 'orders':
				return <OrderManagement />;
			case 'feedback':
				return <FeedbackManagement />;
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
								cursor: 'pointer'
							}} onClick={() => setActiveTab('products')}>
								<h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Product Management</h3>
								<p style={{ color: '#666' }}>Add, edit, and manage plant inventory</p>
							</div>
							
							<div style={{
								background: 'white',
								padding: '1.5rem',
								borderRadius: '12px',
								boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
								cursor: 'pointer'
							}} onClick={() => setActiveTab('orders')}>
								<h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Order Management</h3>
								<p style={{ color: '#666' }}>Process and track customer orders</p>
							</div>
							
							<div style={{
								background: 'white',
								padding: '1.5rem',
								borderRadius: '12px',
								boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
								cursor: 'pointer'
							}} onClick={() => setActiveTab('feedback')}>
								<h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Feedback Management</h3>
								<p style={{ color: '#666' }}>Review and respond to customer feedback</p>
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
			
			{/* Admin Navigation removed from header — Navbar contains admin links now */}
			
			<main style={{ flex: 1, paddingTop: '2rem', paddingBottom: '2rem' }}>
				{renderContent()}
			</main>
			<Footer />
		</div>
	);
}
