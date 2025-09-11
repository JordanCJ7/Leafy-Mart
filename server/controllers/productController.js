const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
	try {
		const products = await Product.find().sort({ createdAt: -1 });
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get product by ID
exports.getProductById = async (req, res) => {
	try {
		const product = await Product.findOne({ id: req.params.id });
		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json(product);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Add product
exports.addProduct = async (req, res) => {
	try {
		// Generate unique ID from name if not provided
		if (!req.body.id) {
			req.body.id = req.body.name
				.toLowerCase()
				.replace(/[^a-z0-9]/g, '-')
				.replace(/-+/g, '-')
				.trim('-');
		}

		// Check if product ID already exists
		const existingProduct = await Product.findOne({ id: req.body.id });
		if (existingProduct) {
			return res.status(400).json({ error: 'Product with this ID already exists' });
		}

		const product = new Product(req.body);
		const saved = await product.save();
		res.status(201).json(saved);
	} catch (err) {
		if (err.code === 11000) {
			res.status(400).json({ error: 'Product ID must be unique' });
		} else {
			res.status(400).json({ error: err.message });
		}
	}
};

// Update product
exports.updateProduct = async (req, res) => {
	try {
		const updated = await Product.findOneAndUpdate(
			{ id: req.params.id }, 
			req.body, 
			{ new: true, runValidators: true }
		);
		
		if (!updated) {
			return res.status(404).json({ error: 'Product not found' });
		}
		
		res.json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete product
exports.deleteProduct = async (req, res) => {
	try {
		const deleted = await Product.findOneAndDelete({ id: req.params.id });
		
		if (!deleted) {
			return res.status(404).json({ error: 'Product not found' });
		}
		
		res.json({ message: 'Product deleted successfully' });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get product categories and tags (for dropdown options)
exports.getProductOptions = async (req, res) => {
	try {
		const categories = ['Herbs', 'Indoor Vines', 'Air Purifiers', 'Palms', 'Flowering Shrubs', 'Shade Plants', 'Foliage', 'Low-Maintenance', 'Hanging & Trailing', 'Statement Trees', 'Succulents & Cacti', 'Fragrant Climbers'];
		const tags = ['medicinal', 'herb', 'balcony', 'easy-care', 'trailing', 'low-light', 'statement', 'indoors', 'office', 'air-purifying', 'tropical', 'large-space', 'fragrant', 'colorful', 'flowering', 'shade-tolerant', 'clean-air', 'drought-tolerant', 'kids-friendly', 'outdoor', 'decorative', 'climbing', 'spines', 'blue-flowers', 'winter-hardy'];
		
		res.json({ categories, tags });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Upload product image
exports.uploadImage = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: 'No image file uploaded' });
		}

		// Generate the URL for accessing the uploaded file
		const imageUrl = `/uploads/${req.file.filename}`;
		
		res.json({ 
			message: 'Image uploaded successfully',
			imageUrl,
			filename: req.file.filename
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
