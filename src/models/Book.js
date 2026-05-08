// src/models/Book.js
import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
  authorId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
  },

  title:    { type: String, required: true },
  subtitle: { type: String, default: ''   },
  intro:    { type: String, default: ''   },

  // 표지 디자인
  coverColor: { type: String, default: '#D4A853' },
  coverImage: { type: String, default: null      },

  visibility: {
    type:    String,
    enum:    ['public', 'link', 'private'],
    default: 'private',
  },

  status: {
    type:    String,
    enum:    ['writing', 'completed'],
    default: 'writing',
  },

  // 도서함 책장 줄 이름
  shelfCategory: { type: String, default: '내 책장' },

  // 챕터 없는 단순 모음도 허용 (총괄본 명시)
  hasChapters: { type: Boolean, default: false },

  wordCount:   { type: Number, default: 0    },
  viewCount:   { type: Number, default: 0    },

  completedAt: { type: Date, default: null  },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now },
})

BookSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Book ||
  mongoose.model('Book', BookSchema)
