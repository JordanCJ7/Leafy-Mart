
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminDashboardPage() {
	return (
		<div style={{ 
			background: '#f1faee', 
			minHeight: '100vh', 
			fontFamily: 'Segoe UI, Arial, sans-serif', 
			display: 'flex', 
			flexDirection: 'column' 
		}}>
			<Navbar />
			<main style={{ flex: 1, paddingTop: '2rem', paddingBottom: '2rem' }}>
				<AdminDashboard />
			</main>
			<Footer />
		</div>
	);
}
