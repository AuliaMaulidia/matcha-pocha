import { NextResponse } from 'next/server'
import { getConnection } from '../../../../lib/database.js'

export async function GET() {
  try {
    const conn = await getConnection()
    const [products] = await conn.execute(`
      SELECT p.product_id, p.product_name, c.category_name, p.price, p.stock_quantity
      FROM product p
      LEFT JOIN category c ON p.category_id = c.category_id
    `)
    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const { product_name, category_id, price, stock_quantity } = data

    if (!product_name || !category_id || !price || stock_quantity === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const conn = await getConnection()
    const [result] = await conn.execute(`
      INSERT INTO product (product_name, category_id, price, stock_quantity)
      VALUES (?, ?, ?, ?)
    `, [product_name, category_id, price, stock_quantity])

    return NextResponse.json({ success: true, productId: result.insertId })
  } catch (error) {
    console.error('Failed to create product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const data = await request.json()
    const { product_id, product_name, category_id, price, stock_quantity } = data

    if (!product_id || !product_name || !category_id || !price || stock_quantity === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const conn = await getConnection()
    await conn.execute(`
      UPDATE product
      SET product_name = ?, category_id = ?, price = ?, stock_quantity = ?
      WHERE product_id = ?
    `, [product_name, category_id, price, stock_quantity, product_id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const product_id = searchParams.get('product_id')

    if (!product_id) {
      return NextResponse.json({ error: 'Missing product_id' }, { status: 400 })
    }

    const conn = await getConnection()
    await conn.execute('DELETE FROM product WHERE product_id = ?', [product_id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
