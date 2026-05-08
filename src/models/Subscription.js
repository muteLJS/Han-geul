// src/models/Subscription.js
import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
  },

  plan: {
    type: String,
    enum: ['monthly', 'yearly'],
  },

  status: {
    type:    String,
    enum:    ['active', 'cancelled', 'expired'],
    default: 'active',
  },

  // 토스페이먼츠 결제 정보
  paymentKey:    { type: String, default: '' },
  orderId:       { type: String, default: '' },
  amount:        { type: Number, default: 0  },

  // 구독 기간
  startedAt:  { type: Date, default: Date.now },
  expiresAt:  { type: Date, required: true    },
  cancelledAt:{ type: Date, default: null     },

  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Subscription ||
  mongoose.model('Subscription', SubscriptionSchema)
