// src/app/api/points/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import PointTransaction from '@/models/PointTransaction'
import User from '@/models/User'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  await connectDB()
  const [user, transactions] = await Promise.all([
    User.findById(session.user.id).select('points').lean(),
    PointTransaction.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(100).lean(),
  ])
  return NextResponse.json({ points: user?.points ?? 0, transactions })
}
