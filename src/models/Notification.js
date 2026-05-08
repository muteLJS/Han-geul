// src/models/Notification.js
import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['streak', 'badge', 'writing', 'point', 'system'],
    default: 'system',
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
  href: { type: String, default: '/' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Notification ||
  mongoose.model('Notification', NotificationSchema)
