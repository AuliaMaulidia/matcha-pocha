import { NextResponse } from 'next/server'
import { registerUser } from '../../../../../lib/auth.js'

export async function POST(request) {
  try {
    const userData = await request.json()
    
    const { username, email, password, full_name, phone, address } = userData
    
    if (!username || !email || !password || !full_name) {
      return NextResponse.json(
        { success: false, message: 'Username, email, password, and full name are required' },
        { status: 400 }
      )
    }
    
    const result = await registerUser({
      username,
      email,
      password,
      full_name,
      phone,
      address
    })
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      })
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Register API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
