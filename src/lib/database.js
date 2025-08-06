import mysql from 'mysql2/promise'

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'matcha_pocha',
  port: 3306
}

let connection = null

export async function getConnection() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(dbConfig)
      console.log('Connected to MySQL database')
    } catch (error) {
      console.error('Database connection failed:', error)
      throw error
    }
  }
  return connection
}

export async function initializeDatabase() {
  const conn = await getConnection()
  
  await conn.execute(`CREATE DATABASE IF NOT EXISTS matcha_pocha`)
  await conn.execute(`USE matcha_pocha`)
  
  // Create tables and insert sample data as before...
}
