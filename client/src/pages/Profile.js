

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/api';
import API_BASE from '../services/api';


export default function Profile() {
		const [user, setUser] = useState(null);
		const [error, setError] = useState('');
		const [editing, setEditing] = useState(false);
		const [showDialog, setShowDialog] = useState(false);
			const [name, setName] = useState('');
			const [phone, setPhone] = useState('');
			const [address, setAddress] = useState('');
		const [saving, setSaving] = useState(false);
		const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
		const navigate = useNavigate();

		useEffect(() => {
			const storedUser = localStorage.getItem('user');
			const token = localStorage.getItem('token');
			if (storedUser && token) {
				const { id } = JSON.parse(storedUser);
				getUserProfile(id, token).then(res => {
					if (res.error) setError(res.error);
					else {
						  setUser(res);
						  setName(res.name || '');
						  setPhone(res.phone || '');
						  setAddress(res.address || '');
					}
				});
			} else {
				setError('User not logged in.');
			}
		}, []);

				const handleSave = async () => {
					setSaving(true);
					const storedUser = localStorage.getItem('user');
					const token = localStorage.getItem('token');
					if (storedUser && token && user) {
						const { id } = JSON.parse(storedUser);
						const res = await fetch(`${API_BASE}/users/${id}`, {
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`
							},
							body: JSON.stringify({ name, phone, address })
						});
						const data = await res.json();
						if (data.error) setError(data.error);
						else {
							setUser(data);
							setEditing(false);
							setShowDialog(false);
						}
					}
					setSaving(false);
				};

	const handleDeleteProfile = async () => {
		const storedUser = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		if (storedUser && token && user) {
			const { id } = JSON.parse(storedUser);
			const res = await fetch(`${API_BASE}/users/${id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			if (res.ok) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				navigate('/register');
			} else {
				setError('Failed to delete profile.');
			}
		}
	};
		return (
			<div style={{ background: '#f1faee', minHeight: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
				<Navbar />
			<main style={{ maxWidth: 600, margin: '3rem auto', padding: '2rem 1rem' }}>
				<div style={{ background: 'linear-gradient(135deg, #ffffff 60%, #e8f5e9 100%)', borderRadius: 20, boxShadow: '0 6px 32px rgba(56,142,60,0.12)', border: '1px solid #e0e0e0', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', transition: 'box-shadow 0.3s' }}>
					<img src="https://img.icons8.com/color/96/000000/plant-under-sun.png" alt="User avatar" style={{ width: 110, height: 110, borderRadius: '50%', marginBottom: 24, background: '#e8f5e9', border: '3px solid #43a047', boxShadow: '0 2px 12px rgba(56,142,60,0.10)', transition: 'box-shadow 0.3s' }} />
					{error && <div style={{ color: '#d32f2f', marginBottom: 16, fontWeight: 600, fontSize: '1.1rem' }}>{error}</div>}
								{user && (
									<>
										{/* ...existing code for profile display... */}
										{editing ? (
											<input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1.1rem', fontWeight: 700 }} />
										) : (
											<h2 style={{ color: '#388e3c', fontWeight: 700, fontSize: '2rem', marginBottom: 8 }}>{user.name}</h2>
										)}
										<div style={{ color: '#555', fontSize: '1.1rem', marginBottom: 16 }}>{user.email}</div>
										<div style={{ color: '#388e3c', fontWeight: 600, marginBottom: 24 }}>Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</div>
										<hr style={{ width: '100%', border: 'none', borderTop: '1.5px solid #e0e0e0', margin: '16px 0 24px 0' }} />
										<div style={{ width: '100%', paddingTop: 8 }}>
											<h3 style={{ color: '#388e3c', fontWeight: 600, fontSize: '1.15rem', marginBottom: 12 }}>Account Details</h3>
											<div style={{ color: '#555', fontSize: '1rem', marginBottom: 8 }}><strong>Phone:</strong> {user.phone || 'Not set'}</div>
											<div style={{ color: '#555', fontSize: '1rem', marginBottom: 8 }}><strong>Address:</strong> {user.address || 'Not set'}</div>
											<button onClick={() => { setEditing(true); setShowDialog(true); }} style={{ width: '100%', padding: '0.75rem', background: '#43a047', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', marginBottom: 8, boxShadow: '0 2px 8px rgba(56,142,60,0.08)', transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#388e3c'} onMouseOut={e => e.target.style.background = '#43a047'}>Edit Details</button>
											<div style={{ color: '#555', fontSize: '1rem', marginBottom: 8 }}><strong>Orders:</strong> {user.orders ? user.orders.length : '0'}</div>
											<div style={{ color: '#555', fontSize: '1rem', marginBottom: 8 }}><strong>Wishlist:</strong> {user.wishlist ? user.wishlist.length : '0'} items</div>
											<button onClick={() => setShowDeleteConfirm(true)} style={{ width: '100%', padding: '0.75rem', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', marginTop: 8, boxShadow: '0 2px 8px rgba(211,47,47,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#b71c1c'} onMouseOut={e => e.target.style.background = '#d32f2f'}><span style={{fontSize: '1.2rem'}}>🗑️</span>Delete Profile</button>
				{/* Delete Confirmation Modal */}
				{showDeleteConfirm && (
					<div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(211,47,47,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, transition: 'background 0.3s' }}>
						<div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 6px 32px rgba(211,47,47,0.18)', border: '1px solid #e0e0e0', padding: '2rem 2rem', minWidth: 320, maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', transition: 'box-shadow 0.3s' }}>
							<h2 style={{ color: '#d32f2f', fontWeight: 700, fontSize: '1.3rem', marginBottom: 16, letterSpacing: '0.5px' }}>Delete Profile?</h2>
							<p style={{ color: '#333', fontSize: '1rem', marginBottom: 24, textAlign: 'center' }}>Are you sure you want to delete your profile? <span style={{ color: '#d32f2f', fontWeight: 600 }}>This action cannot be undone.</span></p>
							<button onClick={handleDeleteProfile} style={{ width: '100%', padding: '0.75rem', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', marginBottom: 8, boxShadow: '0 2px 8px rgba(211,47,47,0.10)', transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#b71c1c'} onMouseOut={e => e.target.style.background = '#d32f2f'}><span style={{fontSize: '1.2rem'}}>🗑️</span>Yes, Delete</button>
							<button onClick={() => setShowDeleteConfirm(false)} style={{ width: '100%', padding: '0.75rem', background: '#e0e0e0', color: '#388e3c', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', boxShadow: '0 2px 8px rgba(56,142,60,0.08)', transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#c8e6c9'} onMouseOut={e => e.target.style.background = '#e0e0e0'}>Cancel</button>
							<button onClick={() => setShowDeleteConfirm(false)} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', fontSize: 22, color: '#d32f2f', cursor: 'pointer' }} title="Close">×</button>
						</div>
					</div>
				)}
										</div>
									</>
								)}
								{/* Modal Dialog for Editing */}
								{showDialog && (
									<div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(56,142,60,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, transition: 'background 0.3s' }}>
										<div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 6px 32px rgba(56,142,60,0.18)', border: '1px solid #e0e0e0', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', transition: 'box-shadow 0.3s' }}>
											<h2 style={{ color: '#388e3c', fontWeight: 700, fontSize: '1.5rem', marginBottom: 16, letterSpacing: '0.5px' }}>Edit Profile</h2>
											<input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1.1rem', fontWeight: 700, transition: 'border 0.2s' }} />
											<input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1rem', transition: 'border 0.2s' }} />
											<input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1rem', transition: 'border 0.2s' }} />
											<button onClick={handleSave} disabled={saving} style={{ width: '100%', padding: '0.75rem', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', marginBottom: 8, boxShadow: '0 2px 8px rgba(56,142,60,0.08)', transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#43a047'} onMouseOut={e => e.target.style.background = '#388e3c'}>{saving ? 'Saving...' : 'Save'}</button>
											<button onClick={() => { setEditing(false); setShowDialog(false); }} style={{ width: '100%', padding: '0.75rem', background: '#e0e0e0', color: '#388e3c', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', marginBottom: 8, boxShadow: '0 2px 8px rgba(56,142,60,0.08)', transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#c8e6c9'} onMouseOut={e => e.target.style.background = '#e0e0e0'}>Cancel</button>
											<button onClick={() => setShowDialog(false)} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', fontSize: 22, color: '#388e3c', cursor: 'pointer' }} title="Close">×</button>
										</div>
									</div>
								)}
									{/* Modal Dialog for Editing */}
									{showDialog && (
										<div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(56,142,60,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
											<div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px rgba(56,142,60,0.18)', border: '1px solid #e0e0e0', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
												<h2 style={{ color: '#388e3c', fontWeight: 700, fontSize: '1.5rem', marginBottom: 16 }}>Edit Profile</h2>
												<input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1.1rem', fontWeight: 700 }} />
												<input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1rem' }} />
												<input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1rem' }} />
												<button onClick={handleSave} disabled={saving} style={{ width: '100%', padding: '0.75rem', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', marginBottom: 8 }}>{saving ? 'Saving...' : 'Save'}</button>
												<button onClick={() => { setEditing(false); setShowDialog(false); }} style={{ width: '100%', padding: '0.75rem', background: '#e0e0e0', color: '#388e3c', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', marginBottom: 8 }}>Cancel</button>
												<button onClick={() => setShowDialog(false)} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', fontSize: 22, color: '#388e3c', cursor: 'pointer' }} title="Close">×</button>
											</div>
										</div>
									)}
							   </div>
						   </main>
						   <Footer />
					   </div>
				   );
				}
