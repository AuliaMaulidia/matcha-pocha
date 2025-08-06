import { NextResponse } from 'next/server'
import { getConnection } from '../../../../lib/database.js'

export async function GET() {
  try {
    const conn = await getConnection()
    const [classes] = await conn.execute(`
      SELECT class_id, class_name, instructor, schedule, duration, max_participants, price
      FROM class
    `)
    return NextResponse.json(classes)
  } catch (error) {
    console.error('Failed to fetch classes:', error)
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const { class_name, instructor, schedule, duration, max_participants, price } = data

    if (!class_name || !instructor || !schedule || !duration || !max_participants || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const conn = await getConnection()
    const [result] = await conn.execute(`
      INSERT INTO class (class_name, instructor, schedule, duration, max_participants, price)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [class_name, instructor, schedule, duration, max_participants, price])

    return NextResponse.json({ success: true, classId: result.insertId })
  } catch (error) {
    console.error('Failed to create class:', error)
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const data = await request.json()
    const { class_id, class_name, instructor, schedule, duration, max_participants, price } = data

    if (!class_id || !class_name || !instructor || !schedule || !duration || !max_participants || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const conn = await getConnection()
    await conn.execute(`
      UPDATE class
      SET class_name = ?, instructor = ?, schedule = ?, duration = ?, max_participants = ?, price = ?
      WHERE class_id = ?
    `, [class_name, instructor, schedule, duration, max_participants, price, class_id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update class:', error)
    return NextResponse.json({ error: 'Failed to update class' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const class_id = searchParams.get('class_id')

    if (!class_id) {
      return NextResponse.json({ error: 'Missing class_id' }, { status: 400 })
    }

    const conn = await getConnection()
    await conn.execute('DELETE FROM class WHERE class_id = ?', [class_id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete class:', error)
    return NextResponse.json({ error: 'Failed to delete class' }, { status: 500 })
  }
}
