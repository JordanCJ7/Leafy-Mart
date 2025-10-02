// Feedback controller disabled - feature removed.
// If any runtime code still calls these endpoints, respond with 501 Not Implemented.

const notImplemented = (req, res) => res.status(501).json({ error: 'Feedback feature disabled' });

exports.createFeedback = notImplemented;
exports.getFeedbackByOrder = notImplemented;
exports.getCustomerFeedback = notImplemented;
exports.getProductFeedback = notImplemented;
exports.getAllFeedback = notImplemented;
exports.updateFeedbackStatus = notImplemented;
exports.getFeedbackStats = notImplemented;
exports.voteFeedbackHelpful = notImplemented;
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
