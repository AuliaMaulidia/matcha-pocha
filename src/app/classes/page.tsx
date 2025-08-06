"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Class {
  id: number
  name: string
  description: string
  instructor: string
  schedule: string
  duration: string
  max_participants: number
  price: number
  image_url: string
  level: string
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    // Sample classes data
    const sampleClasses: Class[] = [
      {
        id: 1,
        name: 'Pengenalan Matcha',
        description: 'Kelas dasar tentang sejarah dan budaya matcha. Pelajari asal-usul matcha, cara produksi, dan perbedaan grade matcha.',
        instructor: 'Tanaka Sensei',
        schedule: 'Setiap Sabtu 10:00-12:00',
        duration: '2 jam',
        max_participants: 15,
        price: 150000,
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d7b46eea-73e7-45b9-8df2-70f71481c848.png',
        level: 'Pemula'
      },
      {
        id: 2,
        name: 'Teknik Penyajian Matcha',
        description: 'Belajar cara menyajikan matcha dengan benar menggunakan teknik tradisional Jepang. Termasuk penggunaan chasen dan chawan.',
        instructor: 'Sato Sensei',
        schedule: 'Setiap Minggu 14:00-16:00',
        duration: '2 jam',
        max_participants: 12,
        price: 200000,
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c39efdb7-79a8-4cf0-951c-4fadeacea896.png',
        level: 'Menengah'
      },
      {
        id: 3,
        name: 'Upacara Teh Tradisional',
        description: 'Kelas lengkap tentang upacara teh Jepang (Chanoyu). Pelajari filosofi, etika, dan praktik upacara teh yang autentik.',
        instructor: 'Yamamoto Sensei',
        schedule: 'Setiap Sabtu 14:00-17:00',
        duration: '3 jam',
        max_participants: 8,
        price: 350000,
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cfe03b1d-3135-4667-a13b-8568ab2aff39.png',
        level: 'Lanjutan'
      },
      {
        id: 4,
        name: 'Matcha Latte Art',
        description: 'Kelas kreatif untuk membuat latte art dengan matcha. Cocok untuk barista atau pecinta kopi yang ingin bereksperimen.',
        instructor: 'Chef Riko',
        schedule: 'Setiap Jumat 16:00-18:00',
        duration: '2 jam',
        max_participants: 10,
        price: 175000,
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4ab87732-3583-43ba-9789-c1c19f94c37d.png',
        level: 'Menengah'
      },
      {
        id: 5,
        name: 'Matcha Dessert Workshop',
        description: 'Workshop membuat berbagai dessert dengan matcha. Termasuk mochi, ice cream, dan kue tradisional Jepang.',
        instructor: 'Pastry Chef Yuki',
        schedule: 'Setiap Minggu 10:00-13:00',
        duration: '3 jam',
        max_participants: 12,
        price: 275000,
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d1295cd1-7210-4514-b4f0-13d04ab33aaf.png',
        level: 'Pemula'
      },
      {
        id: 6,
        name: 'Matcha Meditation',
        description: 'Kombinasi unik antara meditasi dan minum matcha. Rasakan ketenangan dan fokus melalui ritual matcha mindful.',
        instructor: 'Meditation Master Kenji',
        schedule: 'Setiap Rabu 18:00-19:30',
        duration: '1.5 jam',
        max_participants: 20,
        price: 125000,
        image_url: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ec30fb2b-0fe4-4290-8820-ce322c0a4c2e.png',
        level: 'Semua Level'
      }
    ]
    
    setClasses(sampleClasses)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Pemula':
        return 'bg-green-100 text-green-800'
      case 'Menengah':
        return 'bg-yellow-100 text-yellow-800'
      case 'Lanjutan':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const handleBooking = (classItem: Class) => {
    setSelectedClass(classItem)
    setIsBookingOpen(true)
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
              <h1 className="text-xl font-bold text-white">Kelas Matcha Pocha</h1>
              <p className="text-sm text-white/80">Belajar Seni dan Budaya Matcha Bersama Ahli</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-green-800">
              Kelas Saya
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#426442' }}>
            Kelas Matcha Terbaik di Indonesia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pelajari seni dan budaya matcha dari instruktur berpengalaman. 
            Dari kelas pemula hingga upacara teh tradisional, temukan kelas yang sesuai dengan minat Anda.
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-0">
                <img
                  src={classItem.image_url}
                  alt={classItem.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-xs ${getLevelColor(classItem.level)}`}>
                    {classItem.level}
                  </Badge>
                  <span className="text-sm text-gray-500">{classItem.duration}</span>
                </div>
                
                <CardTitle className="text-xl mb-3" style={{ color: '#426442' }}>
                  {classItem.name}
                </CardTitle>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {classItem.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-20">Instruktur:</span>
                    <span className="text-gray-600">{classItem.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-20">Jadwal:</span>
                    <span className="text-gray-600">{classItem.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-20">Kapasitas:</span>
                    <span className="text-gray-600">{classItem.max_participants} orang</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold" style={{ color: '#426442' }}>
                    {formatCurrency(classItem.price)}
                  </span>
                  <span className="text-sm text-gray-500">per orang</span>
                </div>
                
                <Button
                  className="w-full"
                  style={{ backgroundColor: '#a8bc60' }}
                  onClick={() => handleBooking(classItem)}
                >
                  Daftar Kelas
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Daftar Kelas: {selectedClass?.name}</DialogTitle>
            </DialogHeader>
            {selectedClass && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Detail Kelas</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Instruktur:</span> {selectedClass.instructor}</p>
                    <p><span className="font-medium">Jadwal:</span> {selectedClass.schedule}</p>
                    <p><span className="font-medium">Durasi:</span> {selectedClass.duration}</p>
                    <p><span className="font-medium">Harga:</span> {formatCurrency(selectedClass.price)}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nama Lengkap</Label>
                    <Input id="fullName" placeholder="Masukkan nama lengkap" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input id="phone" type="tel" placeholder="08xxxxxxxxxx" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Pengalaman dengan Matcha</Label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Pilih pengalaman</option>
                      <option value="none">Belum pernah</option>
                      <option value="beginner">Pemula</option>
                      <option value="intermediate">Menengah</option>
                      <option value="advanced">Berpengalaman</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsBookingOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button 
                    className="flex-1" 
                    style={{ backgroundColor: '#426442' }}
                  >
                    Konfirmasi Booking
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
