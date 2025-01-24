'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para a página de login ao carregar
    router.push('/login')
  }, [router])

  return null // Retorna null, já que a página redireciona imediatamente
}
