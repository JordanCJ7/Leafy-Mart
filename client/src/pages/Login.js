

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

		const handleSubmit = async e => {
			e.preventDefault();
			if (!email || !password) {
				setError('Please enter both email and password.');
				return;
			}
			const res = await loginUser({ email, password });
			if (res.error) {
				setError(res.error);
				return;
			}
			// Save token and user info (for demo, localStorage)
			localStorage.setItem('token', res.token);
			localStorage.setItem('user', JSON.stringify(res.user));
			setError('');
			navigate('/profile');
		};

	return (
		<div style={{ background: '#f1faee', minHeight: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
			<nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 3rem', background: '#e8f5e9', borderBottom: '1px solid #c8e6c9' }}>
				<div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#388e3c', display: 'flex', alignItems: 'center' }}>
					<span style={{ marginRight: 8 }}>🌿</span>Feafly
				</div>
				<div style={{ fontSize: '1rem', color: '#388e3c' }}>Login</div>
				<div>
					<Link to="/register"><button style={{ background: '#388e3c', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.25rem', fontWeight: 600, cursor: 'pointer' }}>Register</button></Link>
				</div>
			</nav>
			<main style={{ maxWidth: 400, margin: '3rem auto', padding: '2rem 1rem' }}>
				<div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(56,142,60,0.08)', border: '1px solid #e0e0e0', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<h2 style={{ color: '#388e3c', fontWeight: 700, fontSize: '2rem', marginBottom: 16 }}>Login to Feafly</h2>
					<form style={{ width: '100%' }} onSubmit={handleSubmit}>
						<input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1rem' }} />
						<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1rem' }} />
						{error && <div style={{ color: '#d32f2f', marginBottom: '1rem', fontSize: '0.98rem' }}>{error}</div>}
						<button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', marginBottom: 8 }}>Login</button>
					</form>
					<div style={{ marginTop: 8, fontSize: '0.98rem', color: '#388e3c' }}>
						Don't have an account? <Link to="/register" style={{ color: '#43a047', fontWeight: 600 }}>Register</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
