import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
	ShoppingCart, 
	Heart, 
	User, 
	Package, 
	Settings, 
	LogOut, 
	LogIn, 
	UserPlus,
	Leaf
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
	const { isLoggedIn, user, logout, isLoading } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<Link to="/">
					<Leaf size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
					Botanica Hub
				</Link>
			</div>
			<ul className="navbar-links">
				<li>
					<Link to="/products">
						<Leaf size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
						Products
					</Link>
				</li>
				{isLoading ? (
					// Show loading state
					<li style={{ color: '#388e3c', fontSize: '0.9rem' }}>Loading...</li>
				) : isLoggedIn ? (
					// Show these links when user is logged in
					<>
						<li>
							<Link to="/cart">
								<ShoppingCart size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
								Cart
							</Link>
						</li>
						<li>
							<Link to="/wishlist">
								<Heart size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
								Wishlist
							</Link>
						</li>
						<li>
							<Link to="/profile">
								<User size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
								Profile
							</Link>
						</li>
						<li>
							<Link to="/order-tracking">
								<Package size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
								Orders
							</Link>
						</li>
						{user && user.isAdmin && (
							<li>
								<Link to="/admin">
									<Settings size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
									Admin
								</Link>
							</li>
						)}
						<li>
							<button 
								onClick={handleLogout}
								className="logout-btn"
							>
								<LogOut size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
								Logout
							</button>
						</li>
					</>
				) : (
					// Show these links when user is not logged in
					<>
						<li>
							<Link to="/login">
								<LogIn size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
								Login
							</Link>
						</li>
						<li>
							<Link to="/register">
								<UserPlus size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
