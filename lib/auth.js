import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getConnection } from './database.js'

const JWT_SECRET = process.env.JWT_SECRET || 'matcha-pocha-secret-key'

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(user) {
  return jwt.sign(
    { 
      userId: user.user_id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function authenticateUser(email, password) {
  const conn = await getConnection()
  
  try {
    const [rows] = await conn.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
    
    if (rows.length === 0) {
      return { success: false, message: 'User not found' }
    }
    
    const user = rows[0]
    const isValidPassword = await verifyPassword(password, user.password)
    
    if (!isValidPassword) {
      return { success: false, message: 'Invalid password' }
    }
    
    const token = generateToken(user)
    
    return {
      success: true,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      },
      token
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return { success: false, message: 'Authentication failed' }
  }
}

export async function registerUser(userData) {
  const conn = await getConnection()
  
  try {
    // Check if user already exists
    const [existingUsers] = await conn.execute(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [userData.email, userData.username]
    )
    
    if (existingUsers.length > 0) {
      return { success: false, message: 'User already exists' }
    }
    
    // Hash password
    const hashedPassword = await hashPassword(userData.password)
    
    // Insert new user
    const [result] = await conn.execute(
      'INSERT INTO users (username, email, password, full_name, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
      [
        userData.username,
        userData.email,
        hashedPassword,
        userData.full_name,
        userData.phone || null,
        userData.address || null
      ]
    )
    
    return {
      success: true,
      message: 'User registered successfully',
      userId: result.insertId
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, message: 'Registration failed' }
  }
}
