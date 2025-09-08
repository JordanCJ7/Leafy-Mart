
import React from 'react';
export default function Login() {
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
				<h2 style={{ color: '#388e3c', marginBottom: '1rem' }}>Login</h2>
				<form>
					<input type="email" placeholder="Email" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7' }} />
					<input type="password" placeholder="Password" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7' }} />
					<button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600 }}>Login</button>
				</form>
			</div>
		</div>
	);
}
