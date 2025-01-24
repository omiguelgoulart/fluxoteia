"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChartIcon as ChartBarIcon, LayoutDashboard, Receipt, ListIcon, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const pathname = usePathname()

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked")
    // Remove o token do localStorage
  localStorage.removeItem('token');

  // Opcional: Redireciona para a página de login ou uma página inicial
  window.location.href = '/login'; // Substitua '/login' pela rota desejada

  console.log("Usuário deslogado com sucesso.");

  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-around">
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Livro Caixa</span>
          </Link>
        </div>

        {/* Navegação */}
        <nav className="flex items-center space-x-8 text-sm font-medium">
          <Link
            href="/dashboard"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/dashboard" ? "text-foreground" : "text-foreground/60",
            )}
          >
            <span className="flex items-center gap-1">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </span>
          </Link>

          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname.includes("/transacoes") ? "text-foreground" : "text-foreground/60",
                  )}
                >
                  <span className="flex items-center gap-1">
                    <Receipt className="h-4 w-4" />
                    Transações
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/transacoes">
                    <ListIcon className="mr-2 h-4 w-4" />
                    Resumo
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/transacoes/entradas">Entradas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/transacoes/despesas">Saídas</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            href="/dre"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/dre" ? "text-foreground" : "text-foreground/60",
            )}
          >
            <span className="flex items-center gap-1">
              <ChartBarIcon className="h-4 w-4" />
              DRE
            </span>
          </Link>
        </nav>

        {/* Avatar with Dropdown */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarImage src="/vercel.svg" alt="@user" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

