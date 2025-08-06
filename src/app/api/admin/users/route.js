import { NextResponse } from 'next/server'
import { getConnection } from '../../../../lib/database.js'

export async function GET() {
  try {
    const conn = await getConnection()
    const [users] = await conn.execute(`
      SELECT user_id, username, email, full_name, phone, role, created_at
      FROM users
    `)
    return NextResponse.json(users)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const data = await request.json()
    const { user_id, username, email, full_name, phone, role } = data

    if (!user_id || !username || !email || !full_name || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const conn = await getConnection()
    await conn.execute(`
      UPDATE users
      SET username = ?, email = ?, full_name = ?, phone = ?, role = ?
      WHERE user_id = ?
    `, [username, email, full_name, phone, role, user_id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')

    if (!user_id) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
    }

    const conn = await getConnection()
    await conn.execute('DELETE FROM users WHERE user_id = ?', [user_id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
