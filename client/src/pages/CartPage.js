
import React from 'react';
export default function CartPage() {
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
				<h2 style={{ color: '#388e3c', marginBottom: '1rem' }}>Cart</h2>
				<ul style={{ color: '#555', fontSize: '1rem', listStyle: 'none', padding: 0 }}>
					<li>🪴 Snake Plant x 2</li>
					<li>🌵 Cactus x 1</li>
				</ul>
				<button style={{ marginTop: '1rem', padding: '0.75rem', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600 }}>Checkout</button>
			</div>
		</div>
	);
}
