'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: React.ComponentProps<typeof Component>) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
      // Verifica se o token existe no localStorage
      const token = localStorage.getItem('token')
      if (token) {
        setIsAuthenticated(true)
      } else {
        // Redireciona para a página de login se não estiver autenticado
        router.push('/login')
      }
    }, [router])

    // Renderiza o componente apenas se estiver autenticado
    if (!isAuthenticated) {
      return null // Ou um spinner/carregamento enquanto verifica a autenticação
    }

    return <Component {...props} />
  }
}
