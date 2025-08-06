"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Forum {
  id: number
  name: string
  description: string
}

export default function CommunityPage() {
  const [forums, setForums] = useState<Forum[]>([])

  useEffect(() => {
    // Sample forum data
    setForums([
      { id: 1, name: 'Diskusi Umum', description: 'Forum diskusi umum tentang matcha' },
      { id: 2, name: 'Resep Matcha', description: 'Berbagi resep kreatif dengan matcha' },
      { id: 3, name: 'Tips & Trik', description: 'Tips dan trik seputar matcha' }
    ])
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Komunitas Matcha</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forums.map((forum) => (
          <Card key={forum.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{forum.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{forum.description}</p>
              <Button className="mt-4" variant="outline">Masuk Forum</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
