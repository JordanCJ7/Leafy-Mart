const Feedback = require('../models/Feedback');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create feedback for a completed order
exports.createFeedback = async (req, res) => {
	try {
		const { orderId } = req.params;
		const customerId = req.user.id;
		
		// Verify order exists and belongs to customer
		const order = await Order.findOne({ 
			_id: orderId, 
			customerId: customerId,
			status: 'Delivered'
		});
		
		if (!order) {
			return res.status(404).json({ 
				error: 'Order not found or not delivered yet' 
			});
		}
		
		// Check if feedback already exists
		const existingFeedback = await Feedback.findOne({ orderId });
		if (existingFeedback) {
			return res.status(400).json({ 
				error: 'Feedback already submitted for this order' 
			});
		}
		
		// Create feedback
		const feedbackData = {
			...req.body,
			orderId,
			customerId
		};
		
		const feedback = new Feedback(feedbackData);
		await feedback.save();
		
		// Update order to mark feedback as submitted
		order.feedbackSubmitted = true;
		order.feedbackId = feedback._id;
		await order.save();
		
		// Update product ratings if product feedback provided
		if (feedback.productFeedback && feedback.productFeedback.length > 0) {
			for (const productFeedback of feedback.productFeedback) {
				const product = await Product.findById(productFeedback.productId);
				if (product) {
					// Recalculate product rating
					const allProductFeedback = await Feedback.find({
						'productFeedback.productId': productFeedback.productId,
						status: 'Approved'
					});
					
					let totalRating = 0;
					let count = 0;
					
					allProductFeedback.forEach(fb => {
						const pf = fb.productFeedback.find(pf => 
							pf.productId.toString() === productFeedback.productId.toString()
						);
						if (pf) {
							totalRating += pf.productRating;
							count++;
						}
					});
					
					if (count > 0) {
						product.rating = totalRating / count;
						product.reviewCount = count;
						await product.save();
					}
				}
			}
		}
		
		res.status(201).json({
			message: 'Feedback submitted successfully',
			feedback
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get feedback for a specific order (customer)
exports.getFeedbackByOrder = async (req, res) => {
	try {
		const { orderId } = req.params;
		const customerId = req.user.id;
		
		// Verify order belongs to customer
		const order = await Order.findOne({ 
			_id: orderId, 
			customerId: customerId 
		});
		
		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}
		
		const feedback = await Feedback.findOne({ orderId })
			.populate('productFeedback.productId', 'name img');
		
		if (!feedback) {
			return res.status(404).json({ error: 'Feedback not found' });
		}
		
		res.json(feedback);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get all feedback for a customer
exports.getCustomerFeedback = async (req, res) => {
	try {
		const customerId = req.user.id;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;
		
		const feedback = await Feedback.find({ customerId })
			.populate('orderId', 'orderNumber createdAt')
			.populate('productFeedback.productId', 'name img')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);
			
		const total = await Feedback.countDocuments({ customerId });
		
		res.json({
			feedback,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit)
			}
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get public feedback for a product
exports.getProductFeedback = async (req, res) => {
	try {
		const { productId } = req.params;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;
		
		const feedback = await Feedback.find({
			'productFeedback.productId': productId,
			status: 'Approved',
			isPublic: true
		})
		.populate('customerId', 'name')
		.populate('orderId', 'orderNumber createdAt')
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);
		
		// Extract relevant product feedback
		const productFeedback = feedback.map(fb => {
			const relevantProductFeedback = fb.productFeedback.find(pf => 
				pf.productId.toString() === productId
			);
			
			return {
				_id: fb._id,
				customerId: fb.customerId,
				orderId: fb.orderId,
				overallRating: fb.rating,
				productRating: relevantProductFeedback?.productRating,
				productReview: relevantProductFeedback?.productReview,
				plantCondition: relevantProductFeedback?.plantCondition,
				packagingQuality: relevantProductFeedback?.packagingQuality,
				wouldRecommend: fb.wouldRecommend,
				helpfulVotes: fb.helpfulVotes,
				createdAt: fb.createdAt
			};
		});
		
		const total = await Feedback.countDocuments({
			'productFeedback.productId': productId,
			status: 'Approved',
			isPublic: true
		});
		
		res.json({
			feedback: productFeedback,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit)
			}
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Admin: Get all feedback
exports.getAllFeedback = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const skip = (page - 1) * limit;
		
		let query = {};
		
		// Add filters
		if (req.query.status) {
			query.status = req.query.status;
		}
		if (req.query.rating) {
			query.rating = parseInt(req.query.rating);
		}
		if (req.query.dateFrom || req.query.dateTo) {
			query.createdAt = {};
			if (req.query.dateFrom) {
				query.createdAt.$gte = new Date(req.query.dateFrom);
			}
			if (req.query.dateTo) {
				query.createdAt.$lte = new Date(req.query.dateTo);
			}
		}
		
		const feedback = await Feedback.find(query)
			.populate('customerId', 'name email')
			.populate('orderId', 'orderNumber')
			.populate('productFeedback.productId', 'name img')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);
			
		const total = await Feedback.countDocuments(query);
		
		res.json({
			feedback,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit)
			}
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Admin: Update feedback status
exports.updateFeedbackStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status, adminResponse } = req.body;
		
		const updateData = { status };
		
		if (adminResponse) {
			updateData.adminResponse = {
				response: adminResponse,
				respondedBy: req.user.name || req.user.email,
				respondedAt: new Date()
			};
		}
		
		const feedback = await Feedback.findByIdAndUpdate(
			id,
			updateData,
			{ new: true }
		).populate('customerId', 'name email')
		.populate('orderId', 'orderNumber');
		
		if (!feedback) {
			return res.status(404).json({ error: 'Feedback not found' });
		}
		
		res.json(feedback);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get feedback statistics
exports.getFeedbackStats = async (req, res) => {
	try {
		const stats = await Feedback.getFeedbackStats();
		
		// Get rating distribution
		const ratingDistribution = await Feedback.aggregate([
			{
				$group: {
					_id: '$rating',
					count: { $sum: 1 }
				}
			},
			{ $sort: { _id: 1 } }
		]);
		
		// Get recent feedback
		const recentFeedback = await Feedback.find()
			.populate('customerId', 'name')
			.populate('orderId', 'orderNumber')
			.sort({ createdAt: -1 })
			.limit(5);
		
		res.json({
			...stats,
			ratingDistribution,
			recentFeedback
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Vote feedback as helpful
exports.voteFeedbackHelpful = async (req, res) => {
	try {
		const { id } = req.params;
		
		const feedback = await Feedback.findByIdAndUpdate(
			id,
			{ $inc: { helpfulVotes: 1 } },
			{ new: true }
		);
		
		if (!feedback) {
			return res.status(404).json({ error: 'Feedback not found' });
		}
		
		res.json({ helpfulVotes: feedback.helpfulVotes });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
