import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<Link to="/">Smart Plant Store</Link>
			</div>
			<ul className="navbar-links">
				<li><Link to="/">Home</Link></li>
				<li><Link to="/cart">Cart</Link></li>
				<li><Link to="/wishlist">Wishlist</Link></li>
				<li><Link to="/profile">Profile</Link></li>
				<li><Link to="/order-tracking">Order Tracking</Link></li>
				<li><Link to="/admin">Admin</Link></li>
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/register">Register</Link></li>
			</ul>
		</nav>
	);
};

export default Navbar;
