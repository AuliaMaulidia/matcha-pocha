import { NextResponse } from 'next/server'
import { getConnection } from '../../../../lib/database.js'

export async function GET() {
  try {
    const conn = await getConnection()
    const [orders] = await conn.execute(`
      SELECT o.order_id, u.full_name as customer, o.total_amount, o.status, o.order_date
      FROM \`order\` o
      JOIN users u ON o.user_id = u.user_id
      ORDER BY o.order_date DESC
      LIMIT 50
    `)
    return NextResponse.json(orders)
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const data = await request.json()
    const { order_id, status } = data

    if (!order_id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const conn = await getConnection()
    await conn.execute(`
      UPDATE \`order\`
      SET status = ?
      WHERE order_id = ?
    `, [status, order_id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
