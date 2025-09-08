const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Add product
exports.addProduct = async (req, res) => {
	try {
		const product = new Product(req.body);
		const saved = await product.save();
		res.status(201).json(saved);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update product
exports.updateProduct = async (req, res) => {
	try {
		const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete product
exports.deleteProduct = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.json({ message: 'Product deleted' });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
