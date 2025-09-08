
import React from 'react';
export default function Profile() {
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
				<h2 style={{ color: '#388e3c', marginBottom: '1rem' }}>Profile</h2>
				<div style={{ color: '#555', fontSize: '1rem' }}>
					<p><strong>Name:</strong> Jane Doe</p>
					<p><strong>Email:</strong> jane@example.com</p>
					<p><strong>Member since:</strong> Jan 2025</p>
				</div>
			</div>
		</div>
	);
}
