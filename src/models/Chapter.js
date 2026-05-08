// src/models/Chapter.js
import mongoose from 'mongoose'

const ChapterSchema = new mongoose.Schema({
  bookId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Book',
    required: true,
  },

  title:   { type: String, default: '챕터' },
  order:   { type: Number, default: 0      }, // 순서 변경용
  postIds: {
    type:    [mongoose.Schema.Types.ObjectId],
    ref:     'WritingEntry',
    default: [],
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

ChapterSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Chapter ||
  mongoose.model('Chapter', ChapterSchema)
