// src/models/WritingEntry.js
import mongoose from 'mongoose'

const WritingEntrySchema = new mongoose.Schema({
  authorId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
  },

  title:     { type: String, default: ''    },
  body:      { type: String, required: true },
  wordCount: { type: Number, default: 0     },

  visibility: {
    type:    String,
    enum:    ['public', 'link', 'private'],
    default: 'private',
  },

  // 책/챕터 연결
  bookId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Book',    default: null },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', default: null },

  isDraft:   { type: Boolean, default: true  },
  isPinned:  { type: Boolean, default: false },

  // 글 종류
  type: {
    type:    String,
    enum:    ['free', 'self', 'copying'],
    default: 'free',
    // free: 자유 글쓰기
    // self: 나를 담은 글
    // copying: 필사
  },

  viewCount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// 저장 시 wordCount 자동 계산
WritingEntrySchema.pre('save', function (next) {
  if (this.isModified('body')) {
    this.wordCount = this.body.replace(/\s/g, '').length
  }
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.WritingEntry ||
  mongoose.model('WritingEntry', WritingEntrySchema)
