
import React from 'react';
export default function AdminDashboardPage() {
	return (
		<div style={{
			minHeight: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: 'linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)',
			fontFamily: 'Segoe UI, Arial, sans-serif'
		}}>
			<div style={{
				background: '#fff',
				padding: '2rem',
				borderRadius: '1rem',
				boxShadow: '0 2px 16px rgba(56, 142, 60, 0.15)',
				minWidth: 320
			}}>
				<h2 style={{ color: '#388e3c', marginBottom: '1rem' }}>Admin Dashboard</h2>
				<ul style={{ color: '#555', fontSize: '1rem', listStyle: 'none', padding: 0 }}>
					<li>Inventory Management</li>
					<li>Supplier Tracking</li>
					<li>Order Management</li>
					<li>Performance Reports</li>
				</ul>
			</div>
		</div>
	);
}
