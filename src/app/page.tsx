"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function HomePage() {
  const [language, setLanguage] = useState('id')
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const text = {
    id: {
      title: "Matcha Pocha",
      subtitle: "Premium Matcha dari Indonesia dengan Sentuhan Jepang",
      heroText: "Dari Kebun ke Cawan",
      heroDesc: "Nikmati kelezatan matcha berkualitas tinggi yang diproduksi dari kebun teh terbaik Indonesia dengan teknik tradisional Jepang",
      classCard: {
        title: "Kelas Matcha",
        desc: "Ikuti kelas pengenalan, produksi, memilih, dan penyajian matcha bersama instruktur berpengalaman.",
        button: "Lihat Jadwal Kelas"
      },
      communityCard: {
        title: "Komunitas Matcha",
        desc: "Gabung komunitas, diskusi, sharing resep, dan event seru bersama pecinta matcha Indonesia.",
        button: "Gabung Komunitas"
      },
      storeCard: {
        title: "Toko Matcha",
        desc: "Beli matcha lokal berkualitas, alat tradisional, dan merchandise eksklusif Matcha Pocha.",
        button: "Belanja Sekarang"
      },
      login: "Masuk",
      register: "Daftar",
      email: "Email",
      password: "Kata Sandi",
      confirmPassword: "Konfirmasi Kata Sandi",
      fullName: "Nama Lengkap",
      phone: "Nomor Telepon"
    },
    en: {
      title: "Matcha Pocha",
      subtitle: "Premium Indonesian Matcha with Japanese Touch",
      heroText: "From Garden to Cup",
      heroDesc: "Enjoy high-quality matcha produced from Indonesia's finest tea gardens using traditional Japanese techniques",
      classCard: {
        title: "Matcha Classes",
        desc: "Join introduction, production, selection, and matcha serving classes with experienced instructors.",
        button: "View Class Schedule"
      },
      communityCard: {
        title: "Matcha Community",
        desc: "Join the community, discuss, share recipes, and enjoy fun events with Indonesian matcha lovers.",
        button: "Join Community"
      },
      storeCard: {
        title: "Matcha Store",
        desc: "Buy quality local matcha, traditional tools, and exclusive Matcha Pocha merchandise.",
        button: "Shop Now"
      },
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      phone: "Phone Number"
    }
  }

  const currentText = text[language as keyof typeof text]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f3eadc' }}>
      {/* Header */}
      <header className="px-6 py-4" style={{ backgroundColor: '#426442' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            {/* Japanese Text - Positioned on the left */}
            <div className="text-white text-sm font-light flex flex-col items-center space-y-1 mr-2" style={{ fontFamily: 'Noto Sans JP' }}>
              <div className="writing-mode-vertical">抹</div>
              <div className="writing-mode-vertical">茶</div>
              <div className="writing-mode-vertical">ポ</div>
              <div className="writing-mode-vertical">チ</div>
              <div className="writing-mode-vertical">ャ</div>
            </div>
            
            {/* Logo Circle with Matcha Bowl */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center relative" style={{ backgroundColor: '#a8bc60' }}>
              {/* Matcha Bowl Illustration */}
              <div className="w-10 h-6 rounded-full border-2 border-white relative">
                <div className="absolute inset-1 rounded-full" style={{ backgroundColor: '#71c78c' }}></div>
                {/* Chasen (Whisk) */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-white rounded-full"></div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-white">{currentText.title}</h1>
              <p className="text-sm text-white/80">{currentText.subtitle}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-yellow-200 transition-colors">Beranda</a>
            <a href="/classes" className="text-white hover:text-yellow-200 transition-colors">Kelas</a>
            <a href="#" className="text-white hover:text-yellow-200 transition-colors">Komunitas</a>
            <a href="/store" className="text-white hover:text-yellow-200 transition-colors">Toko</a>
            <a href="#" className="text-white hover:text-yellow-200 transition-colors">Edukasi</a>
          </nav>

          {/* Language & Auth */}
          <div className="flex items-center space-x-4">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white border border-white/30 rounded px-2 py-1 text-sm"
            >
              <option value="id" className="text-black">ID</option>
              <option value="en" className="text-black">EN</option>
            </select>
            
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button className="text-white border-white hover:bg-green-600" style={{ backgroundColor: '#a8bc60' }}>
                  {currentText.login}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{currentText.login}</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">{currentText.login}</TabsTrigger>
                    <TabsTrigger value="register">{currentText.register}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{currentText.email}</Label>
                      <Input id="email" type="email" placeholder="example@matchapocha.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">{currentText.password}</Label>
                      <Input id="password" type="password" />
                    </div>
                    <Button className="w-full" style={{ backgroundColor: '#426442' }}>
                      {currentText.login}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="register" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{currentText.fullName}</Label>
                      <Input id="fullName" type="text" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regEmail">{currentText.email}</Label>
                      <Input id="regEmail" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{currentText.phone}</Label>
                      <Input id="phone" type="tel" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regPassword">{currentText.password}</Label>
                      <Input id="regPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">{currentText.confirmPassword}</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="w-full" style={{ backgroundColor: '#426442' }}>
                      {currentText.register}
                    </Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Image Background */}
          <div className="relative rounded-2xl overflow-hidden mb-16" style={{ backgroundColor: '#a8bc60', minHeight: '400px' }}>
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/300913ea-9277-443f-a23d-7fd088353245.png" 
              alt="Kebun teh Indonesia dengan petani tradisional"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Batik Pattern Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
            
            {/* Hero Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Noto Sans JP' }}>
                  {currentText.heroText}
                </h2>
                <p className="text-xl max-w-2xl mx-auto leading-relaxed">
                  {currentText.heroDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Process Illustration */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="text-center">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fc7d0fd6-936e-4d89-92fe-2e544197ac1e.png" 
                  alt="Kebun Teh"
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold" style={{ color: '#426442' }}>Kebun Teh</h3>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/299992fa-5829-4cd9-ac49-8947534e2f2f.png" 
                  alt="Petani"
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold" style={{ color: '#426442' }}>Petani</h3>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9dcf00c0-ff84-4e7a-8f64-48293587c154.png" 
                  alt="Daun Teh"
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold" style={{ color: '#426442' }}>Daun Teh</h3>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c4e7253d-bfc2-44a4-b7b4-5e60d33609b1.png" 
                  alt="Pengolahan"
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold" style={{ color: '#426442' }}>Pengolahan</h3>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/150b4cc1-d9fa-4478-b09e-10220c8c0388.png" 
                  alt="Cawan Matcha"
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold" style={{ color: '#426442' }}>Cawan Matcha</h3>
              </div>
            </div>
          </div>

          {/* Three Main Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#a8bc60' }}>
                  <div className="w-8 h-8 rounded border-2 border-white"></div>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#426442' }}>
                  {currentText.classCard.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentText.classCard.desc}
                </p>
                <a href="/classes">
                  <Button className="w-full" style={{ backgroundColor: '#a8bc60', color: 'white' }}>
                    {currentText.classCard.button}
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#a8bc60' }}>
                  <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#426442' }}>
                  {currentText.communityCard.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentText.communityCard.desc}
                </p>
                <Button className="w-full" style={{ backgroundColor: '#a8bc60', color: 'white' }}>
                  {currentText.communityCard.button}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#a8bc60' }}>
                  <div className="w-6 h-8 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#426442' }}>
                  {currentText.storeCard.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentText.storeCard.desc}
                </p>
                <a href="/store">
                  <Button className="w-full" style={{ backgroundColor: '#a8bc60', color: 'white' }}>
                    {currentText.storeCard.button}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Three Bottom Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/83733111-e829-437c-92f3-233bd631d9bd.png" 
                alt="Kebun Teh Indonesia"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold mb-2" style={{ color: '#426442' }}>Kebun Teh Indonesia</h4>
              <p className="text-gray-600 text-sm">
                Dari kebun teh terbaik Indonesia, kami hadirkan matcha berkualitas dunia.
              </p>
            </div>

            <div className="text-center">
              <img 
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a38b9895-11b4-4da7-a94a-cb0b03b1269c.png" 
                alt="Proses Produksi Matcha"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold mb-2" style={{ color: '#426442' }}>Proses Produksi Matcha</h4>
              <p className="text-gray-600 text-sm">
                Diproses secara tradisional dengan teknik Jepang, dipadukan sentuhan lokal.
              </p>
            </div>

            <div className="text-center">
              <img 
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f920813c-c23b-48d6-8418-e0ece3330c80.png" 
                alt="Produk & Merchandise"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold mb-2" style={{ color: '#426442' }}>Produk & Merchandise</h4>
              <p className="text-gray-600 text-sm">
                Temukan produk matcha, alat, dan merchandise eksklusif hanya di Matcha Pocha.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#31412b' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Matcha Pocha</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Premium matcha dari Indonesia dengan sentuhan tradisional Jepang.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Kelas Matcha</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Komunitas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Toko Online</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Edukasi</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>Email: info@matchapocha.com</li>
                <li>Phone: +62 812-3456-7890</li>
                <li>Instagram: @matchapocha</li>
                <li>WhatsApp: +62 812-3456-7890</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Alamat</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Jl. Kebun Teh No. 123<br />
                Bandung, Jawa Barat<br />
                Indonesia 40123
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 Matcha Pocha. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
          line-height: 1.4;
        }
      `}</style>
    </div>
  )
}
