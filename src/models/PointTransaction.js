// src/models/PointTransaction.js
import mongoose from 'mongoose'

const PointTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  label: { type: String, required: true },
  amount: { type: Number, required: true },
  kind: {
    type: String,
    enum: ['gain', 'use'],
    required: true,
  },
  memo: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.PointTransaction ||
  mongoose.model('PointTransaction', PointTransactionSchema)
