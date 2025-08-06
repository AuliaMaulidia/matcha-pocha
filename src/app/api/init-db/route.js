import { NextResponse } from 'next/server'
import { initializeDatabase } from '../../../../lib/database.js'

export async function GET() {
  try {
    await initializeDatabase()
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully'
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { success: false, message: 'Database initialization failed', error: error.message },
      { status: 500 }
    )
  }
}
