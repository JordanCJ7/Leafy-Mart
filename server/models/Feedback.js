const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // Rating and Reviews
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  review: { 
    type: String, 
    required: true,
    minlength: 10,
    maxlength: 1000
  },
  
  // Product-specific feedback
  productFeedback: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    productRating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    productReview: { 
      type: String, 
      maxlength: 500 
    },
    // Specific to plants
    plantCondition: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair', 'Poor'],
      required: true
    },
    packagingQuality: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair', 'Poor'],
      required: true
    }
  }],
  
  // Service feedback
  deliveryRating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  serviceRating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  
  // Additional feedback
  improvements: { 
    type: String, 
    maxlength: 500 
  },
  wouldRecommend: { 
    type: Boolean, 
    required: true 
  },
  
  // Status
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  
  // Admin response
  adminResponse: {
    response: String,
    respondedBy: String,
    respondedAt: Date
  },
  
  // Helpful votes (for public reviews)
  helpfulVotes: {
    type: Number,
    default: 0
  },
  
  // Visibility
  isPublic: {
    type: Boolean,
    default: true
  }
  
}, { timestamps: true });

// Index for better query performance
feedbackSchema.index({ orderId: 1 });
feedbackSchema.index({ customerId: 1 });
feedbackSchema.index({ rating: 1 });
feedbackSchema.index({ status: 1 });

// Method to calculate average rating
feedbackSchema.methods.calculateAverageRating = function() {
  const ratings = [this.rating, this.deliveryRating, this.serviceRating];
  const productRatings = this.productFeedback.map(pf => pf.productRating);
  const allRatings = [...ratings, ...productRatings];
  
  return allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;
};

// Static method to get feedback statistics
feedbackSchema.statics.getFeedbackStats = async function(filter = {}) {
  const stats = await this.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        totalFeedback: { $sum: 1 },
        averageRating: { $avg: '$rating' },
        averageDeliveryRating: { $avg: '$deliveryRating' },
        averageServiceRating: { $avg: '$serviceRating' },
        recommendationRate: { 
          $avg: { $cond: ['$wouldRecommend', 1, 0] } 
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalFeedback: 0,
    averageRating: 0,
    averageDeliveryRating: 0,
    averageServiceRating: 0,
    recommendationRate: 0
  };
};

module.exports = mongoose.model('Feedback', feedbackSchema);
