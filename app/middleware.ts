import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Verifica se o usuário tem um token de autenticação nos cookies
  const token = req.cookies.get('token')?.value

  // Se o token não existir, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Se o token existir, permite o acesso à página solicitada
  return NextResponse.next()
}

// Define as rotas onde o middleware deve ser aplicado
export const config = {
  matcher: ['/dashboard/:path*'], // Protege todas as rotas dentro de /dashboard
}
