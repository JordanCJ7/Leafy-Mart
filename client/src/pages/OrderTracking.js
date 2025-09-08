
import React from 'react';
export default function OrderTracking() {
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
				<h2 style={{ color: '#388e3c', marginBottom: '1rem' }}>Order Tracking</h2>
				<ul style={{ color: '#555', fontSize: '1rem', listStyle: 'none', padding: 0 }}>
					<li>Order #12345 - <span style={{ color: '#ffa726' }}>Pending</span></li>
					<li>Order #12346 - <span style={{ color: '#66bb6a' }}>Shipped</span></li>
					<li>Order #12347 - <span style={{ color: '#388e3c' }}>Delivered</span></li>
				</ul>
			</div>
		</div>
	);
}
