"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  image_url: string
  description: string
}

interface CartItem {
  product: Product
  quantity: number
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    // Sample products data
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: 'Ceremonial Grade Matcha',
        category: 'Matcha Powder',
        price: 250000,
        stock: 50,
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0bf8eb3d-7d65-4fcd-9aa6-de91a5c7df12.png',
        description: 'Matcha grade tertinggi untuk upacara teh tradisional'
      },
      {
        id: 2,
        name: 'Premium Grade Matcha',
        category: 'Matcha Powder',
        price: 150000,
        stock: 100,
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f84b55fc-2549-4130-ada5-b54108851f25.png',
        description: 'Matcha berkualitas tinggi untuk konsumsi sehari-hari'
      },
      {
        id: 3,
        name: 'Chasen (Bamboo Whisk)',
        category: 'Matcha Tools',
        price: 125000,
        stock: 30,
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e431804a-9914-453b-a393-8568c012bbac.png',
        description: 'Pengocok bambu tradisional untuk matcha'
      }
    ]
    
    setProducts(sampleProducts)
    setFilteredProducts(sampleProducts)
  }, [])

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f3eadc' }}>
      {/* Header */}
      <header className="px-6 py-4" style={{ backgroundColor: '#426442' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#a8bc60' }}>
              <div className="w-8 h-5 rounded-full border-2 border-white relative">
                <div className="absolute inset-1 rounded-full" style={{ backgroundColor: '#71c78c' }}></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Toko Matcha Pocha</h1>
              <p className="text-sm text-white/80">Produk Matcha Premium & Alat Tradisional</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-green-800">
              Keranjang ({cart.length})
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-0">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg mb-2" style={{ color: '#426442' }}>
                  {product.name}
                </CardTitle>
                <p className="text-sm text-gray-600 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold" style={{ color: '#426442' }}>
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                    Stok: {product.stock}
                  </span>
                </div>
                <Button
                  className="w-full"
                  style={{ backgroundColor: '#a8bc60' }}
                  onClick={() => addToCart(product)}
                >
                  Tambah ke Keranjang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
