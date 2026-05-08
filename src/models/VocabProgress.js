// src/models/VocabProgress.js
import mongoose from 'mongoose'

const VocabProgressSchema = new mongoose.Schema({
  userId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
  },

  level:       { type: Number, default: 1 }, // 현재 어휘 단계 1~5
  totalSolved: { type: Number, default: 0 }, // 총 푼 문제 수
  totalCorrect:{ type: Number, default: 0 }, // 총 정답 수

  // 오늘 세션 기록
  todaySessions: { type: Number, default: 0 },
  lastSolvedAt:  { type: Date,   default: null },

  // 틀린 어휘 ID 목록 (복습용)
  wrongVocabIds: { type: [String], default: [] },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

VocabProgressSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.VocabProgress ||
  mongoose.model('VocabProgress', VocabProgressSchema)
