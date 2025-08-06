import { NextResponse } from 'next/server'
import { authenticateUser } from '../../../../../lib/auth.js'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    const result = await authenticateUser(email, password)
    
    if (result.success) {
      const response = NextResponse.json({
        success: true,
        user: result.user,
        message: 'Login successful'
      })
      
      // Set JWT token as HTTP-only cookie
      response.cookies.set('auth-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 // 7 days
      })
      
      return response
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
