import { NextResponse } from 'next/server'
import { getConnection } from '../../../lib/database.js'

export async function GET() {
  try {
    const conn = await getConnection()

    // Ambil statistik dasar
    const [userCount] = await conn.execute('SELECT COUNT(*) as count FROM users')
    const [productCount] = await conn.execute('SELECT COUNT(*) as count FROM product')
    const [classCount] = await conn.execute('SELECT COUNT(*) as count FROM class')
    const [orderCount] = await conn.execute('SELECT COUNT(*) as count FROM `order`')
    const [revenueSum] = await conn.execute('SELECT SUM(total_amount) as total FROM `order` WHERE status = "completed"')

    return NextResponse.json({
      totalUsers: userCount[0].count,
      totalProducts: productCount[0].count,
      totalClasses: classCount[0].count,
      totalOrders: orderCount[0].count,
      totalRevenue: revenueSum[0].total || 0
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
