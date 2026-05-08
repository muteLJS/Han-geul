// src/models/User.js
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  // NextAuth 기본 필드
  name:          { type: String },
  email:         { type: String, unique: true, sparse: true },
  emailVerified: { type: Date },
  image:         { type: String },

  // 한-글 전용 필드
  nickname:      { type: String, default: '' },
  provider:      { type: String, default: '' }, // kakao | google | naver

  role: {
    type:    String,
    enum:    ['user', 'admin'],
    default: 'user',
  },

  subscriptionStatus: {
    type:    String,
    enum:    ['free', 'active', 'cancelled', 'expired'],
    default: 'free',
  },

  points:     { type: Number, default: 0 },
  haniItems:  { type: [String], default: [] }, // 보유 한이 아이템 ID 목록
  haniEquipped: {
    body:       { type: String, default: 'default' },
    outfit:     { type: String, default: 'default' },
    shoes:      { type: String, default: 'default' },
    hat:        { type: String, default: 'none'    },
    prop:       { type: String, default: 'brush'   },
    background: { type: String, default: 'none'    },
  },

  // 온보딩 설정
  purpose:    { type: String, default: '' }, // 글쓰기 목적
  vocabLevel: { type: Number, default: 1  }, // 어휘 수준 1~5

  // 기본 공개 범위
  defaultVisibility: {
    type:    String,
    enum:    ['public', 'link', 'private'],
    default: 'private',
  },

  onboardingCompleted: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

UserSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.User ||
  mongoose.model('User', UserSchema)
