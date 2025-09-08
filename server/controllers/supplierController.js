const Supplier = require('../models/Supplier');

// Get all suppliers
exports.getSuppliers = async (req, res) => {
	try {
		const suppliers = await Supplier.find();
		res.json(suppliers);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Add supplier
exports.addSupplier = async (req, res) => {
	try {
		const supplier = new Supplier(req.body);
		const saved = await supplier.save();
		res.status(201).json(saved);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update supplier
exports.updateSupplier = async (req, res) => {
	try {
		const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete supplier
exports.deleteSupplier = async (req, res) => {
	try {
		await Supplier.findByIdAndDelete(req.params.id);
		res.json({ message: 'Supplier deleted' });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
